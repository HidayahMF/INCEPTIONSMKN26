import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import { PortfolioError, createAchievement, createPortfolio, deleteAchievement, deletePortfolio, listReviews, listStudentAchievements, listStudentPortfolio, reviewRecord, signedFile, submitAchievement, submitPortfolio, updateAchievement, updatePortfolio, uploadFile } from './portfolio.service.js';

export const portfolioRouter = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1 } });
function handle(handler) { return async (req, res, next) => { try { return res.json({ data: await handler(req), error: null }); } catch (error) { if (error instanceof PortfolioError) return res.status(error.status).json({ data: null, error: { message: error.message } }); if (error?.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ data: null, error: { message: 'Ukuran file maksimal 5 MB.' } }); return next(error); } }; }
function studentOnly(handler) { return handle((req) => { if (req.auth.profile?.account_type !== 'STUDENT') throw new PortfolioError(403, 'Fitur ini hanya tersedia untuk siswa.'); return handler(req); }); }
portfolioRouter.get('/student/portfolio', authenticate, studentOnly((req) => listStudentPortfolio(req.auth.userId)));
portfolioRouter.post('/student/portfolio', authenticate, studentOnly((req) => createPortfolio(req.auth.userId, req.body || {})));
portfolioRouter.put('/student/portfolio/:id', authenticate, studentOnly((req) => updatePortfolio(req.auth.userId, req.params.id, req.body || {})));
portfolioRouter.delete('/student/portfolio/:id', authenticate, studentOnly((req) => deletePortfolio(req.auth.userId, req.params.id)));
portfolioRouter.post('/student/portfolio/:id/submit', authenticate, studentOnly((req) => submitPortfolio(req.auth.userId, req.params.id)));
portfolioRouter.get('/student/achievements', authenticate, studentOnly((req) => listStudentAchievements(req.auth.userId)));
portfolioRouter.post('/student/achievements', authenticate, studentOnly((req) => createAchievement(req.auth.userId, req.body || {})));
portfolioRouter.put('/student/achievements/:id', authenticate, studentOnly((req) => updateAchievement(req.auth.userId, req.params.id, req.body || {})));
portfolioRouter.delete('/student/achievements/:id', authenticate, studentOnly((req) => deleteAchievement(req.auth.userId, req.params.id)));
portfolioRouter.post('/student/achievements/:id/submit', authenticate, studentOnly((req) => submitAchievement(req.auth.userId, req.params.id)));
portfolioRouter.post('/student/files/:kind', authenticate, upload.single('file'), studentOnly((req) => { if (!['portfolio', 'achievement'].includes(req.params.kind)) throw new PortfolioError(400, 'Jenis file tidak valid.'); return uploadFile(req.auth.userId, req.params.kind, req.body?.recordId, req.file); }));
portfolioRouter.get('/files/:kind/:id', authenticate, handle((req) => signedFile(req.auth.userId, req.params.kind, req.params.id)));
portfolioRouter.get('/reviewer/portfolio', authenticate, authorize('portfolio:review'), handle(() => listReviews('portfolio')));
portfolioRouter.post('/reviewer/portfolio/:id/review', authenticate, authorize('portfolio:review'), handle((req) => reviewRecord('portfolio', req.auth.userId, req.params.id, req.body?.decision, req.body?.note)));
portfolioRouter.get('/reviewer/achievements', authenticate, authorize('portfolio:review'), handle(() => listReviews('achievement')));
portfolioRouter.post('/reviewer/achievements/:id/review', authenticate, authorize('portfolio:review'), handle((req) => reviewRecord('achievement', req.auth.userId, req.params.id, req.body?.decision, req.body?.note)));
