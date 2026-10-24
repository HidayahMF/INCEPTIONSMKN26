import { expect, test, type Page } from '@playwright/test';
import dotenv from 'dotenv';
import { getAdminClient } from '../backend/src/lib/supabase.js';

dotenv.config({ path: 'backend/.env' });

const prefix = `E2E-BROWSER-PORTFOLIO-${Date.now()}`;
const ids = { portfolios: [] as string[], achievements: [] as string[] };

async function login(page: Page, identifier: string, passwordName: string) {
  const password = process.env[passwordName];
  expect(password, `${passwordName} must be configured in backend/.env`).toBeTruthy();
  await page.goto('/login');
  if (identifier === 'DEMO-SISWA') {
    await page.getByRole('button', { name: 'Siswa Demo' }).click();
  } else {
    await page.getByLabel('NIS / NIP / Username').fill(identifier);
    await page.getByLabel('Password', { exact: true }).fill(password!);
    await page.getByRole('button', { name: /Masuk ke Portal/ }).click();
  }
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 15000 });
  await expect(page.getByRole('link', { name: 'Portofolio & Prestasi' })).toBeVisible();
}

async function fillPortfolio(page: Page, title: string) {
  await page.locator('input[name="title"]').fill(title);
  await page.locator('input[name="category"]').fill('E2E Browser Testing');
  await page.locator('input[name="skills"]').fill('Playwright, Supabase');
  await page.locator('input[name="role"]').fill('Automation Tester');
  await page.locator('textarea[name="description"]').fill('Record dibuat oleh browser E2E Portfolio.');
  await page.locator('input[name="date"]').fill('2026-10-24');
  await page.locator('input[type="file"]').setInputFiles({ name: `${title}.png`, mimeType: 'image/png', buffer: Buffer.from('browser-e2e-file') });
  await page.getByRole('button', { name: /Simpan|Tambah|Kirim/ }).last().click();
  await expect(page.getByRole('status')).toContainText('tersimpan');
  await page.goto('/dashboard/portfolio');
}

async function fillAchievement(page: Page, title: string) {
  await page.locator('input[name="title"]').fill(title);
  await page.locator('input[name="type"]').fill('E2E Browser Testing');
  await page.locator('input[name="competition"]').fill('Portfolio Browser E2E');
  await page.locator('input[name="organizer"]').fill('SMKN 26 E2E');
  await page.locator('input[name="level"]').fill('Sekolah');
  await page.locator('input[name="rank"]').fill('Test');
  await page.locator('textarea[name="description"]').fill('Prestasi dibuat oleh browser E2E Portfolio.');
  await page.locator('input[name="date"]').fill('2026-10-24');
  await page.locator('input[type="file"]').setInputFiles({ name: `${title}.webp`, mimeType: 'image/webp', buffer: Buffer.from('browser-e2e-file') });
  await page.getByRole('button', { name: /Simpan|Tambah|Kirim/ }).last().click();
  await expect(page.getByRole('status')).toContainText('tersimpan');
  await page.goto('/dashboard/portfolio');
}

async function api<T>(page: Page, path: string, options: RequestInit = {}) {
  const request = { method: options.method || 'GET', headers: options.headers || {}, body: typeof options.body === 'string' ? options.body : undefined };
  return page.evaluate(async ({ path, request }) => { const response = await fetch(path, request); return { status: response.status, body: await response.json() as { data: T; error: { message: string } | null } }; }, { path, request });
}

