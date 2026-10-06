import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeIdentifier } from '../src/modules/auth/auth.service.js';
import { rolePermissions } from '../src/middleware/authorize.js';
import { DEV_DEMO_ACCOUNTS, isAllowedDemoIdentifier, isLocalQuickLoginRequest } from '../src/modules/auth/dev-quick-login.js';
import { chunkText, tokenize, validatePdf } from '../src/modules/knowledge/knowledge.service.js';
import { publicPathForKnowledgeSource } from '../src/modules/knowledge/knowledge.service.js';
import { answerFromApprovedFaq } from '../src/modules/knowledge/gemini.service.js';

test('normalizes school identifiers without exposing credentials', () => {
  assert.equal(normalizeIdentifier('  demo-siswa '), 'DEMO-SISWA');
  assert.equal(normalizeIdentifier(null), '');
});

test('role permissions are additive and distinct', () => {
  assert.deepEqual(rolePermissions.BK_STAFF, ['lost_found:manage']);
  assert.notDeepEqual(rolePermissions.SUBJECT_TEACHER, rolePermissions.BK_STAFF);
});

test('quick login accepts only the fixed synthetic demo allowlist', () => {
  assert.equal(DEV_DEMO_ACCOUNTS.length, 9);
  assert.equal(isAllowedDemoIdentifier('demo-admin'), true);
  assert.equal(isAllowedDemoIdentifier('USER-DEFINED-ROLE'), false);
  assert.equal(isAllowedDemoIdentifier('DEMO-ADMIN '), true);
});

test('quick login requires a loopback request from the local Vite origin', () => {
  const request = { hostname: 'localhost', socket: { remoteAddress: '127.0.0.1' }, get: (name) => name === 'origin' ? 'http://localhost:5173' : undefined };
  assert.equal(isLocalQuickLoginRequest(request), true);
  assert.equal(isLocalQuickLoginRequest({ ...request, hostname: 'example.com' }), false);
  assert.equal(isLocalQuickLoginRequest({ ...request, get: () => 'https://example.com' }), false);
});

test('knowledge retrieval preparation chunks and tokenizes without accepting invalid PDFs', () => {
  assert.deepEqual(chunkText('Satu dua tiga', 4), ['Satu', ' dua', ' tig', 'a']);
  assert.deepEqual(tokenize('Jurusan SMKN 26 Jakarta!'), ['jurusan', 'smkn', 'jakarta']);
  assert.throws(() => validatePdf({ mimetype: 'text/plain', size: 10 }), /PDF/);
  assert.throws(() => validatePdf({ mimetype: 'application/pdf', size: 11 * 1024 * 1024 }), /PDF/);
});

test('public knowledge citations point to new-site routes', () => {
  assert.equal(publicPathForKnowledgeSource('profil-visi-misi', 'profile'), '/profile');
  assert.equal(publicPathForKnowledgeSource('portal-resmi-smkn-26-jakarta', 'information'), '/information');
});

test('jurusan citations deep-link to the specific major page', () => {
  assert.equal(publicPathForKnowledgeSource('jurusan-konstruksi-gedung-sanitasi', 'majors'), '/majors/kgs');
  assert.equal(publicPathForKnowledgeSource('jurusan-teknik-elektronika-komunikasi', 'majors'), '/majors/tek');
  assert.equal(publicPathForKnowledgeSource('jurusan-teknik-instalasi-tenaga-listrik', 'majors'), '/majors/titl');
  assert.equal(publicPathForKnowledgeSource('jurusan-teknik-fabrikasi-logam-manufaktur', 'majors'), '/majors/tflm');
  assert.equal(publicPathForKnowledgeSource('jurusan-sija', 'majors'), '/majors/sija');
  assert.equal(publicPathForKnowledgeSource('jurusan-teknik-kendaraan-ringan', 'majors'), '/majors/tkr');
});

test('the majors index source still points to the majors list', () => {
  assert.equal(publicPathForKnowledgeSource('jurusan-smkn-26-jakarta', 'majors'), '/majors');
});

test('approved FAQ fallback returns only the stored answer', () => {
  assert.equal(answerFromApprovedFaq([{ content: 'Profil sekolah\nQ: Apa motto?\nA: Belajar, Bekerja, Membangun.' }]), 'Belajar, Bekerja, Membangun.');
  assert.equal(answerFromApprovedFaq([{ content: 'Informasi umum tanpa format FAQ.' }]), null);
});
