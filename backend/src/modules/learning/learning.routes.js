import { Router } from 'express';
import { authenticate } from '../../middleware/auth.js';
import {
  LearningError,
  createAssessment,
  createPracticePrompt,
  getAssignmentStudents,
  getAssignmentAssessments,
  getAssignmentTopics,
  getStudentLearningSummary,
  getStudentSubjectDetail,
  getTeacherAssignments,
  upsertAssessmentScores,
} from './learning.service.js';
import { practiceFromGemini } from '../knowledge/gemini.service.js';

export const learningRouter = Router();
learningRouter.use(authenticate);

function studentOnly(handler) {
  return handle((req) => {
    if (req.auth.profile?.account_type !== 'STUDENT') throw new LearningError(403, 'Fitur ini hanya tersedia untuk siswa.');
    return handler(req);
  });
}

function handle(handler) {
  return async (req, res, next) => {
    try {
      return res.json({ data: await handler(req), error: null });
    } catch (error) {
      if (error instanceof LearningError) return res.status(error.status).json({ data: null, error: { message: error.message } });
      return next(error);
    }
  };
}

learningRouter.get('/student/learning', studentOnly((req) => getStudentLearningSummary(req.auth.userId)));
learningRouter.get('/student/learning/subjects/:subjectId', studentOnly((req) => getStudentSubjectDetail(req.auth.userId, req.params.subjectId)));
learningRouter.post('/student/learning/topics/:topicId/practice', studentOnly(async (req) => {
  const context = await createPracticePrompt(req.auth.userId, req.params.topicId);
  if (!process.env.GEMINI_API_KEY) return { ...context, generated: false, explanation: 'Latihan AI belum dikonfigurasi. Gunakan sumber belajar yang disetujui untuk mempelajari topik ini.', questions: [] };
  const generated = await practiceFromGemini(context.topic, context.proficiencyBand);
  return { ...context, generated: true, ...generated };
}));

learningRouter.get('/teacher/learning/assignments', handle((req) => getTeacherAssignments(req.auth.userId)));
learningRouter.get('/teacher/learning/assignments/:assignmentId/students', handle((req) => getAssignmentStudents(req.auth.userId, req.params.assignmentId)));
learningRouter.get('/teacher/learning/assignments/:assignmentId/topics', handle((req) => getAssignmentTopics(req.auth.userId, req.params.assignmentId)));
learningRouter.get('/teacher/learning/assignments/:assignmentId/assessments', handle((req) => getAssignmentAssessments(req.auth.userId, req.params.assignmentId)));
learningRouter.post('/teacher/learning/assessments', handle((req) => createAssessment(req.auth.userId, req.body || {})));
learningRouter.post('/teacher/learning/assessments/:assessmentId/scores', handle((req) => upsertAssessmentScores(req.auth.userId, req.params.assessmentId, req.body?.scores)));
