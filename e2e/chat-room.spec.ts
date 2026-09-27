import { expect, test } from '@playwright/test';

test.describe('Public Tanya AI chat room', () => {
  test('floating mascot opens, sends a question, renders sources, and closes with Escape', async ({ page }) => {
    let requestBody = '';
    await page.route('**/api/chat', async (route) => {
      requestBody = route.request().postData() || '';
      await new Promise((resolve) => setTimeout(resolve, 250));
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: { answer: 'SMKN 26 memiliki informasi resmi yang sudah disetujui.', status: 'answered', sources: [{ title: 'Profil SMKN 26 Jakarta', url: '/profile' }] }, error: null }) });
    });
    await page.goto('/');
    await page.getByRole('button', { name: 'Buka Tanya AI' }).click();
    const room = page.getByRole('dialog', { name: 'Tanya AI SMKN 26 Jakarta' });
    await expect(room).toBeVisible();
    await expect(room.getByText('Halo! Saya siap membantu.')).toBeVisible();
    await page.screenshot({ path: 'artifacts/chat-room-empty-1440.png', fullPage: true });

    const composer = room.getByRole('textbox', { name: 'Pertanyaan untuk Tanya AI' });
    await composer.fill('Apa saja jurusan di SMKN 26?');
    const responsePromise = page.waitForResponse((response) => response.url().endsWith('/api/chat') && response.request().method() === 'POST');
    await composer.press('Enter');
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    expect(requestBody).toContain('Apa saja jurusan di SMKN 26?');
    await expect(room.getByText('Apa saja jurusan di SMKN 26?')).toBeVisible();
    await expect(room.getByText('SMKN 26 memiliki informasi resmi yang sudah disetujui.')).toBeVisible();
    await expect(room.getByText('Profil SMKN 26 Jakarta')).toBeVisible();
    await expect(room.getByText('Pertanyaan:')).toHaveCount(0);
    await page.screenshot({ path: 'artifacts/chat-room-conversation-1440.png', fullPage: true });

    await page.keyboard.press('Escape');
    await expect(room).toBeHidden();
  });

  test('shortcut opens the same room on Tour and mobile chat fits without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/tour');
    await expect(page.getByRole('button', { name: 'Buka Tanya AI' })).toBeVisible();
    await page.getByRole('button', { name: 'Buka Tanya AI' }).click();
    const room = page.getByRole('dialog', { name: 'Tanya AI SMKN 26 Jakarta' });
    await expect(room).toBeVisible();
    const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
    await page.screenshot({ path: 'artifacts/chat-room-390.png', fullPage: true });
    await page.getByRole('button', { name: 'Tutup Tanya AI' }).click();
    await expect(room).toBeHidden();

    await page.goto('/');
    await page.getByRole('button', { name: 'Tanya AI', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'Tanya AI SMKN 26 Jakarta' })).toBeVisible();
  });
});
