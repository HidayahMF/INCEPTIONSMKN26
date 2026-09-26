import { getAdminClient } from '../../lib/supabase.js';
import { getRoles } from '../auth/auth.service.js';

export class LearningError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const now = () => new Date().toISOString();
const activeAssignment = (row) => row.is_active && new Date(row.valid_from) <= new Date() && (!row.valid_until || new Date(row.valid_until) > new Date());

async function one(query, notFound = 'Data tidak ditemukan.') {
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  if (!data) throw new LearningError(404, notFound);
  return data;
}

async function assertGradePermission(userId) {
  const roles = await getRoles(userId);
  const allowed = roles.some((role) => role.role_code === 'ADMIN' || role.role_code === 'SUBJECT_TEACHER');
  if (!allowed) throw new LearningError(403, 'Anda tidak memiliki izin mengelola nilai.');
  return roles;
}

async function getAssignmentForTeacher(userId, assignmentId, allowAdmin = false) {
  await assertGradePermission(userId);
  const client = getAdminClient();
  const assignment = await one(
    client.from('teacher_subject_assignments').select('id,teacher_id,subject_id,class_id,academic_year_id,is_active,valid_from,valid_until,subjects(id,code,name),academic_years(id,code)').eq('id', assignmentId),
    'Penugasan mengajar tidak ditemukan.',
  );
  assignment.classes = await getClass(assignment.class_id, assignment.academic_year_id);
  const roles = await getRoles(userId);
  const isAdmin = allowAdmin && roles.some((role) => role.role_code === 'ADMIN');
  if (!isAdmin && assignment.teacher_id !== userId) throw new LearningError(403, 'Penugasan ini bukan milik Anda.');
  if (!assignment.is_active || !activeAssignment(assignment)) throw new LearningError(403, 'Penugasan mengajar tidak aktif.');
  return assignment;
}

async function getTopic(topicId) {
  return one(getAdminClient().from('learning_topics').select('id,subject_id,code,name,description,grade_level,sort_order,subjects(id,code,name)').eq('id', topicId), 'Topik pembelajaran tidak ditemukan.');
}

async function getClass(classId, academicYearId) {
  return one(getAdminClient().from('classes').select('id,code,grade,academic_year_id').eq('id', classId).eq('academic_year_id', academicYearId), 'Kelas tidak ditemukan.');
}

export function recommendation(topic, subject, scoreRows, assessmentRows, resources) {
  const assessments = assessmentRows.filter((assessment) => assessment.topic_id === topic.id);
  const scoresByAssessment = new Map(scoreRows.map((score) => [score.assessment_id, score]));
  const evidence = assessments.map((assessment) => {
    const score = scoresByAssessment.get(assessment.id);
    if (!score) return null;
    const percentage = Number(score.score) / Number(assessment.max_score) * 100;
    const target = Number(assessment.minimum_score) / Number(assessment.max_score) * 100;
    return { assessment, score, percentage, target };
  }).filter(Boolean);
  if (!evidence.length) {
    return { topicId: topic.id, topicName: topic.name, subjectName: subject.name, averageScore: null, targetScore: null, gap: null, assessmentCount: 0, status: 'NOT_ENOUGH_DATA', approvedResources: [] };
  }
  const averageScore = evidence.reduce((sum, item) => sum + item.percentage, 0) / evidence.length;
  const targetScore = evidence.reduce((sum, item) => sum + item.target, 0) / evidence.length;
  // Scores are normalized to percentages per assessment, then averaged. The gap is target minus average; a positive gap means review is needed.
  const gap = Math.max(0, targetScore - averageScore);
  const status = averageScore < targetScore ? 'NEEDS_ATTENTION' : averageScore >= targetScore + 10 ? 'MASTERED' : 'ON_TRACK';
  return { topicId: topic.id, topicName: topic.name, subjectName: subject.name, averageScore, targetScore, gap, assessmentCount: evidence.length, status, approvedResources: resources.filter((resource) => resource.topic_id === topic.id && resource.is_approved) };
}

