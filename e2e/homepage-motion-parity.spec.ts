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
    const motion = await partner.evaluate((element) => {
      const animation = element.getAnimations()[0];
      if (!animation) throw new Error("Partner marquee animation is missing");
      animation.pause();
      const transforms = [0, 1000, 2000, 2500, 5000, 7500, 9999].map((time) => {
        animation.currentTime = time;
        const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
        return matrix.e;
      });
      const set = element.querySelector(".partner-set");
      if (!set) throw new Error("Partner set is missing");
      return { transforms, setWidth: set.getBoundingClientRect().width, duration: getComputedStyle(element).animationDuration, timing: getComputedStyle(element).animationTimingFunction, iteration: getComputedStyle(element).animationIterationCount };
    });
    expect(motion.transforms[0]).toBeCloseTo(0, 1);
    expect(motion.transforms[1]).not.toBe(motion.transforms[0]);
    expect(motion.transforms[2]).not.toBe(motion.transforms[1]);
    expect(motion.transforms[3]).toBeCloseTo(-motion.setWidth * 0.25, 1);
    expect(motion.transforms[4]).toBeCloseTo(-motion.setWidth * 0.5, 1);
    expect(motion.transforms[5]).toBeCloseTo(-motion.setWidth * 0.75, 1);
    expect(motion.transforms[6]).toBeLessThan(-motion.setWidth * 0.99);
    expect(motion.duration).toBe("10s");
    expect(motion.timing).toBe("linear");
    expect(motion.iteration).toBe("infinite");
    await expect(partner.locator(".partner-set")).toHaveCount(2);
    const baseSet = partner.locator(".partner-set").nth(0);
    await expect(baseSet.locator(".partner-slot")).toHaveCount(10);
    await expect(partner.locator(".partner-set").nth(1).locator(".partner-slot")).toHaveCount(10);
    const basePartners = await baseSet.locator(".partner-slot").evaluateAll((items) => items.map((item) => ({ key: item.dataset.partnerKey, src: item.querySelector("img")?.getAttribute("src") })));
    expect(new Set(basePartners.map((partner) => partner.key)).size).toBe(basePartners.length);
    expect(new Set(basePartners.map((partner) => partner.src)).size).toBe(basePartners.length);
    for (let index = 0; index < basePartners.length - 1; index += 1) {
      expect(basePartners[index].src).not.toBe(basePartners[index + 1].src);
    }

    const ring = page.locator(".video-play-ring");
    await expect(ring).toHaveCSS("width", "120px");
    await expect(ring).toHaveCSS("height", "120px");
  });

  test("partner marquee moves with both browser motion preferences", async ({ browser }) => {
    for (const reducedMotion of ["no-preference", "reduce"] as const) {
      const context = await browser.newContext({ reducedMotion, viewport: { width: 1440, height: 1000 } });
      const page = await context.newPage();
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      const values = await page.locator(".partner-track").evaluate(async (element) => {
        const style = getComputedStyle(element);
        const t0 = getComputedStyle(element).transform;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const t1 = getComputedStyle(element).transform;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const t2 = getComputedStyle(element).transform;
        return {
          t0,
          t1,
          t2,
          animationName: style.animationName,
          animationDuration: style.animationDuration,
          animationTimingFunction: style.animationTimingFunction,
          animationIterationCount: style.animationIterationCount,
          animationPlayState: style.animationPlayState,
          reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        };
      });
      expect(values.t0).not.toBe(values.t1);
      expect(values.t1).not.toBe(values.t2);
      expect(values.animationName).toBe("partner-marquee");
      expect(values.animationDuration).toBe("10s");
      expect(values.animationTimingFunction).toBe("linear");
      expect(values.animationIterationCount).toBe("infinite");
      expect(values.animationPlayState).toBe("running");
      expect(values.reduced).toBe(reducedMotion === "reduce");
      await context.close();
    }
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
