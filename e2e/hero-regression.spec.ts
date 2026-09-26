import { expect, test } from '@playwright/test';

for (const viewport of [
  { name: '1440', width: 1440, height: 1000 },
  { name: '1728', width: 1728, height: 1000 },
  { name: '390', width: 390, height: 844 },
]) {
  test(`homepage hero regression ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    const headline = page.locator('h1').first();
    const subtitle = page.locator('h1').first().locator('xpath=following-sibling::p');
    const buttons = page.locator('h1').first().locator('xpath=following-sibling::p/following-sibling::div');
    await expect(headline).toBeVisible();
    await expect(subtitle).toBeVisible();
    await expect(buttons).toBeVisible();
    const metrics = await page.evaluate(() => {
      const heading = document.querySelector('h1');
      const paragraphs = heading?.parentElement?.querySelector('p');
      const actions = heading?.parentElement?.querySelector('p + div');
      const rect = (element: Element | null) => element ? element.getBoundingClientRect().toJSON() : null;
      return { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, heading: rect(heading), subtitle: rect(paragraphs), actions: rect(actions), headingText: heading?.getBoundingClientRect().height };
    });
    expect(metrics.scrollWidth).toBe(metrics.clientWidth);
    expect(metrics.heading).not.toBeNull();
    expect(metrics.subtitle).not.toBeNull();
    expect(metrics.actions).not.toBeNull();
    expect(metrics.actions!.y).toBeGreaterThan(metrics.subtitle!.y + metrics.subtitle!.height - 1);
    if (viewport.width >= 1024) expect(metrics.heading!.height).toBeLessThan(110);
    await page.screenshot({ path: `artifacts/hero-regression-${viewport.name}.png`, fullPage: false });
  });
}
