import { expect, test } from "@playwright/test";

test.describe("Program right-card arrows and BLUD desktop geometry", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
  });

  test("matches Program right-card arrow geometry and avoids text overlap", async ({ page }) => {
    const cards = page.locator(".program-cards .program-card");
    await expect(cards).toHaveCount(3);

    for (let index = 0; index < 3; index += 1) {
      const card = cards.nth(index);
      const arrow = card.locator(".program-card-content > a");
      const icon = arrow.locator("img");
      await expect(arrow).toHaveCSS("width", "45px");
      await expect(arrow).toHaveCSS("height", "45px");
      await expect(arrow).toHaveCSS("border-radius", "999px");
      await expect(arrow).toHaveCSS("border-top-width", "1px");
      await expect(icon).toHaveCSS("width", "24px");
      await expect(icon).toHaveCSS("height", "24px");

      const titleBox = await card.locator("h3").boundingBox();
      const descriptionBox = await card.locator("p").boundingBox();
      const arrowBox = await arrow.boundingBox();
      expect(titleBox).toBeTruthy();
      expect(descriptionBox).toBeTruthy();
      expect(arrowBox).toBeTruthy();
      for (const textBox of [titleBox!, descriptionBox!]) {
        const overlaps = textBox.x < arrowBox!.x + arrowBox!.width
          && textBox.x + textBox.width > arrowBox!.x
          && textBox.y < arrowBox!.y + arrowBox!.height
          && textBox.y + textBox.height > arrowBox!.y;
        expect(overlaps, `card ${index} text overlaps arrow`).toBe(false);
      }
    }

    await page.locator(".program-cards").screenshot({ path: "artifacts/program-right-cards.png" });
  });

  test("matches BLUD desktop geometry and keeps CTA on one line", async ({ page }) => {
    const section = page.locator(".blud-section");
    const intro = page.locator(".blud-intro");
    const grid = page.locator(".blud-grid");
    const cards = page.locator(".blud-card");
    const cta = page.locator(".blud-cta");

    for (const [locator, width, height] of [
      [section, 1272, 629],
      [grid, 1248, 424],
    ] as const) {
      const box = await locator.boundingBox();
      expect(box).toBeTruthy();
      expect(box!.width).toBeCloseTo(width, 0);
      expect(box!.height).toBeCloseTo(height, 0);
    }

    const introBox = await intro.boundingBox();
    expect(introBox).toBeTruthy();
    expect(introBox!.width).toBeCloseTo(1272, 0);

    await expect(cards).toHaveCount(6);
    for (let index = 0; index < 6; index += 1) {
      const box = await cards.nth(index).boundingBox();
      expect(box).toBeTruthy();
      expect(box!.width).toBeCloseTo(400, 0);
      expect(box!.height).toBeCloseTo(200, 0);
    }

    const first = await cards.nth(0).boundingBox();
    const second = await cards.nth(1).boundingBox();
    const nextRow = await cards.nth(3).boundingBox();
    expect(first).toBeTruthy();
    expect(second).toBeTruthy();
    expect(nextRow).toBeTruthy();
    expect(second!.x - (first!.x + first!.width)).toBeCloseTo(24, 0);
    expect(nextRow!.y - (first!.y + first!.height)).toBeCloseTo(24, 0);

    await expect(cta).toHaveText(/Jelajahi BLUD/);
    await expect(cta).toHaveCSS("white-space", "nowrap");
    await expect(cta).toHaveCSS("height", "41px");
    const ctaText = await cta.innerText();
    expect(ctaText.split("\n")).toHaveLength(1);
    await expect(cta.locator("img")).toHaveCSS("width", "20px");
    await expect(cta.locator("img")).toHaveCSS("height", "20px");

    await page.locator(".blud-section").screenshot({ path: "artifacts/blud-desktop.png" });
  });
});
