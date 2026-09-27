import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
import { getAdminClient } from '../src/lib/supabase.js';

const resultData = (result, label) => {
  if (result.error) throw new Error(`${label}: ${result.error.message}`);
  return result.data;
};

async function profile(client, identifier) {
  const data = resultData(await client.from('profiles').select('user_id,account_type').eq('school_identifier', identifier).maybeSingle(), `Mencari ${identifier}`);
  if (!data) throw new Error(`${identifier} belum tersedia. Jalankan npm run provision:demo --workspace backend terlebih dahulu.`);
  return data;
}

async function seed() {
  const client = getAdminClient();
  const teacher = await profile(client, 'DEMO-GURU');
  const student = await profile(client, 'DEMO-SISWA');
  if (teacher.account_type !== 'TEACHER' || student.account_type !== 'STUDENT') throw new Error('Tipe akun demo tidak sesuai.');
  const year = resultData(await client.from('academic_years').upsert({ code: 'DEMO-2026', starts_on: '2026-07-01', ends_on: '2027-06-30', is_active: true }, { onConflict: 'code' }).select().single(), 'Menyimpan tahun ajaran');
  const major = resultData(await client.from('majors').upsert({ code: 'DEMO-SIJA', name: 'Sistem Informasi Jaringan dan Aplikasi (Demo)' }, { onConflict: 'code' }).select().single(), 'Menyimpan jurusan');
  const classRow = resultData(await client.from('classes').upsert({ code: 'DEMO-XI-SIJA-1', grade: 11, major_id: major.id, academic_year_id: year.id }, { onConflict: 'code,academic_year_id' }).select().single(), 'Menyimpan kelas');
  resultData(await client.from('class_memberships').upsert({ student_id: student.user_id, class_id: classRow.id, academic_year_id: year.id }, { onConflict: 'student_id,academic_year_id' }), 'Menyimpan anggota kelas');
  const subject = resultData(await client.from('subjects').upsert({ code: 'DEMO-MTK', name: 'Matematika (Demo)', description: 'Mata pelajaran sintetis untuk demonstrasi.' }, { onConflict: 'code' }).select().single(), 'Menyimpan mata pelajaran');
  const topicRows = [];
  for (const [code, name, description] of [['DEMO-LIN', 'Persamaan Linear', 'Memahami model dan penyelesaian persamaan linear.'], ['DEMO-E2E-LINEAR', 'E2E Practice Linear', 'Topik sintetis khusus untuk verifikasi practice dan persistensi nilai.'], ['DEMO-FUN', 'Fungsi', 'Memahami relasi, fungsi, dan representasinya.'], ['DEMO-STA', 'Statistika Dasar', 'Membaca dan mengolah data sederhana.']]) topicRows.push(resultData(await client.from('learning_topics').upsert({ subject_id: subject.id, code, name, description, grade_level: 11, sort_order: topicRows.length }, { onConflict: 'subject_id,code' }).select().single(), `Menyimpan topik ${code}`));
  const assignment = resultData(await client.from('teacher_subject_assignments').upsert({ teacher_id: teacher.user_id, subject_id: subject.id, class_id: classRow.id, academic_year_id: year.id, is_active: true, valid_from: '2026-07-01T00:00:00Z' }, { onConflict: 'teacher_id,subject_id,class_id,academic_year_id' }).select().single(), 'Menyimpan penugasan guru');
  let assessment = resultData(await client.from('assessments').select('id').eq('teacher_assignment_id', assignment.id).eq('topic_id', topicRows[0].id).eq('title', 'Assessment Demo Persamaan Linear').maybeSingle(), 'Mencari assessment demo');
  if (!assessment) assessment = resultData(await client.from('assessments').insert({ teacher_assignment_id: assignment.id, topic_id: topicRows[0].id, title: 'Assessment Demo Persamaan Linear', assessment_date: '2026-09-27', minimum_score: 75, max_score: 100, created_by: teacher.user_id }).select().single(), 'Menyimpan assessment demo');
  resultData(await client.from('student_scores').upsert({ assessment_id: assessment.id, student_id: student.user_id, score: 68, notes: 'Data sintetis demo.', recorded_by: teacher.user_id }, { onConflict: 'assessment_id,student_id' }), 'Menyimpan nilai demo');
  let e2eAssessment = resultData(await client.from('assessments').select('id').eq('teacher_assignment_id', assignment.id).eq('topic_id', topicRows[1].id).eq('title', 'E2E Assessment - Score Update').maybeSingle(), 'Mencari assessment E2E');
  if (!e2eAssessment) e2eAssessment = resultData(await client.from('assessments').insert({ teacher_assignment_id: assignment.id, topic_id: topicRows[1].id, title: 'E2E Assessment - Score Update', assessment_date: '2026-09-27', minimum_score: 75, max_score: 100, created_by: teacher.user_id }).select().single(), 'Menyimpan assessment E2E');
  resultData(await client.from('student_scores').upsert({ assessment_id: e2eAssessment.id, student_id: student.user_id, score: 60, notes: 'Data sintetis E2E.', recorded_by: teacher.user_id }, { onConflict: 'assessment_id,student_id' }), 'Menyimpan nilai E2E');
  for (const topic of topicRows) resultData(await client.from('learning_resources').upsert({ topic_id: topic.id, title: `Materi Demo: ${topic.name}`, description: 'Sumber belajar sintetis yang disetujui untuk demo.', resource_type: 'ARTICLE', is_approved: true, created_by: teacher.user_id }, { onConflict: 'topic_id,title' }), 'Menyimpan sumber belajar demo');
  console.log('Seed learning demo selesai. Data seluruhnya sintetis.');
}

seed().catch((error) => { console.error(error.message); process.exitCode = 1; });
