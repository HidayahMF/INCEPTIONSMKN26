import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import { login, getMe } from './modules/auth/auth.service.js';
import { getDemoPassword, isAllowedDemoIdentifier } from './modules/auth/dev-quick-login.js';
import { getAuthClient } from './lib/supabase.js';
import { authenticate } from './middleware/auth.js';
import { authorize } from './middleware/authorize.js';
import { listPublishedPages, listPagesForEditor, savePage, deletePage } from './modules/content/content.service.js';
import { createPdfSource, createTextSource, listKnowledge, publicPathForKnowledgeSource, retrieveApproved, setKnowledgeStatus } from './modules/knowledge/knowledge.service.js';
import { answerFromGemini } from './modules/knowledge/gemini.service.js';
import { learningRouter } from './modules/learning/learning.routes.js';
export const app = express();
if (process.env.VERCEL) app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json({limit:'16kb'}));
app.use(cookieParser());
app.get('/api/health', (_req,res)=>res.json({data:{status:'ok'},error:null}));
const uploadLimit = process.env.VERCEL ? 4 * 1024 * 1024 : 10 * 1024 * 1024;
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: uploadLimit, files: 1 } });
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false, message: { data: null, error: { message: 'Terlalu banyak percobaan login. Coba lagi nanti.' } } });
const cookieOptions = (maxAge) => ({ httpOnly: true, secure: process.env.COOKIE_SECURE === 'true', sameSite: process.env.COOKIE_SAME_SITE || 'lax', path: '/', maxAge });
function setSessionCookies(res, session) {
  res.cookie('smkn26_access', session.access_token, cookieOptions(session.expires_in * 1000));
  res.cookie('smkn26_refresh', session.refresh_token, cookieOptions(30 * 24 * 60 * 60 * 1000));
}
app.post('/api/auth/login', loginLimiter, async (req, res, next) => {
  try {
    const result = await login(req.body?.identifier, req.body?.password);
    if (!result) return res.status(401).json({ data: null, error: { message: 'Identifier atau password salah.' } });
    setSessionCookies(res, result.session);
    return res.json({ data: { profile: result.profile }, error: null });
  } catch (error) { return next(error); }
});
const devQuickLoginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: process.env.NODE_ENV === 'test' ? 1000 : 30, standardHeaders: true, legacyHeaders: false, message: { data: null, error: { message: 'Terlalu banyak percobaan quick login.' } } });
const chatLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false, message: { data: null, error: { message: 'Terlalu banyak pertanyaan. Coba lagi nanti.' } } });
app.post('/api/dev/login-as', devQuickLoginLimiter, async (req, res, next) => {
  const identifier = typeof req.body?.identifier === 'string' ? req.body.identifier.trim().toUpperCase() : '';
  if (!isAllowedDemoIdentifier(identifier)) return res.status(400).json({ data: null, error: { message: 'Akun demo tidak diizinkan.' } });
  const password = getDemoPassword(identifier);
  if (!password) return res.status(404).json({ data: null, error: { message: 'Quick login belum dikonfigurasi.' } });
  try {
    const result = await login(identifier, password);
    if (!result) return res.status(401).json({ data: null, error: { message: 'Autentikasi akun demo gagal.' } });
    setSessionCookies(res, result.session);
    return res.json({ data: { profile: result.profile }, error: null });
  } catch (error) { return next(error); }
});
app.post('/api/auth/logout', async (req, res, next) => {
  try {
    res.clearCookie('smkn26_access', cookieOptions(0));
    res.clearCookie('smkn26_refresh', cookieOptions(0));
    return res.json({ data: { signedOut: true }, error: null });
  } catch (error) { return next(error); }
});
app.get('/api/me', authenticate, async (req, res, next) => {
  try { return res.json({ data: await getMe(req.auth.userId), error: null }); } catch (error) { return next(error); }
});
app.get('/api/me/permissions', authenticate, async (req, res, next) => {
  try { const me = await getMe(req.auth.userId); return res.json({ data: { roles: me.roles }, error: null }); } catch (error) { return next(error); }
});
app.use('/api', learningRouter);
app.get('/api/public/pages', async (req, res, next) => { try { return res.json({ data: await listPublishedPages(req.query.section), error: null }); } catch (error) { return next(error); } });
app.get('/api/public/pages/:slug', async (req, res, next) => { try { const pages = await listPublishedPages(); const page = pages.find((item) => item.slug === req.params.slug); if (!page) return res.status(404).json({ data: null, error: { message: 'Konten tidak ditemukan.' } }); return res.json({ data: page, error: null }); } catch (error) { return next(error); } });
app.get('/api/admin/pages', authenticate, authorize('content:manage'), async (_req, res, next) => { try { return res.json({ data: await listPagesForEditor(), error: null }); } catch (error) { return next(error); } });
app.post('/api/admin/pages', authenticate, authorize('content:manage'), async (req, res, next) => { try { return res.status(201).json({ data: await savePage(req.body, req.auth.userId), error: null }); } catch (error) { return next(error); } });
app.put('/api/admin/pages/:id', authenticate, authorize('content:manage'), async (req, res, next) => { try { return res.json({ data: await savePage(req.body, req.auth.userId, req.params.id), error: null }); } catch (error) { return next(error); } });
app.delete('/api/admin/pages/:id', authenticate, authorize('content:manage'), async (req, res, next) => { try { await deletePage(req.params.id); return res.json({ data: { deleted: true }, error: null }); } catch (error) { return next(error); } });
app.get('/api/admin/knowledge', authenticate, authorize('content:manage'), async (_req, res, next) => { try { return res.json({ data: await listKnowledge(), error: null }); } catch (error) { return next(error); } });
app.post('/api/admin/knowledge/text', authenticate, authorize('content:manage'), async (req, res, next) => { try { return res.status(201).json({ data: await createTextSource({ ...req.body, userId: req.auth.userId }), error: null }); } catch (error) { return next(error); } });
app.post('/api/admin/knowledge/pdf', authenticate, authorize('content:manage'), upload.single('file'), async (req, res, next) => { try { return res.status(201).json({ data: await createPdfSource(req.file, { title: req.body?.title, sourceUrl: req.body?.sourceUrl, userId: req.auth.userId }), error: null }); } catch (error) { return next(error); } });
app.post('/api/admin/knowledge/:id/status', authenticate, authorize('content:manage'), async (req, res, next) => { try { return res.json({ data: await setKnowledgeStatus(req.params.id, req.body?.status, req.auth.userId), error: null }); } catch (error) { return next(error); } });
app.post('/api/chat', chatLimiter, (req,res)=>{
 const message=req.body?.message;
 if(typeof message!=='string'||!message.trim()||message.length>500)return res.status(400).json({data:null,error:{message:'Pertanyaan harus diisi (maksimal 500 karakter).'}});
  retrieveApproved(message).then(async (matches) => {
    if (!matches.length) {
      const schoolTerms = /smk|sekolah|jurusan|program|berita|kontak|alamat|pendaftaran|lsp|osis|mpk|bkk|blud|prestasi|fasilitas|tour|tur/i;
      const status = schoolTerms.test(message) ? 'insufficient_evidence' : 'out_of_scope';
      const answer = status === 'out_of_scope' ? 'Saya hanya dapat membantu informasi resmi tentang SMKN 26 Jakarta.' : 'Informasi tersebut belum ditemukan dalam sumber resmi SMKN 26 Jakarta.';
      return res.json({ data: { answer, sources: [], status }, error: null });
    }
    const sources = matches.map((item) => ({ title: item.knowledge_documents?.knowledge_sources?.title || 'Sumber sekolah', url: publicPathForKnowledgeSource(item.source_page, item.knowledge_documents?.knowledge_sources?.source_page), page: null }));
    if (!process.env.GEMINI_API_KEY) return res.json({ data: { answer: 'Sumber resmi ditemukan, tetapi layanan jawaban AI belum dikonfigurasi.', sources, status: 'insufficient_evidence' }, error: null });
    return answerFromGemini(message, matches).then((answer) => res.json({ data: { answer, sources, status: 'answered' }, error: null })).catch(() => res.status(503).json({ data: null, error: { message: 'Layanan AI sedang tidak tersedia. Coba lagi nanti.' } }));
  }).catch(() => res.status(503).json({ data: null, error: { message: 'Pencarian sumber sekolah gagal sementara.' } }));
});
app.use((error,_req,res,_next)=>{
  console.error('API error:', error?.message);
  if (error?.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ data: null, error: { message: `Ukuran PDF melebihi batas ${process.env.VERCEL ? '4' : '10'} MB.` } });
  if (error?.status) return res.status(error.status).json({ data: null, error: { message: error.message } });
  res.status(500).json({data:null,error:{message:'Terjadi kesalahan server.'}});
});
