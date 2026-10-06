import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeIdentifier } from '../src/modules/auth/auth.service.js';
import { rolePermissions } from '../src/middleware/authorize.js';
import { DEV_DEMO_ACCOUNTS, isAllowedDemoIdentifier, isLocalQuickLoginRequest } from '../src/modules/auth/dev-quick-login.js';
import { chunkText, tokenize, validatePdf } from '../src/modules/knowledge/knowledge.service.js';
import { isSuppressedPublicSource, publicPathForKnowledgeSource, publicTitleForKnowledgeSource } from '../src/modules/knowledge/knowledge.service.js';
import { answerFromApprovedFaq, answerFromKnownIntent } from '../src/modules/knowledge/gemini.service.js';

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
  assert.equal(publicPathForKnowledgeSource('portal-resmi-smkn-26-jakarta', 'information'), null);
});

test('internal FAQ and PPDB sources are never public citations', () => {
  assert.equal(isSuppressedPublicSource('knowledge/99-faq/qa-140-smkn26.md', 'FAQ terverifikasi SMKN 26 Jakarta'), true);
  assert.equal(isSuppressedPublicSource('knowledge/09-ppdb/spmb.md', 'Penerimaan Murid Baru SMKN 26 Jakarta'), true);
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

test('topic-tagged FAQ chunks deep-link and title to their public topic', () => {
  const titl = 'knowledge/99-faq/qa-140-smkn26.md::jurusan-titl';
  assert.equal(publicPathForKnowledgeSource(titl), '/majors/titl');
  assert.equal(publicTitleForKnowledgeSource(titl, 'Dataset Q&A 140 SMKN 26 Jakarta'), 'Teknik Instalasi Tenaga Listrik');
  assert.equal(publicPathForKnowledgeSource('knowledge/99-faq/qa-140-smkn26.md::lsp'), '/programs/lsp');
  assert.equal(publicTitleForKnowledgeSource('knowledge/99-faq/qa-140-smkn26.md::bkk', 'FAQ'), 'BKK SMKN 26 Jakarta');
});

test('approved FAQ fallback returns only the stored answer', () => {
  assert.equal(answerFromApprovedFaq([{ content: 'Profil sekolah\nQ: Apa motto?\nA: Belajar, Bekerja, Membangun.' }]), 'Belajar, Bekerja, Membangun.');
  assert.doesNotMatch(answerFromApprovedFaq([{ content: 'Jurusan\nQ: Ada berapa jurusan?\nA: SMKN 26 memiliki 6 jurusan. (Catatan: Nomenklatur bisa berbeda menurut tingkat/angkatan. Untuk tahun masuk tertentu, silakan cek melalui SPMB resmi atau kanal resmi sekolah.)' }], 'Ada berapa jurusan?'), /Nomenklatur|SPMB/);
  assert.equal(answerFromApprovedFaq([{ content: 'Informasi umum tanpa format FAQ.' }]), null);
});

test('known public chatbot intents use focused answers and routes', () => {
  const majors = answerFromKnownIntent('Apa saja jurusan di SMKN 26?');
  assert.match(majors.answer, /KGS/);
  assert.doesNotMatch(majors.answer, /PPLG|otomotif|nomenklatur/i);
  assert.deepEqual(majors.sources.map((source) => source.url), ['/majors']);
  assert.match(answerFromKnownIntent('Apa itu TITL?').answer, /Teknik Instalasi Tenaga Listrik/);
  assert.deepEqual(answerFromKnownIntent('Bagaimana cara melihat Virtual Tour?').sources.map((source) => source.url), ['/tour']);
  assert.deepEqual(answerFromKnownIntent('Saya mau lihat school tour').sources.map((source) => source.url), ['/tour']);
  assert.deepEqual(answerFromKnownIntent('Berapa biaya masuk SMKN 26?').sources, []);
  assert.deepEqual(answerFromKnownIntent('Program sekolah apa saja?').sources.map((source) => source.url), ['/programs/lsp', '/programs/bkk', '/programs/ekstrakurikuler']);
  assert.deepEqual(answerFromKnownIntent('Apa saja program sekolah?').sources.map((source) => source.url), ['/programs/lsp', '/programs/bkk', '/programs/ekstrakurikuler']);
  assert.doesNotMatch(answerFromKnownIntent('Apa saja program sekolah?').answer, /Visi|Misi|Kaizen/i);
});

test('stable public facts and paraphrases resolve deterministically', () => {
  const cases = [
    ['Apa nama resmi sekolah?', 'SMK Negeri 26 Jakarta.', '/profile'],
    ['NPSN berapa?', '20103787', '/profile'],
    ['Di mana lokasi SMKN 26?', 'Jl. Balai Pustaka Baru 1', '/profile'],
    ['Nomor telepon sekolah berapa?', '021-4720310', '/'],
    ['Email sekolah apa?', 'smkn26jkt@gmail.com', '/'],
    ['Apa itu KGS?', 'Konstruksi Gedung dan Sanitasi', '/majors/kgs'],
    ['Apa kepanjangan KGS?', 'Konstruksi Gedung dan Sanitasi', '/majors/kgs'],
    ['KGS singkatan dari apa?', 'Konstruksi Gedung dan Sanitasi', '/majors/kgs'],
    ['KGS itu apa?', 'Konstruksi Gedung dan Sanitasi', '/majors/kgs'],
    ['Apa itu TEK?', 'Teknik Elektronika dan Komunikasi', '/majors/tek'],
    ['Apa itu TITL?', 'Teknik Instalasi Tenaga Listrik', '/majors/titl'],
    ['Apa itu TFLM?', 'Teknik Fabrikasi Logam dan Manufaktur', '/majors/tflm'],
    ['Apa itu SIJA?', 'Sistem Informasi, Jaringan, dan Aplikasi', '/majors/sija'],
    ['Apa itu TKR?', 'Teknik Kendaraan Ringan', '/majors/tkr'],
    ['Kalau suka coding masuk jurusan mana?', 'SIJA', '/majors/sija'],
    ['Apa itu LSP?', 'LSP Pihak Kesatu', '/programs/lsp'],
    ['Apa itu BKK?', 'BKK adalah Bursa Kerja Khusus', '/programs/bkk'],
    ['Bagaimana cara melihat Virtual Tour?', 'Virtual Tour SMKN 26 Jakarta', '/tour'],
    ['Di mana melihat jurusan?', 'Daftar jurusan', '/majors'],
    ['Di mana melihat informasi LSP?', 'Informasi LSP', '/programs/lsp'],
  ];
  for (const [question, expected, source] of cases) {
    const result = answerFromKnownIntent(question);
    assert.ok(result, question);
    assert.match(result.answer, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), question);
    assert.deepEqual(result.sources.map((item) => item.url), [source], question);
  }
});

test('dynamic questions return safe refusal without a provider error', () => {
  for (const question of ['Siapa kepala sekolah sekarang?', 'Berapa biaya masuk tahun 2026?', 'Berapa SPP per bulan?', 'Siapa juara LKS terbaru?', 'Apa lowongan BKK hari ini?']) {
    const result = answerFromKnownIntent(question);
    assert.equal(result.sources.length, 0, question);
    assert.match(result.answer, /belum tersedia/i, question);
    assert.doesNotMatch(result.answer, /503|sedang tidak tersedia/i, question);
  }
});

test('history, contact, extracurricular, facilities, LSP, and BKK intents stay focused', () => {
  const history = answerFromKnownIntent('Dulu nama sekolah ini apa?');
  assert.match(history.answer, /Proyek Perintis|STM Pembangunan|1997/);
  assert.doesNotMatch(history.answer, /^Nama resmi sekolah adalah/);
  assert.deepEqual(history.sources.map((source) => source.url), ['/profile']);
  assert.match(answerFromKnownIntent('Bagaimana sejarah perubahan nama sekolah?').answer, /1986.*Sekolah Teknologi.*1997/s);
  assert.deepEqual(answerFromKnownIntent('Bagaimana cara menghubungi sekolah?').sources.map((source) => source.url), ['/']);
  assert.match(answerFromKnownIntent('Bagaimana cara menghubungi sekolah?').answer, /021-4720310.*smkn26jkt@gmail.com/);
  assert.deepEqual(answerFromKnownIntent('Email sekolah apa?').sources.map((source) => source.url), ['/']);
  assert.doesNotMatch(answerFromKnownIntent('Nomor telepon sekolah berapa?').sources.map((source) => source.url).join(','), /contact/);

  const extracurricular = answerFromKnownIntent('Apa saja ekstrakurikuler?');
  assert.match(extracurricular.answer, /24 ekstrakurikuler/);
  assert.match(extracurricular.answer, /ROHIS.*Nihon Club.*Paduan Suara/);
  assert.deepEqual(extracurricular.sources.map((source) => source.url), ['/programs/ekstrakurikuler']);
  for (const question of ['Ada basket?', 'Apakah ada futsal?', 'Ada Rohis?', 'Ada Nihon Club?', 'Ada berapa ekstrakurikulernya?']) {
    assert.match(answerFromKnownIntent(question).answer, /tercantum|24 ekstrakurikuler/);
    assert.deepEqual(answerFromKnownIntent(question).sources.map((source) => source.url), ['/programs/ekstrakurikuler']);
  }

  assert.match(answerFromKnownIntent('Ada aula?').answer, /Aula/);
  assert.match(answerFromKnownIntent('Ada ruang sidang?').answer, /Ruang Sidang/);
  assert.match(answerFromKnownIntent('Ada perpustakaan?').answer, /perpustakaan/i);
  assert.match(answerFromKnownIntent('Fasilitas apa saja?').answer, /laboratorium.*aula/s);
  assert.doesNotMatch(answerFromKnownIntent('Ada aula?').answer, /Virtual Tour/);

  assert.match(answerFromKnownIntent('Apa fungsi LSP?').answer, /sertifikasi kompetensi/);
  assert.match(answerFromKnownIntent('Sertifikasi apa saja?').answer, /Operator Pemasangan Instalasi Listrik/);
  assert.match(answerFromKnownIntent('Apakah siswa bisa ikut sertifikasi?').answer, /ketentuan peserta|syarat siswa/);
  assert.match(answerFromKnownIntent('Apa itu BKK?').answer, /Bursa Kerja Khusus/);
  assert.match(answerFromKnownIntent('Apa fungsi BKK?').answer, /bursa kerja/);
  assert.match(answerFromKnownIntent('Apa lowongan kerja hari ini?')?.answer || '', /belum tersedia/);
});
