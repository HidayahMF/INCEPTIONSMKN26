import { expect, test } from '@playwright/test';

test('floating chatbot uses extracted states responsively and opens the existing chat', async ({ page }) => {
  for (const viewport of [{ width: 1440, name: '1440' }, { width: 390, name: '390' }]) {
    await page.setViewportSize({ width: viewport.width, height: 844 });
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Buka Tanya AI' });
    await expect(button).toBeVisible();
    const bounds = await button.boundingBox();
    const style = await button.evaluate((element) => {
      const computed = getComputedStyle(element);
      const image = element.querySelector('img');
      return { position: computed.position, width: computed.width, height: computed.height, image: image?.getAttribute('src') || '' };
    });
    expect(style.position).toBe('fixed');
    expect(Number.parseFloat(style.width)).toBe(viewport.width === 1440 ? 120 : 72);
    expect(Number.parseFloat(style.height)).toBe(viewport.width === 1440 ? 120 : 72);
    expect(style.image).toContain('/assets/figma/ai-cta/ai-cta-raw-02.png');
    expect(bounds?.x).toBeGreaterThan(0);
    const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 16);
    await button.hover();
    await expect(button.locator('img')).toHaveAttribute('src', /ai-cta-raw-02\.png/);
    await button.click();
    await expect(page.getByRole('dialog', { name: 'Tanya AI SMKN 26 Jakarta' })).toBeVisible();
    await page.screenshot({ path: `artifacts/floating-chatbot-${viewport.name}.png`, fullPage: true });
  }
});
