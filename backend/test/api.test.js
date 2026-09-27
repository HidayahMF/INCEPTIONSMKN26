import test from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../src/app.js';

async function request(path, options = {}) {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  try {
    return await fetch(`http://127.0.0.1:${port}${path}`, options);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

test('public API routes do not require a session while learning APIs do', async () => {
  const health = await request('/api/health');
  assert.equal(health.status, 200);

  const pages = await request('/api/public/pages');
  assert.notEqual(pages.status, 401);

  const chat = await request('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Apa informasi resmi tentang SMKN 26 Jakarta?' }),
  });
  assert.notEqual(chat.status, 401);
  assert.ok([200, 503].includes(chat.status));

  const student = await request('/api/student/learning');
  assert.equal(student.status, 401);

  const teacher = await request('/api/teacher/learning/assignments');
  assert.equal(teacher.status, 401);
});
