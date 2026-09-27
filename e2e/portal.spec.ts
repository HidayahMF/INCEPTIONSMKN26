import { expect, test, type Page } from '@playwright/test';

async function demoLogin(page: Page, identifier: 'DEMO-GURU' | 'DEMO-SISWA') {
  await page.goto('/login');
  await page.getByRole('button', { name: identifier === 'DEMO-GURU' ? 'Guru Demo' : 'Siswa Demo' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function apiJson<T>(page: Page, path: string, options: RequestInit = {}) {
  return page.evaluate(async ({ path, options }) => {
    const response = await fetch(path, options);
    return { status: response.status, body: await response.json() as { data: T; error: { message: string } | null } };
  }, { path, options });
}

async function ensureE2eAssessment(page: Page, score: number) {
  const assignmentsResponse = await apiJson<{ id: string; subjects: { code: string } }[]>(page, '/api/teacher/learning/assignments');
  expect(assignmentsResponse.status).toBe(200);
  const assignment = assignmentsResponse.body.data.find((item) => item.subjects.code === 'DEMO-MTK');
  expect(assignment, 'DEMO-MTK assignment must be seeded').toBeTruthy();
  const topicsResponse = await apiJson<{ id: string; code: string }[]>(page, `/api/teacher/learning/assignments/${assignment!.id}/topics`);
  expect(topicsResponse.status).toBe(200);
  const topic = topicsResponse.body.data.find((item) => item.code === 'DEMO-E2E-LINEAR');
  expect(topic, 'DEMO-E2E-LINEAR topic must be seeded; run seed:learning-demo').toBeTruthy();
  const assessmentsResponse = await apiJson<{ id: string; topic_id: string; title: string }[]>(page, `/api/teacher/learning/assignments/${assignment!.id}/assessments`);
  expect(assessmentsResponse.status).toBe(200);
  let assessment = assessmentsResponse.body.data.find((item) => item.topic_id === topic!.id && item.title === 'E2E Assessment - Score Update');
  if (!assessment) {
    const created = await apiJson<{ id: string }>(page, '/api/teacher/learning/assessments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignmentId: assignment!.id, topicId: topic!.id, title: 'E2E Assessment - Score Update', assessmentDate: '2026-09-27', minimumScore: 75, maxScore: 100 }),
    });
    expect(created.status).toBe(200);
    assessment = { id: created.body.data.id, topic_id: topic!.id, title: 'E2E Assessment - Score Update' };
  }
  const studentsResponse = await apiJson<{ students: { student_id: string }[] }>(page, `/api/teacher/learning/assignments/${assignment!.id}/students`);
  expect(studentsResponse.status).toBe(200);
  const saved = await apiJson(page, `/api/teacher/learning/assessments/${assessment.id}/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scores: [{ studentId: studentsResponse.body.data.students[0].student_id, score }] }),
  });
  expect(saved.status).toBe(200);
  return { topicId: topic!.id, assessmentId: assessment.id };
}

test.describe('Phase 1 portal', () => {
  test('keeps the cached session during SPA portal navigation', async ({ page }) => {
    const meRequests: string[] = [];
    page.on('request', (request) => { if (request.url().endsWith('/api/me')) meRequests.push(request.url()); });
    await demoLogin(page, 'DEMO-SISWA');
    await expect(page.getByText('Selamat datang, Siswa Demo')).toBeVisible();
    const initialCount = meRequests.length;
    await page.getByRole('navigation', { name: 'Navigasi portal' }).getByRole('link', { name: 'Rekomendasi Belajar' }).click();
    await expect(page).toHaveURL(/\/dashboard\/learning$/);
    await expect(page.getByRole('heading', { name: 'Rekomendasi Belajar' })).toBeVisible();
    await page.getByRole('navigation', { name: 'Navigasi portal' }).getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await page.getByRole('navigation', { name: 'Navigasi portal' }).getByRole('link', { name: 'Rekomendasi Belajar' }).click();
    await expect(page).toHaveURL(/\/dashboard\/learning$/);
    expect(meRequests.length).toBe(initialCount);
    await expect(page.getByText('Memulihkan sesi...')).toHaveCount(0);
    await expect(page.getByText('Memeriksa izin...')).toHaveCount(0);
  });

  test('renders login without horizontal overflow at mobile widths and uses Inter', async ({ page }) => {
    for (const width of [320, 360, 375, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('/login');
      const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
      expect(dimensions.scrollWidth, `overflow at ${width}px`).toBe(dimensions.clientWidth);
      const font = await page.locator('body').evaluate((element) => getComputedStyle(element).fontFamily);
      expect(font).toContain('Inter');
    }
  });

  test('denies student access to teacher grade page', async ({ page }) => {
    await demoLogin(page, 'DEMO-SISWA');
    await page.goto('/dashboard/grades');
    await expect(page.getByText('Anda tidak memiliki izin untuk halaman ini.')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Input Nilai & Kompetensi' })).toHaveCount(0);
    const unauthorized = await page.evaluate(async () => {
      const response = await fetch('/api/teacher/learning/assignments');
      return { status: response.status, body: await response.json() };
    });
    expect(unauthorized.status).toBe(403);
  });

  test('persists teacher score and reflects the updated aggregate for the student', async ({ page }) => {
    await demoLogin(page, 'DEMO-GURU');
    await expect(page.getByText('Selamat datang, Guru Demo')).toBeVisible();
    const fixture = await ensureE2eAssessment(page, 68);
    await page.getByRole('button', { name: 'Keluar' }).click();
    await page.getByRole('button', { name: 'Siswa Demo' }).click();
    await expect(page.getByText('Selamat datang, Siswa Demo')).toBeVisible();
    const firstLearning = await apiJson<{ subjects: { topics: { topicId: string; averageScore: number | null }[] }[] }>(page, '/api/student/learning');
    const firstTopic = firstLearning.body.data.subjects.flatMap((subject) => subject.topics).find((topic) => topic.topicId === fixture.topicId);
    expect(firstTopic).toBeTruthy();
    await page.getByRole('button', { name: 'Keluar' }).click();
    await page.getByRole('button', { name: 'Guru Demo' }).click();
    await expect(page.getByText('Selamat datang, Guru Demo')).toBeVisible();
    await ensureE2eAssessment(page, 85);
    await page.getByRole('button', { name: 'Keluar' }).click();
    await page.getByRole('button', { name: 'Siswa Demo' }).click();
    await expect(page.getByText('Selamat datang, Siswa Demo')).toBeVisible();
    const secondLearning = await apiJson<{ subjects: { topics: { topicId: string; averageScore: number | null }[] }[] }>(page, '/api/student/learning');
    const secondTopic = secondLearning.body.data.subjects.flatMap((subject) => subject.topics).find((topic) => topic.topicId === firstTopic!.topicId);
    expect(secondTopic.averageScore).not.toBe(firstTopic.averageScore);
  });

  test('generates AI practice for the controlled needs-attention topic', async ({ page }) => {
    await demoLogin(page, 'DEMO-GURU');
    await expect(page.getByText('Selamat datang, Guru Demo')).toBeVisible();
    const fixture = await ensureE2eAssessment(page, 60);
    await page.getByRole('button', { name: 'Keluar' }).click();
    await page.getByRole('button', { name: 'Siswa Demo' }).click();
    await expect(page.getByText('Selamat datang, Siswa Demo')).toBeVisible();
    await page.getByRole('navigation', { name: 'Navigasi portal' }).getByRole('link', { name: 'Rekomendasi Belajar' }).click();
    const topicRow = page.locator('strong').filter({ hasText: 'E2E Practice Linear' }).locator('..').locator('..');
    await expect(topicRow.getByRole('button', { name: 'Latihan dengan AI' })).toBeVisible();
    const practiceResponse = page.waitForResponse((response) => response.url().endsWith(`/api/student/learning/topics/${fixture.topicId}/practice`) && response.request().method() === 'POST');
    await topicRow.getByRole('button', { name: 'Latihan dengan AI' }).click();
    const response = await practiceResponse;
    const body = await response.json();
    expect(response.status(), JSON.stringify(body)).toBe(200);
    expect(body.data.generated).toBe(true);
    expect(body.data.questions.length).toBeGreaterThanOrEqual(1);
    expect(body.data.questions.length).toBeLessThanOrEqual(3);
    await expect(page.getByText('AI-generated practice')).toBeVisible();
    await expect(page.getByText('Latihan ini adalah bantuan belajar AI, bukan penilaian guru dan tidak mengubah nilai Anda.')).toBeVisible();
    await page.screenshot({ path: 'artifacts/final-ai-practice-1440.png', fullPage: true });
  });
});
