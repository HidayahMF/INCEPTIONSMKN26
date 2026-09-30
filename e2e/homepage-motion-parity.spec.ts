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
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(track.locator('img').first()).toHaveAttribute('src', /programs-raw-04\.png$/);
    const initial = await track.evaluate((element) => ({
      shifted: element.classList.contains("is-shifted"),
      transform: getComputedStyle(element).transform,
    }));
    expect(initial.shifted).toBeFalsy();
    expect(initial.transform).toMatch(/matrix\(1, 0, 0, 1, 0, 0\)/);
    await page.waitForTimeout(850);
    await expect(track).toHaveClass(/is-shifted/);
    await page.waitForTimeout(1500);
    const transform = await track.evaluate((element) => getComputedStyle(element).transform);
    expect(transform).toMatch(/matrix\(1, 0, 0, 1, -556(?:\.\d+)?/);
  });

  test("partner marquee progresses and video transitions without click", async ({ page }) => {
    const partner = page.locator(".partner-track");
    const transforms = await partner.evaluate((element) => {
      const animation = element.getAnimations()[0];
      if (!animation) throw new Error("Partner marquee animation is missing");
      animation.pause();
      return [0, 2500, 5000, 7500, 9999].map((time) => {
        animation.currentTime = time;
        const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
        return matrix.e;
      });
    });
    expect(transforms[0]).toBeCloseTo(0, 1);
    expect(transforms[1]).toBeCloseTo(-647.56325, 1);
    expect(transforms[2]).toBeCloseTo(-1295.1265, 1);
    expect(transforms[3]).toBeCloseTo(-1942.68975, 1);
    expect(transforms[4]).toBeCloseTo(-2590.253, 0);

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
    const defaults = [
      [8, 64, 323, 461], [160, 39, 339, 485], [349, 7, 361, 517],
      [561, 7, 363, 518], [758, 24, 349, 501], [933, 40, 335, 485],
    ];
    const expected = [
      [0, 0, 561, 518], [138, -12, 572, 512], [312, -44, 612, 570],
      [340, -39, 594, 564], [526, -38, 576, 562], [728, 17, 524, 503],
    ];
    for (const [index, label] of labels.entries()) {
      const button = page.locator(`.major-person-hitbox[aria-label="Lihat ${label}"]`);
      await button.focus();
      const [finalLeft, finalTop, finalWidth, finalHeight] = expected[index];
      const [defaultLeft, defaultTop, defaultWidth, defaultHeight] = defaults[index];
      await expect.poll(async () => page.locator(".major-unit.is-active").evaluate((element, bounds) => {
        const style = getComputedStyle(element);
        const values = [Number.parseFloat(style.left), Number.parseFloat(style.top), Number.parseFloat(style.width), Number.parseFloat(style.height)];
        const initial = bounds.initial;
        const destination = bounds.destination;
        return values.some((value, property) => Math.abs(value - initial[property]) > 0.5 && Math.abs(value - destination[property]) > 0.5);
      }, { initial: [defaultLeft, defaultTop, defaultWidth, defaultHeight], destination: [finalLeft, finalTop, finalWidth, finalHeight] }), { timeout: 1500 }).toBe(true);
      await expect.poll(async () => {
        const box = await page.locator(".major-unit.is-active").boundingBox();
        const stage = await page.locator(".major-stage").boundingBox();
        if (!box || !stage) return null;
        return [box.x - stage.x, box.y - stage.y, box.width, box.height];
      }, { timeout: 1500 }).toEqual([
        expect.closeTo(finalLeft, 0),
        expect.closeTo(finalTop, 0),
        expect.closeTo(finalWidth, 0),
        expect.closeTo(finalHeight, 0),
      ]);
      const box = await page.locator(".major-unit.is-active").boundingBox();
      const stage = await page.locator(".major-stage").boundingBox();
      expect(box && stage).toBeTruthy();
      expect(box!.x - stage!.x).toBeCloseTo(finalLeft, 0);
      expect(box!.y - stage!.y).toBeCloseTo(finalTop, 0);
      expect(box!.width).toBeCloseTo(finalWidth, 0);
      expect(box!.height).toBeCloseTo(finalHeight, 0);
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
    await expect(card.locator("h3")).toHaveCSS("font-size", "20px");
    await expect(card.locator("p")).toHaveCSS("font-size", "12px");
    await expect(card.locator("a img")).toHaveAttribute("src", "/assets/figma/icons/secondary-arrow-right.svg");
    const overlay = await card.evaluate((element) => getComputedStyle(element, "::after").backgroundImage);
    expect(overlay).toContain("rgb(0, 0, 89)");
    const content = await card.locator(".achievement-card-content").boundingBox();
    expect(content && box).toBeTruthy();
    expect(content!.x - box!.x).toBeCloseTo(18, 0);
    expect(content!.y - box!.y).toBeCloseTo(182, 0);
  });
});
