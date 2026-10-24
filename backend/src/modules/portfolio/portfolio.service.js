import crypto from 'node:crypto';
import { getAdminClient } from '../../lib/supabase.js';

// Keep the Portfolio file below Vercel's ~4.5 MB Function request limit.
// The multipart envelope adds bytes around the file, so the application limit
// intentionally stays at 4 MiB instead of accepting the old 5 MB UI limit.
export const MAX_PORTFOLIO_FILE_SIZE = 4 * 1024 * 1024;
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const portfolioTable = 'student_portfolios';
const achievementTable = 'achievement_submissions';

export class PortfolioError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

function clean(value, max = 5000) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}
function list(value, max = 20) {
  if (Array.isArray(value)) return value.map((item) => clean(item, 120)).filter(Boolean).slice(0, max);
  if (typeof value === 'string') return value.split(',').map((item) => clean(item, 120)).filter(Boolean).slice(0, max);
  return [];
}
function date(value) {
  const text = clean(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : '';
}
function required(value, label, max = 5000) {
  const result = clean(value, max);
  if (!result) throw new PortfolioError(400, `${label} wajib diisi.`);
  return result;
}
function mapPortfolio(row) {
  return { id: row.id, title: row.title, category: row.category, summary: row.summary, description: row.description, skills: row.skills || [], date: row.project_date, status: row.status, role: row.role, purpose: row.purpose || '', background: row.background || '', features: row.features || [], outputs: row.outputs || [], lessonsLearned: row.lessons_learned || '', github: row.github_url || '', demoUrl: row.demo_url || '', reviewerNote: row.reviewer_note || '', isPublic: row.is_public, createdAt: row.created_at, updatedAt: row.updated_at, files: row.files || [] };
}
function mapAchievement(row) {
  return { id: row.id, title: row.title, type: row.achievement_type, competition: row.competition, organizer: row.organizer, level: row.level, rank: row.rank, date: row.achievement_date, description: row.description, verificationStatus: row.status, verificationNote: row.reviewer_note || '', isPublic: row.is_public, createdAt: row.created_at, updatedAt: row.updated_at, files: row.files || [] };
}
function portfolioInput(body) {
  const projectDate = date(body.date || body.projectDate);
  if (!projectDate) throw new PortfolioError(400, 'Tanggal karya tidak valid.');
  return { title: required(body.title, 'Judul karya', 160), category: required(body.category, 'Kategori', 100), summary: required(body.summary || body.description, 'Ringkasan', 500), description: required(body.description, 'Deskripsi', 5000), skills: list(body.skills), project_date: projectDate, role: required(body.role, 'Peran siswa', 160), purpose: clean(body.purpose), background: clean(body.background), features: list(body.features), outputs: list(body.outputs), lessons_learned: clean(body.lessonsLearned), github_url: clean(body.github, 500) || null, demo_url: clean(body.demoUrl, 500) || null };
}
function achievementInput(body) {
  const achievementDate = date(body.date || body.achievementDate);
  if (!achievementDate) throw new PortfolioError(400, 'Tanggal prestasi tidak valid.');
  return { title: required(body.title, 'Nama prestasi', 160), achievement_type: required(body.type, 'Jenis prestasi', 100), competition: required(body.competition, 'Kompetisi atau kegiatan', 200), organizer: required(body.organizer, 'Penyelenggara', 200), level: required(body.level, 'Tingkat', 100), rank: required(body.rank, 'Peringkat atau hasil', 100), achievement_date: achievementDate, description: required(body.description, 'Deskripsi', 5000) };
}
async function filesFor(client, kind, ids) {
  if (!ids.length) return new Map();
  const column = kind === 'portfolio' ? 'portfolio_id' : 'achievement_id';
  const { data, error } = await client.from('portfolio_files').select('id,portfolio_id,achievement_id,original_name,mime_type,byte_size,storage_key,created_at').in(column, ids).order('created_at', { ascending: true });
  if (error) throw error;
  const result = new Map();
  for (const file of data || []) result.set(file[column], [...(result.get(file[column]) || []), { id: file.id, name: file.original_name, mimeType: file.mime_type, size: file.byte_size, createdAt: file.created_at }]);
  return result;
}
async function withFiles(client, kind, rows) {
  const files = await filesFor(client, kind, rows.map((row) => row.id));
  return rows.map((row) => ({ ...row, files: files.get(row.id) || [] }));
}
async function getOwned(client, table, id, userId) {
  const { data, error } = await client.from(table).select('*').eq('id', id).eq('user_id', userId).maybeSingle();
  if (error) throw error;
  if (!data) throw new PortfolioError(404, 'Data tidak ditemukan atau bukan milik akun ini.');
  return data;
}
function ensureEditable(row) { if (!['DRAFT', 'REJECTED'].includes(row.status)) throw new PortfolioError(409, 'Data sudah dikirim atau diverifikasi dan tidak dapat diubah.'); }
async function listOwn(table, kind, userId) {
  const client = getAdminClient();
  const { data, error } = await client.from(table).select('*').eq('user_id', userId).order('updated_at', { ascending: false });
  if (error) throw error;
  return withFiles(client, kind, data || []);
}
export async function listStudentPortfolio(userId) { return (await listOwn(portfolioTable, 'portfolio', userId)).map(mapPortfolio); }
export async function listStudentAchievements(userId) { return (await listOwn(achievementTable, 'achievement', userId)).map(mapAchievement); }
export async function getStudentPortfolio(userId, id) { const client = getAdminClient(); const row = await getOwned(client, portfolioTable, id, userId); return mapPortfolio((await withFiles(client, 'portfolio', [row]))[0]); }
export async function getStudentAchievement(userId, id) { const client = getAdminClient(); const row = await getOwned(client, achievementTable, id, userId); return mapAchievement((await withFiles(client, 'achievement', [row]))[0]); }
export async function createPortfolio(userId, body) { const { data, error } = await getAdminClient().from(portfolioTable).insert({ user_id: userId, ...portfolioInput(body) }).select('*').single(); if (error) throw error; return mapPortfolio(data); }
export async function updatePortfolio(userId, id, body) { const client = getAdminClient(); const current = await getOwned(client, portfolioTable, id, userId); ensureEditable(current); const { data, error } = await client.from(portfolioTable).update({ ...portfolioInput(body), status: 'DRAFT', reviewer_note: null, reviewed_by: null, reviewed_at: null, is_public: false, updated_at: new Date().toISOString() }).eq('id', id).eq('user_id', userId).select('*').single(); if (error) throw error; return mapPortfolio(data); }
export async function deletePortfolio(userId, id) { const client = getAdminClient(); const current = await getOwned(client, portfolioTable, id, userId); ensureEditable(current); const { error } = await client.from(portfolioTable).delete().eq('id', id).eq('user_id', userId); if (error) throw error; return { deleted: true }; }
export async function submitPortfolio(userId, id) { return submitOwned(portfolioTable, mapPortfolio, userId, id); }
export async function createAchievement(userId, body) { const { data, error } = await getAdminClient().from(achievementTable).insert({ user_id: userId, ...achievementInput(body) }).select('*').single(); if (error) throw error; return mapAchievement(data); }
export async function updateAchievement(userId, id, body) { const client = getAdminClient(); const current = await getOwned(client, achievementTable, id, userId); ensureEditable(current); const { data, error } = await client.from(achievementTable).update({ ...achievementInput(body), status: 'DRAFT', reviewer_note: null, reviewed_by: null, reviewed_at: null, is_public: false, updated_at: new Date().toISOString() }).eq('id', id).eq('user_id', userId).select('*').single(); if (error) throw error; return mapAchievement(data); }
export async function deleteAchievement(userId, id) { const client = getAdminClient(); const current = await getOwned(client, achievementTable, id, userId); ensureEditable(current); const { error } = await client.from(achievementTable).delete().eq('id', id).eq('user_id', userId); if (error) throw error; return { deleted: true }; }
export async function submitAchievement(userId, id) { return submitOwned(achievementTable, mapAchievement, userId, id); }
async function submitOwned(table, mapper, userId, id) { const client = getAdminClient(); const current = await getOwned(client, table, id, userId); if (!['DRAFT', 'REJECTED'].includes(current.status)) throw new PortfolioError(409, 'Data hanya dapat dikirim dari status draf atau ditolak.'); const { data, error } = await client.from(table).update({ status: 'SUBMITTED', reviewer_note: null, reviewed_by: null, reviewed_at: null, is_public: false, updated_at: new Date().toISOString() }).eq('id', id).eq('user_id', userId).select('*').single(); if (error) throw error; return mapper(data); }
export async function listReviews(kind) { const client = getAdminClient(); const table = kind === 'portfolio' ? portfolioTable : achievementTable; const { data, error } = await client.from(table).select('*').eq('status', 'SUBMITTED').order('updated_at', { ascending: true }); if (error) throw error; const rows = await withFiles(client, kind, data || []); return rows.map(kind === 'portfolio' ? mapPortfolio : mapAchievement); }
export async function reviewRecord(kind, reviewerId, id, decision, note) { if (!['VERIFIED', 'REJECTED'].includes(decision)) throw new PortfolioError(400, 'Keputusan review tidak valid.'); if (decision === 'REJECTED' && !clean(note)) throw new PortfolioError(400, 'Catatan wajib diisi saat menolak data.'); const table = kind === 'portfolio' ? portfolioTable : achievementTable; const client = getAdminClient(); const { data: current, error: currentError } = await client.from(table).select('*').eq('id', id).maybeSingle(); if (currentError) throw currentError; if (!current || current.status !== 'SUBMITTED') throw new PortfolioError(409, 'Data tidak berada dalam antrean review.'); const { data, error } = await client.from(table).update({ status: decision, reviewer_note: clean(note), reviewed_by: reviewerId, reviewed_at: new Date().toISOString(), is_public: decision === 'VERIFIED', updated_at: new Date().toISOString() }).eq('id', id).eq('status', 'SUBMITTED').select('*').single(); if (error) throw error; return kind === 'portfolio' ? mapPortfolio(data) : mapAchievement(data); }
export async function uploadFile(userId, kind, recordId, file) { if (!file || !IMAGE_TYPES.has(file.mimetype) || file.size > MAX_PORTFOLIO_FILE_SIZE) throw new PortfolioError(400, 'File harus JPG, PNG, atau WebP dan maksimal 4 MB.'); const table = kind === 'portfolio' ? portfolioTable : achievementTable; const column = kind === 'portfolio' ? 'portfolio_id' : 'achievement_id'; const client = getAdminClient(); const record = await getOwned(client, table, recordId, userId); ensureEditable(record); const { count, error: countError } = await client.from('portfolio_files').select('id', { count: 'exact', head: true }).eq(column, recordId); if (countError) throw countError; if ((count || 0) >= 6) throw new PortfolioError(400, 'Maksimal 6 gambar per karya.'); const bucket = kind === 'portfolio' ? 'portfolio-private' : 'achievement-private'; const key = `${kind}/${recordId}/${crypto.randomUUID()}`; const upload = await client.storage.from(bucket).upload(key, file.buffer, { contentType: file.mimetype, upsert: false }); if (upload.error) throw upload.error; const payload = { owner_id: userId, [column]: recordId, bucket, storage_key: key, original_name: clean(file.originalname, 180) || 'upload', mime_type: file.mimetype, byte_size: file.size }; const { data, error } = await client.from('portfolio_files').insert(payload).select('id,original_name,mime_type,byte_size,created_at').single(); if (error) { await client.storage.from(bucket).remove([key]); throw error; } return { id: data.id, name: data.original_name, mimeType: data.mime_type, size: data.byte_size, createdAt: data.created_at }; }
export async function deleteFile(userId, kind, fileId) { const column = kind === 'portfolio' ? 'portfolio_id' : 'achievement_id'; const client = getAdminClient(); const { data: file, error } = await client.from('portfolio_files').select('*').eq('id', fileId).eq('owner_id', userId).maybeSingle(); if (error) throw error; if (!file || !file[column]) throw new PortfolioError(404, 'File tidak ditemukan atau bukan milik akun ini.'); const table = kind === 'portfolio' ? portfolioTable : achievementTable; const record = await getOwned(client, table, file[column], userId); ensureEditable(record); const removed = await client.storage.from(file.bucket).remove([file.storage_key]); if (removed.error) throw removed.error; const { error: deleteError } = await client.from('portfolio_files').delete().eq('id', fileId).eq('owner_id', userId); if (deleteError) throw deleteError; return { deleted: true }; }
 export async function signedFile(userId, kind, fileId) { const client = getAdminClient(); const { data: file, error } = await client.from('portfolio_files').select('*').eq('id', fileId).maybeSingle(); if (error) throw error; if (!file) throw new PortfolioError(404, 'File tidak ditemukan.'); if (file.owner_id !== userId) { const { data: roles } = await client.from('role_assignments').select('role_code').eq('user_id', userId).eq('is_active', true); if (!(roles || []).some((role) => ['ADMIN', 'ACHIEVEMENT_VERIFIER', 'HEAD_OF_DEPARTMENT'].includes(role.role_code))) throw new PortfolioError(403, 'Tidak memiliki akses ke file ini.'); } const result = await client.storage.from(file.bucket).createSignedUrl(file.storage_key, 300); if (result.error) throw result.error; return { url: result.data.signedUrl, expiresIn: 300 }; }
