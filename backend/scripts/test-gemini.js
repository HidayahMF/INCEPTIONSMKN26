import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { getGeminiModel } from '../src/modules/knowledge/gemini.service.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const model = getGeminiModel();
console.log(`Model: ${model}`);
if (!process.env.GEMINI_API_KEY) {
  console.log('Status: NOT_CONFIGURED');
  console.log('Error: GEMINI_API_KEY is not configured.');
  process.exitCode = 1;
} else {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'Balas tepat: Gemini OK' }] }], generationConfig: { temperature: 0, maxOutputTokens: 20 } }),
  });
  const body = await response.json().catch(() => ({}));
  console.log(`Status: ${response.status}`);
  if (response.ok) {
    console.log(body.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '(empty response)');
  } else {
    const code = body.error?.status || `HTTP_${response.status}`;
    const message = typeof body.error?.message === 'string' ? body.error.message.slice(0, 300) : 'Gemini request failed.';
    console.log(`Error: code=${code} message=${message}`);
    process.exitCode = 1;
  }
}
