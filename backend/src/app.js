import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { login, getMe } from './modules/auth/auth.service.js';
import { getAuthClient } from './lib/supabase.js';
import { authenticate } from './middleware/auth.js';
export const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json({limit:'16kb'}));
app.use(cookieParser());
app.get('/api/health', (_req,res)=>res.json({data:{status:'ok'},error:null}));
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false, message: { data: null, error: { message: 'Terlalu banyak percobaan login. Coba lagi nanti.' } } });
const cookieOptions = (maxAge) => ({ httpOnly: true, secure: process.env.COOKIE_SECURE === 'true', sameSite: process.env.COOKIE_SAME_SITE || 'lax', path: '/', maxAge });
app.post('/api/auth/login', loginLimiter, async (req, res, next) => {
  try {
    const result = await login(req.body?.identifier, req.body?.password);
    if (!result) return res.status(401).json({ data: null, error: { message: 'Identifier atau password salah.' } });
    res.cookie('smkn26_access', result.session.access_token, cookieOptions(result.session.expires_in * 1000));
    res.cookie('smkn26_refresh', result.session.refresh_token, cookieOptions(30 * 24 * 60 * 60 * 1000));
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
app.post('/api/chat', (req,res)=>{
 const message=req.body?.message;
 if(typeof message!=='string'||!message.trim()||message.length>500)return res.status(400).json({data:null,error:{message:'Pertanyaan harus diisi (maksimal 500 karakter).'}});
 return res.status(503).json({data:null,error:{message:'Chatbot belum diaktifkan: Gemini API dan sumber sekolah terverifikasi belum dikonfigurasi.'}});
});
app.use((error,_req,res,_next)=>{console.error('API error:',error?.message);res.status(500).json({data:null,error:{message:'Terjadi kesalahan server.'}})});
