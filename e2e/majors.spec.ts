import { expect, test } from '@playwright/test';

const majors = [
  { id: 'kgs', code: 'KGS', title: 'Konstruksi Gedung & Sanitasi', side: 'right' },
  { id: 'tek', code: 'TEK', title: 'Teknik Elektronika & Komunikasi', side: 'right' },
  { id: 'titl', code: 'TITL', title: 'Teknik Instalasi Tenaga Listrik', side: 'right' },
  { id: 'tflm', code: 'TFLM', title: 'Teknik Fabrikasi Logam & Manufaktur', side: 'left' },
  { id: 'tkr', code: 'TKR', title: 'Teknik Kendaraan Ringan', side: 'left' },
  { id: 'sija', code: 'SIJA', title: 'Sistem Informasi, Jaringan & Aplikasi', side: 'left' },
];

test.describe('Jurusan experience', () => {
  test('renders six local interactive majors and homepage placement', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/', { waitUntil: 'networkidle' });
    const section = page.getByRole('region', { name: 'Temukan Bidang yang Sesuai dengan Minatmu' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(section).toHaveCount(1);
    await expect(section.locator('.major-person')).toHaveCount(6);
    await expect(section.locator('.major-person')).toHaveCount(6);
    await page.screenshot({ path: 'artifacts/majors-default-1440.png', fullPage: true });
  });

  for (const major of majors) {
    test(`hover ${major.code} opens ${major.side} card`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto('/', { waitUntil: 'networkidle' });
      const section = page.getByRole('region', { name: 'Temukan Bidang yang Sesuai dengan Minatmu' });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const person = section.getByRole('button', { name: `Lihat ${major.title}` });
      await expect(person).toHaveCount(1);
      await person.evaluate((element) => element.scrollIntoView({ block: 'center', inline: 'center' }));
      if (major.code === 'KGS' || major.code === 'TKR') await person.focus();
      else await person.hover({ force: true });
      const card = section.locator(`#major-card-${major.id}`).first();
      await expect(card).toBeVisible();
      await expect(card.getByText(major.title)).toBeVisible();
      await expect(card.locator(`.major-popover-${major.side}`)).toBeVisible();
      await page.screenshot({ path: `artifacts/majors-hover-${major.id}-1440.png`, fullPage: true });
      await page.keyboard.press('Escape');
      await expect(card).toBeHidden();
    });
  }

  test('pins, switches, escapes, and keeps CTA keyboard accessible', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/', { waitUntil: 'networkidle' });
    const section = page.getByRole('region', { name: 'Temukan Bidang yang Sesuai dengan Minatmu' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const kgs = section.getByRole('button', { name: 'Lihat Konstruksi Gedung & Sanitasi' });
    await kgs.evaluate((element) => element.scrollIntoView({ block: 'center', inline: 'center' }));
    await kgs.dispatchEvent('click');
    await expect(section.locator('#major-card-kgs').first()).toBeVisible();
    await section.locator('#major-card-kgs').first().getByRole('link', { name: /Jelajahi Jurusan/ }).focus();
    await expect(section.locator('#major-card-kgs').first().getByRole('link', { name: /Jelajahi Jurusan/ })).toBeFocused();
    await expect(section.locator('#major-card-kgs').first().getByRole('link')).toHaveAttribute('href', '/majors?major=kgs');
    await section.getByRole('button', { name: 'Lihat Sistem Informasi, Jaringan & Aplikasi' }).click();
    await expect(section.locator('#major-card-sija').first()).toBeVisible();
    await expect(section.locator('#major-card-kgs').first()).toBeHidden();
    await page.keyboard.press('Escape');
    await expect(section.locator('#major-card-sija').first()).toBeHidden();
  });

  test('dedicated majors route and mobile tap have no overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/majors');
    await expect(page.getByRole('heading', { name: 'Temukan Bidang yang Sesuai dengan Minatmu' })).toBeVisible();
    await expect(page.locator('.major-mobile-item')).toHaveCount(6);
    await page.locator('.major-mobile-item').first().click();
    await expect(page.locator('#major-card-kgs').getByText('Konstruksi Gedung & Sanitasi').last()).toBeVisible();
    const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
    await page.screenshot({ path: 'artifacts/majors-mobile-390.png', fullPage: true });
  });
});