export async function getStudentLearningSummary(userId) {
  const client = getAdminClient();
  const { data: memberships, error: membershipError } = await client.from('class_memberships').select('class_id,academic_year_id').eq('student_id', userId);
  if (membershipError) throw membershipError;
  const classIds = (memberships || []).map((item) => item.class_id);
  if (!classIds.length) return { subjects: [], summary: { assessedSubjects: 0, needsAttention: 0, mastered: 0 }, weakTopics: [] };
  const assignmentsResult = await client.from('teacher_subject_assignments').select('id,subject_id,class_id,academic_year_id,is_active,valid_from,valid_until,subjects(id,code,name)').in('class_id', classIds).eq('is_active', true);
  if (assignmentsResult.error) throw assignmentsResult.error;
  const membershipKeys = new Set((memberships || []).map((item) => `${item.class_id}:${item.academic_year_id}`));
  const assignments = (assignmentsResult.data || []).filter((assignment) => membershipKeys.has(`${assignment.class_id}:${assignment.academic_year_id}`) && activeAssignment(assignment));
  const assignmentIds = assignments.map((item) => item.id);
  if (!assignmentIds.length) return { subjects: [], summary: { assessedSubjects: 0, needsAttention: 0, mastered: 0 }, weakTopics: [] };
  const assessmentsResult = await client.from('assessments').select('id,teacher_assignment_id,topic_id,title,assessment_date,minimum_score,max_score').in('teacher_assignment_id', assignmentIds).order('assessment_date', { ascending: false });
  if (assessmentsResult.error) throw assessmentsResult.error;
  const assessments = assessmentsResult.data || [];
  const assessmentIds = assessments.map((item) => item.id);
  const scoresResult = assessmentIds.length ? await client.from('student_scores').select('id,assessment_id,score,notes').eq('student_id', userId).in('assessment_id', assessmentIds) : { data: [], error: null };
  if (scoresResult.error) throw scoresResult.error;
  const topicIds = [...new Set(assessments.map((item) => item.topic_id))];
  const topicsResult = topicIds.length ? await client.from('learning_topics').select('id,subject_id,code,name,description,grade_level,sort_order').in('id', topicIds) : { data: [], error: null };
  if (topicsResult.error) throw topicsResult.error;
  const resourcesResult = topicIds.length ? await client.from('learning_resources').select('id,topic_id,title,description,resource_type,url,is_approved').in('topic_id', topicIds).eq('is_approved', true) : { data: [], error: null };
  if (resourcesResult.error) throw resourcesResult.error;
  const subjects = assignments.reduce((result, assignment) => {
    if (!result.has(assignment.subject_id)) result.set(assignment.subject_id, { id: assignment.subject_id, code: assignment.subjects.code, name: assignment.subjects.name, topics: [] });
    return result;
  }, new Map());
  const recommendations = (topicsResult.data || []).map((topic) => {
    const assignmentSubject = assignments.find((assignment) => assignment.subject_id === topic.subject_id)?.subjects;
    return recommendation(topic, assignmentSubject || { name: 'Mata pelajaran' }, scoresResult.data || [], assessments.filter((assessment) => assignments.some((assignment) => assignment.id === assessment.teacher_assignment_id && assignment.subject_id === topic.subject_id)), resourcesResult.data || []);
  });
  for (const item of recommendations) subjects.get((topicsResult.data || []).find((topic) => topic.id === item.topicId)?.subject_id)?.topics.push(item);
  const weakTopics = recommendations.filter((item) => item.status === 'NEEDS_ATTENTION').sort((a, b) => (b.gap || 0) - (a.gap || 0));
  return {
    subjects: [...subjects.values()].map((subject) => ({ ...subject, assessedTopics: subject.topics.filter((topic) => topic.assessmentCount > 0).length, status: subject.topics.some((topic) => topic.status === 'NEEDS_ATTENTION') ? 'NEEDS_ATTENTION' : subject.topics.some((topic) => topic.assessmentCount > 0) ? 'ON_TRACK' : 'NOT_ENOUGH_DATA' })),
    summary: { assessedSubjects: [...subjects.values()].filter((subject) => subject.topics.some((topic) => topic.assessmentCount > 0)).length, needsAttention: weakTopics.length, mastered: recommendations.filter((item) => item.status === 'MASTERED').length },
    weakTopics,
  };
}