test.describe('Portfolio & Prestasi browser integration', () => {
  test.describe.configure({ mode: 'serial' });

  test.afterAll(async () => {
    const admin = getAdminClient();
    for (const id of ids.portfolios) { const { data } = await admin.from('portfolio_files').select('bucket,storage_key').eq('portfolio_id', id); for (const file of data || []) await admin.storage.from(file.bucket).remove([file.storage_key]); await admin.from('student_portfolios').delete().eq('id', id); }
    for (const id of ids.achievements) { const { data } = await admin.from('portfolio_files').select('bucket,storage_key').eq('achievement_id', id); for (const file of data || []) await admin.storage.from(file.bucket).remove([file.storage_key]); await admin.from('achievement_submissions').delete().eq('id', id); }
  });

  test('student creates Portfolio and Prestasi, refresh persists, and responsive layouts stay usable', async ({ page }) => {
    await login(page, 'DEMO-SISWA', 'DEMO_PASSWORD_DEMO_SISWA');
    for (const viewport of [{ width: 375, height: 812 }, { width: 768, height: 900 }, { width: 1440, height: 1000 }]) {
      await page.setViewportSize(viewport); await page.goto('/dashboard/portfolio'); await expect(page.getByRole('heading', { name: 'Portofolio & Prestasi' })).toBeVisible(); expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
    }
    await page.goto('/dashboard/portfolio/new'); await fillPortfolio(page, `${prefix}-PORTFOLIO`);
    const portfolioList = await api<{ id: string; title: string }[]>(page, '/api/student/portfolio'); const portfolio = portfolioList.body.data.find((item) => item.title === `${prefix}-PORTFOLIO`); expect(portfolio).toBeTruthy(); ids.portfolios.push(portfolio!.id);
    await page.reload(); await expect(page.getByText(`${prefix}-PORTFOLIO`)).toBeVisible();
    await page.goto('/dashboard/portfolio/achievements/new'); await fillAchievement(page, `${prefix}-ACHIEVEMENT`);
    const achievementList = await api<{ id: string; title: string }[]>(page, '/api/student/achievements'); const achievement = achievementList.body.data.find((item) => item.title === `${prefix}-ACHIEVEMENT`); expect(achievement).toBeTruthy(); ids.achievements.push(achievement!.id); await page.reload(); await page.getByRole('tab', { name: 'Prestasi & Sertifikat' }).click(); await expect(page.getByText(`${prefix}-ACHIEVEMENT`)).toBeVisible();
  });

  test('student submits, reviewer rejects, student edits/resubmits, reviewer approves, and signed preview works', async ({ page }) => {
    await login(page, 'DEMO-SISWA', 'DEMO_PASSWORD_DEMO_SISWA');
    const student = await api<{ id: string; status: string; title: string }[]>(page, '/api/student/portfolio'); expect(student.status, JSON.stringify(student.body)).toBe(200); const portfolio = student.body.data.find((item) => item.title === `${prefix}-PORTFOLIO`); expect(portfolio, JSON.stringify(student.body)).toBeTruthy(); if (portfolio && !ids.portfolios.includes(portfolio.id)) ids.portfolios.push(portfolio.id);
    await api(page, `/api/student/portfolio/${portfolio!.id}/submit`, { method: 'POST' }); await login(page, 'DEMO-KAJUR', 'DEMO_PASSWORD_DEMO_KAJUR'); await page.goto('/dashboard/teacher/portfolio-review'); await expect(page.getByText(`${prefix}-PORTFOLIO`)).toBeVisible(); await page.getByRole('button', { name: 'Tolak' }).click(); await page.getByRole('dialog').getByRole('textbox').fill(`${prefix} browser revision note`); await page.getByRole('dialog').getByRole('button', { name: 'Kirim Penolakan' }).click(); await expect(page.getByRole('status')).toContainText('dikembalikan');
    await login(page, 'DEMO-SISWA', 'DEMO_PASSWORD_DEMO_SISWA'); await page.goto(`/dashboard/portfolio/projects/${portfolio!.id}/edit`); await expect(page.getByRole('heading', { name: 'Edit Portofolio' })).toBeVisible(); await page.locator('input[name="title"]').fill(`${prefix}-PORTFOLIO-RESUBMIT`); await page.getByRole('button', { name: 'Simpan Perubahan' }).click(); await page.goto('/dashboard/portfolio'); await page.getByText(`${prefix}-PORTFOLIO-RESUBMIT`).getByRole('button', { name: 'Kirim' }).click();
    await login(page, 'DEMO-KAJUR', 'DEMO_PASSWORD_DEMO_KAJUR'); await page.goto('/dashboard/teacher/portfolio-review'); await page.getByRole('button', { name: 'Verifikasi' }).click(); await expect(page.getByRole('status')).toContainText('diverifikasi');
    await login(page, 'DEMO-SISWA', 'DEMO_PASSWORD_DEMO_SISWA'); const refreshed = await api<{ id: string; status: string; files: { id: string }[] }[]>(page, '/api/student/portfolio'); const verified = refreshed.body.data.find((item) => item.id === portfolio!.id); expect(verified?.status).toBe('VERIFIED'); const fileId = verified?.files[0]?.id; expect(fileId).toBeTruthy(); await page.goto(`/dashboard/portfolio/projects/${portfolio!.id}/edit`); await expect(page.getByAltText('Dokumentasi tersimpan')).toBeVisible(); const signed = await api<{ url: string; expiresIn: number }>(page, `/api/files/portfolio/${fileId}`); expect(signed.status).toBe(200); expect(signed.body.data.expiresIn).toBe(300);
  });

  test('unauthorized signed URL access is denied', async ({ browser }) => { const context = await browser.newContext(); const page = await context.newPage(); const result = await page.request.get('/api/files/portfolio/not-authorized'); expect(result.status()).toBe(401); await context.close(); });
});
