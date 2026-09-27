import test from 'node:test';
import assert from 'node:assert/strict';
import { createPracticePrompt } from '../src/modules/knowledge/gemini.service.js';
import { recommendation, proficiencyBandForStatus } from '../src/modules/learning/learning.service.js';
import { rolePermissions } from '../src/middleware/authorize.js';

const topic = { id: 'topic-1', name: 'Persamaan Linear' };
const subject = { name: 'Matematika Demo' };
const assessment = { id: 'assessment-1', topic_id: 'topic-1', max_score: 100, minimum_score: 75 };

test('recommendation returns NOT_ENOUGH_DATA without recorded scores', () => {
  const result = recommendation(topic, subject, [], [assessment], [{ id: 'draft', topic_id: 'topic-1', is_approved: false }]);
  assert.equal(result.status, 'NOT_ENOUGH_DATA');
  assert.equal(result.averageScore, null);
  assert.deepEqual(result.approvedResources, []);
});

test('recommendation returns NEEDS_ATTENTION below target and orders approved resources only', () => {
  const result = recommendation(topic, subject, [{ assessment_id: 'assessment-1', score: 68 }], [assessment], [
    { id: 'approved', topic_id: 'topic-1', title: 'Materi approved', is_approved: true },
    { id: 'draft', topic_id: 'topic-1', title: 'Materi draft', is_approved: false },
  ]);
  assert.equal(result.status, 'NEEDS_ATTENTION');
  assert.equal(result.averageScore, 68);
  assert.equal(result.targetScore, 75);
  assert.equal(result.gap, 7);
  assert.deepEqual(result.approvedResources.map((item) => item.id), ['approved']);
});

test('teacher grade permission remains separate from unrelated roles', () => {
  assert.deepEqual(rolePermissions.SUBJECT_TEACHER, ['grades:manage']);
  assert.equal(rolePermissions.BK_STAFF.includes('grades:manage'), false);
});

test('student recommendation formula changes when the same assessment score is updated', () => {
  const weak = recommendation(topic, subject, [{ assessment_id: 'assessment-1', score: 68 }], [assessment], []);
  const stronger = recommendation(topic, subject, [{ assessment_id: 'assessment-1', score: 85 }], [assessment], []);
  assert.equal(weak.averageScore, 68);
  assert.equal(weak.gap, 7);
  assert.equal(weak.status, 'NEEDS_ATTENTION');
  assert.equal(stronger.averageScore, 85);
  assert.equal(stronger.gap, 0);
  assert.equal(stronger.status, 'MASTERED');
});

test('proficiency band mapping is explicit for every recommendation status', () => {
  assert.equal(proficiencyBandForStatus('NEEDS_ATTENTION'), 'needs review');
  assert.equal(proficiencyBandForStatus('ON_TRACK'), 'on track');
  assert.equal(proficiencyBandForStatus('MASTERED'), 'mastered');
  assert.equal(proficiencyBandForStatus('NOT_ENOUGH_DATA'), 'not enough data');
});

test('practice prompt contains only approved topic context and no student fields', () => {
  const prompt = createPracticePrompt({ subjects: { name: 'Matematika' }, name: 'Persamaan Linear', description: 'Materi aljabar.' }, 'needs review');
  assert.match(prompt, /Mata pelajaran: Matematika/);
  assert.match(prompt, /Topik: Persamaan Linear/);
  assert.doesNotMatch(prompt, /Siswa Demo|DEMO-SISWA|student-uuid|NIS-123|KELAS-123|Guru Demo|nilai-raw/i);
});