export async function getStudentSubjectDetail(userId, subjectId) {
  const client = getAdminClient();
  const subject = await one(client.from('subjects').select('id,code,name,description').eq('id', subjectId), 'Mata pelajaran tidak ditemukan.');
  const summary = await getStudentLearningSummary(userId);
  const subjectSummary = summary.subjects.find((item) => item.id === subjectId);
  if (!subjectSummary) return { subject, topics: [] };
  const memberships = (await client.from('class_memberships').select('class_id,academic_year_id').eq('student_id', userId)).data || [];
  const assignmentCandidates = memberships.length ? (await client.from('teacher_subject_assignments').select('id,class_id,academic_year_id,valid_from,valid_until').eq('subject_id', subjectId).eq('is_active', true).in('class_id', memberships.map((item) => item.class_id))).data || [] : [];
  const membershipKeys = new Set(memberships.map((item) => `${item.class_id}:${item.academic_year_id}`));
  const assignmentIds = assignmentCandidates.filter((assignment) => membershipKeys.has(`${assignment.class_id}:${assignment.academic_year_id}`) && activeAssignment(assignment));
  const assessments = assignmentIds.length ? (await client.from('assessments').select('id,title,assessment_date,minimum_score,max_score,topic_id,teacher_assignment_id').in('teacher_assignment_id', assignmentIds.map((item) => item.id))).data || [] : [];
  const scores = assessments.length ? (await client.from('student_scores').select('assessment_id,score,notes').eq('student_id', userId).in('assessment_id', assessments.map((item) => item.id))).data || [] : [];
  return { subject, topics: subjectSummary.topics, assessments: assessments.map((assessment) => ({ ...assessment, score: scores.find((score) => score.assessment_id === assessment.id)?.score ?? null })) };
}

export async function getTeacherAssignments(userId) {
  await assertGradePermission(userId);
  const { data, error } = await getAdminClient().from('teacher_subject_assignments').select('id,teacher_id,subject_id,class_id,academic_year_id,is_active,valid_from,valid_until,subjects(id,code,name),academic_years(id,code)').eq('teacher_id', userId).eq('is_active', true);
  if (error) throw error;
  return Promise.all((data || []).filter(activeAssignment).map(async (assignment) => ({ ...assignment, classes: await getClass(assignment.class_id, assignment.academic_year_id) })));
}

export async function getAssignmentStudents(userId, assignmentId) {
  const assignment = await getAssignmentForTeacher(userId, assignmentId);
  const { data, error } = await getAdminClient().from('class_memberships').select('student_id,profiles(user_id,school_identifier,display_name,account_type)').eq('class_id', assignment.class_id).eq('academic_year_id', assignment.academic_year_id);
  if (error) throw error;
  return { assignment, students: data || [] };
}

export async function getAssignmentTopics(userId, assignmentId) {
  const assignment = await getAssignmentForTeacher(userId, assignmentId);
  const { data, error } = await getAdminClient().from('learning_topics').select('id,subject_id,code,name,description,grade_level,sort_order').eq('subject_id', assignment.subject_id).order('sort_order');
  if (error) throw error;
  return data || [];
}

