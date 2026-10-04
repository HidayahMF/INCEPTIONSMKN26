import { test } from "@playwright/test";

for (const viewport of [
  { width: 390, height: 844 },
  { width: 375, height: 812 },
  { width: 360, height: 800 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
]) {
  test(`profile hero ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/profile", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({
      path: `artifacts/profile-hero-${viewport.width}.png`,
      fullPage: false,
    });
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    if (dimensions.scrollWidth !== dimensions.clientWidth) throw new Error(JSON.stringify(dimensions));
  });
}
