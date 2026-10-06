import { getAdminClient } from '../../lib/supabase.js';

const MAX_PDF_BYTES = 10 * 1024 * 1024;
const allowedMime = 'application/pdf';
export function chunkText(text, size = 1200) { const clean = String(text || '').replace(/\s+/g, ' ').trim(); const chunks = []; for (let i = 0; i < clean.length; i += size) chunks.push(clean.slice(i, i + size)); return chunks.filter(Boolean); }
export function validatePdf(file) { if (!file || file.mimetype !== allowedMime || file.size > MAX_PDF_BYTES) throw new Error('File harus berupa PDF maksimal 10 MB.'); return file; }
const retrievalStopWords = new Set(['apa', 'apakah', 'ada', 'dan', 'atau', 'yang', 'di', 'ke', 'dari', 'untuk', 'dengan', 'ini', 'itu', 'bisa', 'saja', 'cara', 'mana', 'pada', 'the']);
// Indonesian attaches clitics to words ("ekstrakurikuler" + "-nya"), which breaks
// keyword lookup. Strip one trailing clitic only when a usable stem remains.
function stripClitic(word) {
  const match = word.match(/^(.{4,})(?:nya|lah|kah|pun|ku|mu)$/);
  return match ? match[1] : word;
}
export function tokenize(message) {
  const words = String(message || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(/\s+/).filter((word) => word.length >= 3 && !retrievalStopWords.has(word));
  const expanded = words.map(stripClitic);
  return [...new Set([...words, ...expanded])].slice(0, 12);
}

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

// Per-chunk topics appended by the seeder as "<file>::<topic>". Each topic maps
// to the public page that actually shows the answer, plus the label to show as
// the citation. Nothing here invents a URL: every value is a real site route.
const topicRoutes = {
  profil: '/profile',
  sejarah: '/profile',
  jurusan: '/majors',
  akademik: null,
  'jurusan-kgs': '/majors/kgs',
  'jurusan-tek': '/majors/tek',
  'jurusan-titl': '/majors/titl',
  'jurusan-tflm': '/majors/tflm',
  'jurusan-sija': '/majors/sija',
  'jurusan-tkr': '/majors/tkr',
  lsp: '/programs/lsp',
  ekstrakurikuler: '/programs/ekstrakurikuler',
  bkk: '/programs/bkk',
  fasilitas: '/contact',
  ppdb: null,
  blud: '/blud',
  news: '/news',
  contact: '/contact',
  unknown: '/contact',
  faq: null,
};

const topicTitles = {
  profil: 'Profil SMKN 26 Jakarta',
  sejarah: 'Sejarah SMKN 26 Jakarta',
  jurusan: 'Jurusan SMKN 26 Jakarta',
  akademik: 'Program Keahlian SMKN 26 Jakarta',
  'jurusan-kgs': 'Konstruksi Gedung dan Sanitasi',
  'jurusan-tek': 'Teknik Elektronika dan Komunikasi',
  'jurusan-titl': 'Teknik Instalasi Tenaga Listrik',
  'jurusan-tflm': 'Teknik Fabrikasi Logam dan Manufaktur',
  'jurusan-sija': 'Sistem Informasi, Jaringan, dan Aplikasi',
  'jurusan-tkr': 'Teknik Kendaraan Ringan',
  lsp: 'LSP SMKN 26 Jakarta',
  ekstrakurikuler: 'Ekstrakurikuler SMKN 26 Jakarta',
  bkk: 'BKK SMKN 26 Jakarta',
  fasilitas: 'Fasilitas dan Layanan SMKN 26 Jakarta',
  ppdb: 'Penerimaan Murid Baru SMKN 26 Jakarta',
  blud: 'Unit Produksi dan Layanan BLUD SMKN 26 Jakarta',
  news: 'Berita dan Prestasi SMKN 26 Jakarta',
  contact: 'Kontak SMKN 26 Jakarta',
  unknown: 'Informasi SMKN 26 Jakarta',
  faq: 'FAQ SMKN 26 Jakarta',
};

export function splitKnowledgeTopic(sourcePage) {
  const raw = String(sourcePage || '');
  const index = raw.indexOf('::');
  if (index === -1) return { page: raw, topic: '' };
  return { page: raw.slice(0, index), topic: raw.slice(index + 2) };
}

// Human-readable citation label for the page behind a retrieved chunk.
export function publicTitleForKnowledgeSource(sourcePage, fallbackTitle = '') {
  const { page, topic } = splitKnowledgeTopic(sourcePage);
  if (topic && topicTitles[topic]) return topicTitles[topic];
  if (/^knowledge\/02-jurusan\/jurusan-/.test(page)) {
    const slug = page.match(/jurusan-([a-z]+)\.md$/)?.[1];
    if (slug && topicTitles[`jurusan-${slug}`]) return topicTitles[`jurusan-${slug}`];
  }
  if (/^jurusan-/.test(page)) {
    const map = {
      'jurusan-konstruksi-gedung-sanitasi': 'Konstruksi Gedung dan Sanitasi',
      'jurusan-teknik-elektronika-komunikasi': 'Teknik Elektronika dan Komunikasi',
      'jurusan-teknik-instalasi-tenaga-listrik': 'Teknik Instalasi Tenaga Listrik',
      'jurusan-teknik-fabrikasi-logam-manufaktur': 'Teknik Fabrikasi Logam dan Manufaktur',
      'jurusan-sija': 'Sistem Informasi, Jaringan, dan Aplikasi',
      'jurusan-teknik-kendaraan-ringan': 'Teknik Kendaraan Ringan',
      'jurusan-smkn-26-jakarta': 'Jurusan SMKN 26 Jakarta',
    };
    if (map[page]) return map[page];
  }
  return fallbackTitle || 'Sumber sekolah';
}

export function isSuppressedPublicSource(sourcePage, sourceTitle = '') {
  const value = `${sourcePage || ''} ${sourceTitle || ''}`.toLowerCase();
  return value.includes('99-faq')
    || value.includes('faq-smkn')
    || value.includes('faq terverifikasi')
    || value.includes('09-ppdb')
    || value.includes('penerimaan murid baru');
}

export function publicPathForKnowledgeSource(sourcePage, section) {
  const { page, topic } = splitKnowledgeTopic(sourcePage);
  if (topic && topicRoutes[topic]) return topicRoutes[topic];
  // A specific source page is more precise than a coarse section label, so it
  // is resolved first. Jurusan detail pages must deep-link to the major page,
  // never collapse to the /majors index.
  const majorPaths = {
    'jurusan-konstruksi-gedung-sanitasi': '/majors/kgs',
    'jurusan-teknik-elektronika-komunikasi': '/majors/tek',
    'jurusan-teknik-instalasi-tenaga-listrik': '/majors/titl',
    'jurusan-teknik-fabrikasi-logam-manufaktur': '/majors/tflm',
    'jurusan-sija': '/majors/sija',
    'jurusan-teknik-kendaraan-ringan': '/majors/tkr',
  };
  if (majorPaths[page]) return majorPaths[page];
  const sectionPaths = { home: '/', profile: '/profile', organization: '/organization', majors: '/majors', tour: '/tour', partners: '/partners', blud: '/blud', programs: null, achievements: '/achievements', news: '/news', information: null, contact: '/contact' };
  if (sectionPaths[section]) return sectionPaths[section];
  // Markdown knowledge sources are stored as "knowledge/<folder>/<file>.md".
  // Point them at the public page that actually shows the same information.
  if (/^knowledge\//.test(page)) {
    const folder = page.split('/')[1] || '';
    const folderPaths = {
      '01-profil-sekolah': '/profile',
      '02-jurusan': '/majors',
       '03-akademik': null,
      '04-kesiswaan': '/programs/ekstrakurikuler',
      '05-karier': '/programs/bkk',
      '06-lsp': '/programs/lsp',
      '07-fasilitas': '/tour',
      '08-layanan': '/contact',
       '09-ppdb': null,
      '10-berita': '/news',
       '99-faq': null,
    };
    if (folderPaths[folder]) return folderPaths[folder];
    return null;
  }
  if (/^(profil|identitas|sejarah|akreditasi)-/.test(page)) return '/profile';
  if (/^jurusan-/.test(page)) return '/majors';
  if (/^(program|blud)-/.test(page)) return page.startsWith('blud-') ? '/blud' : null;
  if (page === 'statistik-tahun-ajaran-2025-2026') return '/';
  return null;
}