export async function getAssignmentAssessments(userId, assignmentId) {
  const assignment = await getAssignmentForTeacher(userId, assignmentId);
  const { data, error } = await getAdminClient().from('assessments').select('id,topic_id,title,assessment_date,minimum_score,max_score,student_scores(id,student_id,score,notes)').eq('teacher_assignment_id', assignment.id).order('assessment_date', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateAssessmentScores(userId, assessmentId, scores) {
  return upsertAssessmentScores(userId, assessmentId, scores);
}

export async function createAssessment(userId, payload) {
  const assignment = await getAssignmentForTeacher(userId, payload.assignmentId);
  const topic = await getTopic(payload.topicId);
  if (topic.subject_id !== assignment.subject_id) throw new LearningError(400, 'Topik tidak sesuai dengan mata pelajaran penugasan.');
  if (!payload.title?.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(payload.assessmentDate)) throw new LearningError(400, 'Judul dan tanggal penilaian wajib valid.');
  const minimumScore = Number(payload.minimumScore);
  const maxScore = Number(payload.maxScore);
  if (!Number.isFinite(minimumScore) || !Number.isFinite(maxScore) || minimumScore < 0 || maxScore <= 0 || minimumScore > maxScore) throw new LearningError(400, 'Rentang target nilai tidak valid.');
  const { data, error } = await getAdminClient().from('assessments').insert({ teacher_assignment_id: assignment.id, topic_id: topic.id, title: payload.title.trim(), assessment_date: payload.assessmentDate, minimum_score: minimumScore, max_score: maxScore, created_by: userId }).select().single();
  if (error) throw error;
  return data;
}

export async function upsertAssessmentScores(userId, assessmentId, scores) {
  const client = getAdminClient();
  const assessment = await one(client.from('assessments').select('id,max_score,teacher_assignment_id,teacher_subject_assignments(class_id,academic_year_id,teacher_id)').eq('id', assessmentId), 'Assessment tidak ditemukan.');
  if (assessment.teacher_subject_assignments.teacher_id !== userId) throw new LearningError(403, 'Assessment ini bukan milik Anda.');
  if (!Array.isArray(scores) || !scores.length) throw new LearningError(400, 'Minimal satu nilai harus dikirim.');
  const studentIds = scores.map((item) => item.studentId);
  const memberships = await client.from('class_memberships').select('student_id').eq('class_id', assessment.teacher_subject_assignments.class_id).eq('academic_year_id', assessment.teacher_subject_assignments.academic_year_id).in('student_id', studentIds);
  if (memberships.error) throw memberships.error;
  const allowed = new Set((memberships.data || []).map((item) => item.student_id));
  if (studentIds.some((id) => !allowed.has(id))) throw new LearningError(403, 'Ada siswa yang bukan anggota kelas penugasan.');
  const rows = scores.map((item) => {
    const score = Number(item.score);
    if (!Number.isFinite(score) || score < 0 || score > Number(assessment.max_score)) throw new LearningError(400, 'Nilai harus berada dalam rentang assessment.');
    return { assessment_id: assessmentId, student_id: item.studentId, score, notes: typeof item.notes === 'string' ? item.notes.trim() || null : null, recorded_by: userId, updated_at: now() };
  });
  const { data, error } = await client.from('student_scores').upsert(rows, { onConflict: 'assessment_id,student_id' }).select('id,assessment_id,student_id,score,notes,updated_at');
  if (error) throw error;
  return data || [];
}

export async function createPracticePrompt(userId, topicId) {
  const topic = await getTopic(topicId);
  const summary = await getStudentLearningSummary(userId);
  const item = summary.weakTopics.find((weakTopic) => weakTopic.topicId === topicId) || summary.subjects.flatMap((subject) => subject.topics).find((candidate) => candidate.topicId === topicId);
  const band = item?.status === 'NEEDS_ATTENTION' ? 'needs review' : item?.status === 'MASTERED' ? 'mastered' : 'not enough data';
  return { topic, proficiencyBand: band };
}
