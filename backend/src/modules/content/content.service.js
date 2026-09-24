import { getAdminClient } from '../../lib/supabase.js';
import { chunkText } from '../knowledge/knowledge.service.js';

const sections = new Set(['home', 'profile', 'organization', 'majors', 'tour', 'partners', 'blud', 'programs', 'achievements', 'news', 'information', 'contact']);
export function validatePageInput(input) {
  if (!input || typeof input !== 'object') throw new Error('Konten tidak valid.');
  const slug = String(input.slug || '').trim().toLowerCase(); const section = String(input.section || '').trim().toLowerCase(); const title = String(input.title || '').trim();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !sections.has(section) || !title || title.length > 180) throw new Error('Slug, section, atau judul tidak valid.');
  return { slug, section, title, summary: String(input.summary || '').trim(), body: String(input.body || '').trim(), metadata: input.metadata && typeof input.metadata === 'object' ? input.metadata : {}, status: input.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT' };
}

export async function listPublishedPages(section) {
  let query = getAdminClient().from('public_pages').select('id,slug,section,title,summary,body,published_at').eq('status', 'PUBLISHED').order('published_at', { ascending: false });
  if (section && sections.has(section)) query = query.eq('section', section);
  const { data, error } = await query; if (error) throw error; return data || [];
}
export async function listPagesForEditor() { const { data, error } = await getAdminClient().from('public_pages').select('*').order('updated_at', { ascending: false }); if (error) throw error; return data || []; }
async function syncPublishedPage(page, userId) {
  const client = getAdminClient();
  const source = await client.from('knowledge_sources').select('id').eq('source_page', page.slug).maybeSingle();
  if (source.error) throw source.error;
  const sourceId = source.data?.id || (await client.from('knowledge_sources').insert({ title: page.title, source_page: page.slug }).select('id').single()).data?.id;
  if (!sourceId) throw new Error('Sumber knowledge gagal dibuat.');
  const existing = await client.from('knowledge_documents').select('id,status').eq('source_id', sourceId).eq('source_type', 'PUBLIC_PAGE').maybeSingle();
  if (existing.error) throw existing.error;
  if (existing.data?.status === 'APPROVED') return;
  const document = existing.data || (await client.from('knowledge_documents').insert({ source_id: sourceId, source_type: 'PUBLIC_PAGE', source_ref: page.slug, status: 'DRAFT', visibility: 'PRIVATE', created_by: userId }).select('id').single()).data;
  if (!document?.id) throw new Error('Dokumen knowledge gagal dibuat.');
  const removed = await client.from('knowledge_chunks').delete().eq('document_id', document.id); if (removed.error) throw removed.error;
  const chunks = chunkText(`${page.title}\n${page.summary}\n${page.body}`).map((content, chunk_index) => ({ document_id: document.id, chunk_index, content, source_page: page.slug }));
  const inserted = await client.from('knowledge_chunks').insert(chunks); if (inserted.error) throw inserted.error;
}
async function withdrawPageKnowledge(page) {
  const client = getAdminClient();
  const source = await client.from('knowledge_sources').select('id').eq('source_page', page.slug).maybeSingle();
  if (source.error) throw source.error;
  if (!source.data) return;
  const { error } = await client.from('knowledge_documents').update({ status: 'DRAFT', visibility: 'PRIVATE', approved_at: null, approved_by: null }).eq('source_id', source.data.id).eq('source_type', 'PUBLIC_PAGE');
  if (error) throw error;
}
export async function savePage(input, userId, id) { const values = { ...validatePageInput(input), updated_by: userId, published_at: input.status === 'PUBLISHED' ? new Date().toISOString() : null }; const client = getAdminClient(); const result = id ? await client.from('public_pages').update(values).eq('id', id).select().single() : await client.from('public_pages').insert({ ...values, created_by: userId }).select().single(); if (result.error) throw result.error; if (result.data.status === 'PUBLISHED') await syncPublishedPage(result.data, userId); else if (id) await withdrawPageKnowledge(result.data); return result.data; }
export async function deletePage(id) { const { error } = await getAdminClient().from('public_pages').delete().eq('id', id); if (error) throw error; }
