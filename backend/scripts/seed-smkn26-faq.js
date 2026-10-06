import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { getAdminClient } from '../src/lib/supabase.js';
import { smkn26FaqChunks, smkn26FaqSource } from '../data/smkn26-faq.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const approve = process.argv.includes('--approve');
const client = getAdminClient();
const existingSource = await client.from('knowledge_sources').select('id').eq('source_page', smkn26FaqSource.sourcePage).maybeSingle();
if (existingSource.error) throw existingSource.error;
const sourceResult = existingSource.data || (await client.from('knowledge_sources').insert({ title: smkn26FaqSource.title, source_url: smkn26FaqSource.sourceUrl, source_page: smkn26FaqSource.sourcePage }).select('id').single()).data;
if (!sourceResult?.id) throw new Error('Knowledge source gagal dibuat.');

const existingDocument = await client.from('knowledge_documents').select('id').eq('source_id', sourceResult.id).eq('source_ref', smkn26FaqSource.sourcePage).maybeSingle();
if (existingDocument.error) throw existingDocument.error;
const status = approve ? 'APPROVED' : 'DRAFT';
const documentResult = existingDocument.data || (await client.from('knowledge_documents').insert({ source_id: sourceResult.id, source_type: 'PUBLIC_PAGE', source_ref: smkn26FaqSource.sourcePage, visibility: approve ? 'PUBLIC' : 'PRIVATE', status, approved_at: approve ? new Date().toISOString() : null }).select('id').single()).data;
if (!documentResult?.id) throw new Error('Knowledge document gagal dibuat.');
const updated = await client.from('knowledge_documents').update({ status, visibility: approve ? 'PUBLIC' : 'PRIVATE', approved_at: approve ? new Date().toISOString() : null }).eq('id', documentResult.id);
if (updated.error) throw updated.error;
const removed = await client.from('knowledge_chunks').delete().eq('document_id', documentResult.id);
if (removed.error) throw removed.error;
const chunks = smkn26FaqChunks.map((content, chunk_index) => ({ document_id: documentResult.id, chunk_index, content, source_page: smkn26FaqSource.sourcePage, source_url: smkn26FaqSource.sourceUrl }));
const inserted = await client.from('knowledge_chunks').insert(chunks);
if (inserted.error) throw inserted.error;
console.log(JSON.stringify({ source: smkn26FaqSource.title, status, chunks: chunks.length }, null, 2));
