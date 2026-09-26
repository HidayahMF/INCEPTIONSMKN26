import { getAdminClient } from '../../lib/supabase.js';

const MAX_PDF_BYTES = 10 * 1024 * 1024;
const allowedMime = 'application/pdf';
export function chunkText(text, size = 1200) { const clean = String(text || '').replace(/\s+/g, ' ').trim(); const chunks = []; for (let i = 0; i < clean.length; i += size) chunks.push(clean.slice(i, i + size)); return chunks.filter(Boolean); }
export function validatePdf(file) { if (!file || file.mimetype !== allowedMime || file.size > MAX_PDF_BYTES) throw new Error('File harus berupa PDF maksimal 10 MB.'); return file; }
export function tokenize(message) { return [...new Set(String(message || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(/\s+/).filter((word) => word.length >= 3))].slice(0, 12); }

export async function listKnowledge() { const { data, error } = await getAdminClient().from('knowledge_documents').select('id,source_id,source_type,source_ref,visibility,status,version,mime_type,byte_size,approved_at,created_at,knowledge_sources(title,source_url,source_page)').order('created_at', { ascending: false }); if (error) throw error; return data || []; }
export async function createTextSource({ title, body, sourceUrl, sourcePage, userId }) {
  if (!title?.trim() || !body?.trim()) throw new Error('Judul dan isi sumber wajib diisi.');
  const client = getAdminClient(); const source = await client.from('knowledge_sources').insert({ title: title.trim(), source_url: sourceUrl?.trim() || null, source_page: sourcePage?.trim() || null }).select().single(); if (source.error) throw source.error;
  const document = await client.from('knowledge_documents').insert({ source_id: source.data.id, source_type: 'PUBLIC_PAGE', source_ref: sourcePage || null, visibility: 'PRIVATE', status: 'DRAFT', created_by: userId }).select().single(); if (document.error) throw document.error;
  const chunks = chunkText(body).map((content, chunk_index) => ({ document_id: document.data.id, chunk_index, content, source_page: sourcePage || null, source_url: sourceUrl || null })); const inserted = await client.from('knowledge_chunks').insert(chunks); if (inserted.error) throw inserted.error; return document.data;
}
export async function createPdfSource(file, { title, sourceUrl, userId }) {
  validatePdf(file); if (!title?.trim()) throw new Error('Judul sumber wajib diisi.');
  const worker = await import('pdf-parse/worker');
  const pdf = await import('pdf-parse');
  const parser = new pdf.PDFParse({ data: new Uint8Array(file.buffer), CanvasFactory: worker.CanvasFactory }); let parsed;
  try { parsed = await parser.getText(); } finally { await parser.destroy(); }
  if (!parsed?.text?.trim()) throw new Error('PDF tidak memiliki teks yang dapat diproses.');
  const client = getAdminClient(); const source = await client.from('knowledge_sources').insert({ title: title.trim(), source_url: sourceUrl?.trim() || null }).select().single(); if (source.error) throw source.error;
  const storageKey = `knowledge/${source.data.id}/${crypto.randomUUID()}.pdf`; const bucket = process.env.SUPABASE_KNOWLEDGE_BUCKET || 'knowledge-private'; const upload = await client.storage.from(bucket).upload(storageKey, file.buffer, { contentType: file.mimetype, upsert: false }); if (upload.error) throw upload.error;
  const document = await client.from('knowledge_documents').insert({ source_id: source.data.id, source_type: 'PDF', original_storage_key: storageKey, source_ref: title.trim(), visibility: 'PRIVATE', status: 'DRAFT', mime_type: file.mimetype, byte_size: file.size, created_by: userId }).select().single(); if (document.error) throw document.error;
  const chunks = chunkText(parsed.text).map((content, chunk_index) => ({ document_id: document.data.id, chunk_index, content, source_url: sourceUrl || null })); const inserted = await client.from('knowledge_chunks').insert(chunks); if (inserted.error) throw inserted.error; return document.data;
}
export async function setKnowledgeStatus(id, status, userId) { if (!['DRAFT', 'APPROVED', 'REJECTED'].includes(status)) throw new Error('Status knowledge tidak valid.'); const values = { status, visibility: status === 'APPROVED' ? 'PUBLIC' : 'PRIVATE', approved_at: status === 'APPROVED' ? new Date().toISOString() : null, approved_by: status === 'APPROVED' ? userId : null }; const { data, error } = await getAdminClient().from('knowledge_documents').update(values).eq('id', id).select().single(); if (error) throw error; return data; }

export async function retrieveApproved(message, limit = 5) {
  const terms = tokenize(message); if (!terms.length) return [];
  const client = getAdminClient(); const results = new Map();
  for (const term of terms) { const { data, error } = await client.from('knowledge_chunks').select('id,content,source_page,source_url,document_id,knowledge_documents!inner(status,visibility,knowledge_sources(title,source_url,source_page))').eq('knowledge_documents.status', 'APPROVED').eq('knowledge_documents.visibility', 'PUBLIC').ilike('content', `%${term}%`).limit(30); if (error) throw error; for (const row of data || []) results.set(row.id, { ...row, score: (results.get(row.id)?.score || 0) + 1 }); }
  return [...results.values()].sort((a, b) => b.score - a.score).slice(0, limit);
}

export function publicPathForKnowledgeSource(sourcePage, section) {
  const sectionPaths = { home: '/', profile: '/profile', organization: '/organization', majors: '/majors', tour: '/tour', partners: '/partners', blud: '/blud', programs: '/programs', achievements: '/achievements', news: '/news', information: '/information', contact: '/contact' };
  if (sectionPaths[section]) return sectionPaths[section];
  if (/^(profil|identitas|sejarah|akreditasi)-/.test(sourcePage || '')) return '/profile';
  if (/^jurusan-/.test(sourcePage || '')) return '/majors';
  if (/^(program|blud)-/.test(sourcePage || '')) return sourcePage.startsWith('blud-') ? '/blud' : '/programs';
  if (sourcePage === 'statistik-tahun-ajaran-2025-2026') return '/';
  return '/information';
}
