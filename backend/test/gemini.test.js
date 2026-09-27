import test from 'node:test';
import assert from 'node:assert/strict';
import { getGeminiModel, GeminiError, practiceFromGemini } from '../src/modules/knowledge/gemini.service.js';

test('Gemini uses the configured non-legacy model', () => {
  const previous = process.env.GEMINI_MODEL;
  delete process.env.GEMINI_MODEL;
  assert.equal(getGeminiModel(), 'gemini-3.5-flash-lite');
  assert.notEqual(getGeminiModel(), ['gemini', '1.5', 'flash'].join('-'));
  assert.notEqual(getGeminiModel(), ['gemini', '2.0', 'flash'].join('-'));
  if (previous === undefined) delete process.env.GEMINI_MODEL;
  else process.env.GEMINI_MODEL = previous;
});

test('missing API key returns a safe provider error', async () => {
  const previous = process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_API_KEY;
  await assert.rejects(
    practiceFromGemini({ subjects: { name: 'Matematika' }, name: 'Topik', description: 'Deskripsi' }, 'on track'),
    (error) => error instanceof GeminiError && error.status === 503 && error.code === 'MISSING_API_KEY',
  );
  if (previous === undefined) delete process.env.GEMINI_API_KEY;
  else process.env.GEMINI_API_KEY = previous;
});

test('practice provider output is capped at three questions', async () => {
  const previousKey = process.env.GEMINI_API_KEY;
  const previousFetch = globalThis.fetch;
  process.env.GEMINI_API_KEY = 'test-key';
  globalThis.fetch = async () => new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify({ explanation: 'Penjelasan', questions: ['1', '2', '3', '4'] }) }] } }] }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  try {
    const result = await practiceFromGemini({ subjects: { name: 'Matematika' }, name: 'Topik', description: 'Deskripsi' }, 'on track');
    assert.deepEqual(result.questions, ['1', '2', '3']);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = previousKey;
  }
});

test('provider failure is represented as a 503 GeminiError', async () => {
  const previousKey = process.env.GEMINI_API_KEY;
  const previousFetch = globalThis.fetch;
  process.env.GEMINI_API_KEY = 'test-key';
  globalThis.fetch = async () => new Response(JSON.stringify({ error: { status: 'NOT_FOUND', message: 'model unavailable' } }), { status: 404, statusText: 'Not Found' });
  try {
    await assert.rejects(
      practiceFromGemini({ subjects: { name: 'Matematika' }, name: 'Topik', description: 'Deskripsi' }, 'on track'),
      (error) => error instanceof GeminiError && error.status === 503 && error.code === 'NOT_FOUND',
    );
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = previousKey;
  }
});
