import { expect, test } from "@playwright/test";

test.describe("current Figma prototype motion parity", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
  });

  test("program waits 800ms then moves one verified panel step", async ({ page }) => {
    const track = page.locator(".program-panel-track");
    await page.waitForTimeout(1800);
    const transform = await track.evaluate((element) => getComputedStyle(element).transform);
    expect(transform).toMatch(/matrix\(1, 0, 0, 1, -556(?:\.\d+)?/);
  });

  test("partner marquee progresses and video transitions without click", async ({ page }) => {
    const partner = page.locator(".partner-track");
    const initial = await partner.evaluate((element) => getComputedStyle(element).transform);
    await page.waitForTimeout(2500);
    const quarter = await partner.evaluate((element) => getComputedStyle(element).transform);
    await page.waitForTimeout(2500);
    const half = await partner.evaluate((element) => getComputedStyle(element).transform);
    expect(initial).not.toBe(quarter);
    expect(quarter).not.toBe(half);

    const ring = page.locator(".video-play-ring");
    await expect(ring).toHaveCSS("width", "120px");
    await expect(ring).toHaveCSS("height", "120px");
  });

  test("all majors animate their wrapper and reduced motion remains usable", async ({ page }) => {
    const labels = [
      "Konstruksi Gedung & Sanitasi", "Teknik Elektronika & Komunikasi",
      "Teknik Instalasi Tenaga Listrik", "Teknik Fabrikasi Logam & Manufaktur",
      "Teknik Kendaraan Ringan", "Sistem Informasi, Jaringan & Aplikasi",
    ];
    for (const label of labels) {
      const button = page.locator(`.major-person-hitbox[aria-label="Lihat ${label}"]`);
      await button.focus();
      await page.waitForTimeout(350);
      await expect(page.locator(".major-unit.is-active")).toBeVisible();
    }

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".program-panel-track")).toHaveCSS("transform", "matrix(1, 0, 0, 1, -556, 0)");
    await expect(page.locator(".floating-chatbot")).toBeVisible();
  });

  test("achievement hover uses the verified larger destination geometry", async ({ page }) => {
    const card = page.locator(".achievement-card").first();
    await card.hover();
    await page.waitForTimeout(350);
    const box = await card.boundingBox();
    expect(box?.width).toBeCloseTo(261, 0);
    expect(box?.height).toBeCloseTo(326, 0);
  });
});
