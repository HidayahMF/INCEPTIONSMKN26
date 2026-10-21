import { expect, test } from '@playwright/test';

async function login(page: import('@playwright/test').Page, account: 'Guru Demo' | 'Siswa Demo') {
  await page.goto('/login');
  await page.getByRole('button', { name: account }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

for (const viewport of [{ name: '1440', width: 1440, height: 1000 }, { name: '390', width: 390, height: 844 }]) {
  test(`final login ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/login');
    await page.screenshot({ path: `artifacts/final-login-${viewport.name}.png`, fullPage: true });
  });
  test(`final student dashboard ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await login(page, 'Siswa Demo');
    await page.screenshot({ path: `artifacts/final-student-dashboard-${viewport.name}.png`, fullPage: true });
  });
  test(`final student learning ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await login(page, 'Siswa Demo');
     await page.goto('/dashboard/learning');
     await expect(page.getByRole('heading', { name: 'Rekomendasi Pembelajaran' })).toBeVisible();
     await expect(page.getByText('Mata Pelajaran Dinilai').or(page.getByRole('heading', { name: 'Belum Ada Rekomendasi Pembelajaran' }))).toBeVisible();
     await page.screenshot({ path: `artifacts/final-learning-${viewport.name}.png`, fullPage: true });
  });
  test(`final teacher grades ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await login(page, 'Guru Demo');
    await page.goto('/dashboard/grades');
    await expect(page.getByRole('heading', { name: 'Input Nilai & Kompetensi' })).toBeVisible();
    await page.screenshot({ path: `artifacts/final-teacher-grades-${viewport.name}.png`, fullPage: true });
  });
  test(`teacher profile ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await login(page, 'Guru Demo');
    await page.getByRole('button', { name: 'Buka menu akun guru' }).click();
    await page.getByRole('menuitem', { name: 'Lihat Profil' }).click();
    await expect(page).toHaveURL(/\/dashboard\/profile$/);
    await expect(page.getByRole('heading', { name: 'Profil Guru' })).toBeVisible();
    await page.screenshot({ path: `artifacts/final-teacher-profile-${viewport.name}.png`, fullPage: true });
  });
}
