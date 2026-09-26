import { expect, test, type Page } from '@playwright/test';

async function demoLogin(page: Page, identifier: 'DEMO-GURU' | 'DEMO-SISWA') {
  await page.goto('/login');
  await page.getByRole('button', { name: identifier === 'DEMO-GURU' ? 'Guru Demo' : 'Siswa Demo' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
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
    await page.getByRole('navigation', { name: 'Navigasi portal' }).getByRole('link', { name: 'Input Nilai' }).click();
    await expect(page.getByRole('heading', { name: 'Input Nilai & Kompetensi' })).toBeVisible();
    await page.locator('select').nth(1).selectOption({ index: 1 });
    await page.getByLabel('Nilai Siswa Demo').fill('68');
    await page.getByRole('button', { name: 'Simpan semua nilai' }).click();
    await expect(page.getByText('Nilai berhasil disimpan. Rekomendasi siswa sudah diperbarui.')).toBeVisible();
    await page.getByRole('button', { name: 'Keluar' }).click();
    await page.getByRole('button', { name: 'Siswa Demo' }).click();
    const firstLearningResponsePromise = page.waitForResponse((response) => response.url().endsWith('/api/student/learning') && response.request().method() === 'GET');
    await page.getByRole('navigation', { name: 'Navigasi portal' }).getByRole('link', { name: 'Rekomendasi Belajar' }).click();
    const firstLearningResponse = await firstLearningResponsePromise;
    const firstLearning = await firstLearningResponse.json();
    const firstTopic = firstLearning.data.subjects[0].topics[0];
    await expect(page.getByText(firstTopic.topicName, { exact: true })).toBeVisible();
    await expect(page.getByText(`Gap ${firstTopic.gap.toFixed(1)} poin · ${firstTopic.assessmentCount} assessment`)).toBeVisible();
    await page.getByRole('button', { name: 'Keluar' }).click();
    await page.getByRole('button', { name: 'Guru Demo' }).click();
    await page.getByRole('navigation', { name: 'Navigasi portal' }).getByRole('link', { name: 'Input Nilai' }).click();
    await page.locator('select').nth(1).selectOption({ index: 1 });
    await page.getByLabel('Nilai Siswa Demo').fill('85');
    await page.getByRole('button', { name: 'Simpan semua nilai' }).click();
    await expect(page.getByText('Nilai berhasil disimpan. Rekomendasi siswa sudah diperbarui.')).toBeVisible();
    await page.getByRole('button', { name: 'Keluar' }).click();
    await page.getByRole('button', { name: 'Siswa Demo' }).click();
    const secondLearningResponsePromise = page.waitForResponse((response) => response.url().endsWith('/api/student/learning') && response.request().method() === 'GET');
    await page.getByRole('navigation', { name: 'Navigasi portal' }).getByRole('link', { name: 'Rekomendasi Belajar' }).click();
    const secondLearningResponse = await secondLearningResponsePromise;
    const secondLearning = await secondLearningResponse.json();
    const secondTopic = secondLearning.data.subjects[0].topics[0];
    expect(secondTopic.averageScore).not.toBe(firstTopic.averageScore);
    await expect(page.getByText(`Gap ${secondTopic.gap.toFixed(1)} poin · ${secondTopic.assessmentCount} assessment`)).toBeVisible();
  });
});
