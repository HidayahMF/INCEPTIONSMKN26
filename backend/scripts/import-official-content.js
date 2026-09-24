import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { getAdminClient } from '../src/lib/supabase.js';
import { chunkText } from '../src/modules/knowledge/knowledge.service.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
const datasetPath = fileURLToPath(new URL('../../data/smkn26-official-content.json', import.meta.url));

async function findPage(client, slug) {
  const { data, error } = await client.from('public_pages').select('id,status').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
}

async function importPage(client, record, retrievedAt) {
  const existing = await findPage(client, record.slug);
  if (existing) return { action: 'skipped', reason: existing.status === 'PUBLISHED' ? 'published-exists' : 'exists', slug: record.slug };
  const metadata = { source_url: record.source_url, source_title: record.title, retrieved_at: retrievedAt, verification_status: 'SOURCE_REVIEWED_DRAFT', source_domain: 'https://smkn26jkt.sch.id' };
  const { error } = await client.from('public_pages').insert({ slug: record.slug, section: record.section, title: record.title, summary: record.summary, body: record.body, metadata, status: 'DRAFT' });
  if (error) throw error;
  return { action: 'inserted', slug: record.slug };
}

async function importKnowledge(client, record, retrievedAt) {
  const { data: source, error: sourceError } = await client.from('knowledge_sources').select('id').eq('source_url', record.source_url).eq('title', record.title).maybeSingle();
  if (sourceError) throw sourceError;
  let sourceId = source?.id;
  if (!sourceId) {
    const insertedSource = await client.from('knowledge_sources').insert({ title: record.title, source_url: record.source_url, source_page: record.slug }).select('id').single();
    if (insertedSource.error) throw insertedSource.error;
    sourceId = insertedSource.data.id;
  }
  const existing = await client.from('knowledge_documents').select('id,status').eq('source_id', sourceId).eq('source_type', 'PUBLIC_PAGE').maybeSingle();
  if (existing.error) throw existing.error;
  if (existing.data) return { action: 'skipped', reason: existing.data.status === 'APPROVED' ? 'approved-exists' : 'document-exists', slug: record.slug };
  const document = await client.from('knowledge_documents').insert({ source_id: sourceId, source_type: 'PUBLIC_PAGE', source_ref: record.slug, visibility: 'PRIVATE', status: 'DRAFT', created_by: null }).select('id').single();
  if (document.error) throw document.error;
  const chunks = chunkText(`${record.title}\n${record.summary}\n${record.body}`).map((content, chunk_index) => ({ document_id: document.data.id, chunk_index, content, source_page: record.slug, source_url: record.source_url }));
  const insertedChunks = await client.from('knowledge_chunks').insert(chunks);
  if (insertedChunks.error) throw insertedChunks.error;
  return { action: 'inserted', slug: record.slug, retrieved_at: retrievedAt };
}

async function main() {
  const dataset = JSON.parse(await readFile(datasetPath, 'utf8'));
  const client = getAdminClient(); const pageResults = []; const knowledgeResults = [];
  for (const record of dataset.records) pageResults.push(await importPage(client, record, dataset.retrieved_at));
  for (const record of dataset.records) knowledgeResults.push(await importKnowledge(client, record, dataset.retrieved_at));
  console.log(JSON.stringify({ pages: pageResults, knowledge: knowledgeResults }, null, 2));
}

main().catch((error) => { console.error(`Official content import failed: ${error.message}`); process.exitCode = 1; });
