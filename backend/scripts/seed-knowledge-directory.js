import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { glob } from 'node:fs/promises';
import { getAdminClient } from '../src/lib/supabase.js';
import { chunkText } from '../src/modules/knowledge/knowledge.service.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const approve = process.argv.includes('--approve');
const root = fileURLToPath(new URL('../../knowledge/', import.meta.url));
const excluded = new Set(['SOURCE-INDEX.md', 'KNOWLEDGE-COVERAGE.md', 'CHATBOT-POLICY.md', 'WEBSITE-AUDIT.md']);
const files = [];
for await (const file of glob('**/*.md', { cwd: root })) {
  if (!excluded.has(file.split(/[/\\]/).pop())) files.push(file);
}

function parseDocument(raw, file) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Frontmatter tidak ditemukan: ${file}`);
  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator !== -1) metadata[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  for (const required of ['title', 'category', 'school', 'source_type', 'source_url', 'last_verified', 'temporal', 'priority']) {
    if (!metadata[required]) throw new Error(`Metadata ${required} kosong pada ${file}`);
  }
  return { metadata, content: match[2].trim() };
}

// A Q&A document covers many topics, so each chunk carries the topic of its own
// section (and the specific major when the question names one). The topic is
// appended to the chunk source_page as "<file>::<topic>" so source attribution
// can deep-link per chunk instead of sending every chunk to one page.
const sectionTopics = [
  [/PROFIL DAN IDENTITAS/i, 'profil'],
  [/SEJARAH/i, 'sejarah'],
  [/JURUSAN DAN KOMPETENSI KEAHLIAN/i, 'jurusan'],
  [/^##\s*D\.\s*TFLM/i, 'jurusan-tflm'],
  [/^##\s*E\.\s*SIJA/i, 'jurusan-sija'],
  [/KGS,\s*TEK,\s*TITL,?\s*DAN\s*TKR/i, 'jurusan'],
  [/PEMBELAJARAN DAN INDUSTRI/i, 'akademik'],
  [/LSP DAN SERTIFIKASI/i, 'lsp'],
  [/EKSTRAKURIKULER/i, 'ekstrakurikuler'],
  [/BKK DAN KARIER/i, 'bkk'],
  [/FASILITAS DAN LAYANAN/i, 'fasilitas'],
  [/PENERIMAAN MURID BARU/i, 'ppdb'],
  [/PERTANYAAN REKOMENDASI/i, 'jurusan'],
  [/UNIT PRODUKSI DAN LAYANAN/i, 'blud'],
  [/DATA YANG BELUM TERSEDIA/i, 'unknown'],
];

// Most specific first so "fabrikasi/manufaktur/mesin" is not captured by the
// tighter keyword set.
const majorTopics = [
  ['jurusan-tflm', /\btflm\b|fabrikasi|manufaktur|pemesinan|pengelasan|\bcnc\b|\bmesin\b/],
  ['jurusan-tkr', /\btkr\b|kendaraan|otomotif|\bmobil\b|bodi kendaraan/],
  ['jurusan-titl', /\btitl\b|instalasi tenaga listrik|tenaga listrik/],
  ['jurusan-sija', /\bsija\b|sistem informasi|\bjaringan\b|\baplikasi\b/],
  ['jurusan-tek', /\btek\b|elektronika|elektronik/],
  ['jurusan-kgs', /\bkgs\b|kgsp|konstruksi|gedung|sanitasi|perumahan/],
];

// Questions in the "unknown data" section still point at the most relevant
// public page instead of a generic index.
const unknownTopics = [
  ['bkk', /lowongan|kerja|bkk|karier/],
  ['news', /prestasi|berita|juara|lomba/],
  ['ppdb', /ppdb|spmb|kuota|pendaftaran|biaya|syarat/],
  ['fasilitas', /sewa|aula|ruang|harga|jam|kantin|perpustakaan/],
  ['contact', /kepala sekolah|sekolah|hubungi|kontak/],
];

function resolveTopic(sectionHeading, question) {
  const text = `${sectionHeading || ''} ${question || ''}`;
  // A named major in the question takes precedence over the broader section.
  for (const [topic, pattern] of majorTopics) {
    if (pattern.test(question || '')) return topic;
  }
  let sectionTopic = 'faq';
  for (const [pattern, topic] of sectionTopics) {
    if (pattern.test(sectionHeading || '')) { sectionTopic = topic; break; }
  }
  if (sectionTopic === 'jurusan' || sectionTopic === 'unknown') {
    const specific = sectionTopic === 'jurusan'
      ? majorTopics
      : unknownTopics;
    for (const [topic, pattern] of specific) {
      if (pattern.test(text)) return topic;
    }
  }
  return sectionTopic;
}

// Q&A documents must keep each question/answer pair intact so retrieval never
// returns half an answer. Other documents keep the default character chunking.
function chunkContent(content) {
  const preamble = [];
  const pairs = [];
  let current = null;
  let sectionHeading = '';
  for (const line of content.split(/\r?\n/)) {
    if (/^##\s+/.test(line)) sectionHeading = line.trim();
    if (/^Q:\s+/.test(line)) {
      if (current) pairs.push(current);
      current = [sectionHeading, line.replace(/^Q:\s+/, '').trim()];
      continue;
    }
    if (/^A:\s+/.test(line) && current) {
      current.push(line.replace(/^A:\s+/, '').trim());
      pairs.push(current);
      current = null;
      continue;
    }
    if (current) current.push(line.trim());
    else if (line.trim() && !/^##\s+/.test(line)) preamble.push(line.trim());
  }
  if (current) pairs.push(current);
  if (!pairs.length) return [{ content: chunkText(content, 1200).join('\n'), topic: null }];
  const lead = preamble.length
    ? [{ content: chunkText(preamble.join(' '), 1200).join('\n'), topic: null }]
    : [];
  const rest = pairs.map(([pairSection, question, ...answer]) => ({
    content: `Q: ${question}\nA: ${answer.join(' ')}`,
    topic: resolveTopic(pairSection, question),
  }));
  return [...lead, ...rest];
}

const client = getAdminClient();
const status = approve ? 'APPROVED' : 'DRAFT';
let count = 0;
let totalChunks = 0;
for (const file of files.sort()) {
  const parsed = parseDocument(await readFile(`${root}${file}`, 'utf8'), file);
  const sourcePage = `knowledge/${file.replaceAll('\\', '/')}`;
  const existingSource = await client.from('knowledge_sources').select('id').eq('source_page', sourcePage).maybeSingle();
  if (existingSource.error) throw existingSource.error;
  const source = existingSource.data || (await client.from('knowledge_sources').insert({ title: parsed.metadata.title, source_url: parsed.metadata.source_url, source_page: sourcePage }).select('id').single()).data;
  if (!source?.id) throw new Error(`Source gagal dibuat: ${file}`);
  const existingDocument = await client.from('knowledge_documents').select('id').eq('source_id', source.id).eq('source_ref', sourcePage).maybeSingle();
  if (existingDocument.error) throw existingDocument.error;
  const document = existingDocument.data || (await client.from('knowledge_documents').insert({ source_id: source.id, source_type: 'PUBLIC_PAGE', source_ref: sourcePage, visibility: approve ? 'PUBLIC' : 'PRIVATE', status }).select('id').single()).data;
  if (!document?.id) throw new Error(`Document gagal dibuat: ${file}`);
  const updated = await client.from('knowledge_documents').update({ status, visibility: approve ? 'PUBLIC' : 'PRIVATE', approved_at: approve ? new Date().toISOString() : null }).eq('id', document.id);
  if (updated.error) throw updated.error;
  const removed = await client.from('knowledge_chunks').delete().eq('document_id', document.id);
  if (removed.error) throw removed.error;
  const chunks = chunkContent(parsed.content).map((chunk, chunk_index) => ({
    document_id: document.id,
    chunk_index,
    content: chunk.content,
    source_page: chunk.topic ? `${sourcePage}::${chunk.topic}` : sourcePage,
    source_url: parsed.metadata.source_url,
  }));
  const inserted = await client.from('knowledge_chunks').insert(chunks);
  if (inserted.error) throw inserted.error;
  totalChunks += chunks.length;
  count += 1;
}
console.log(JSON.stringify({ status, files: count, chunks: totalChunks }, null, 2));
