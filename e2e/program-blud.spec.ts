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

    const badge = page.locator(".blud-intro .section-badge");
    const badgeBox = await badge.boundingBox();
    expect(badgeBox).toBeTruthy();
    expect(badgeBox!.width).toBeCloseTo(320.6, 0);
    expect(badgeBox!.height).toBeCloseTo(31, 0);
    const badgeLayout = await badge.evaluate((element) => {
      const text = element.textContent?.replace(/\s+/g, " ").trim() ?? "";
      return {
        text,
        lineCount: Math.round(element.scrollHeight / parseFloat(getComputedStyle(element).lineHeight)),
        fits: element.scrollHeight <= element.clientHeight,
        whiteSpace: getComputedStyle(element).whiteSpace,
      };
    });
    expect(badgeLayout.text).toContain("BELAJAR • BERKARYA • MENGHASILKAN");
    expect(badgeLayout.lineCount).toBe(1);
    expect(badgeLayout.fits).toBe(true);
    expect(badgeLayout.whiteSpace).toBe("nowrap");


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
    const sectionBox = await section.boundingBox();
    const ctaBox = await cta.boundingBox();
    expect(sectionBox).toBeTruthy();
    expect(ctaBox).toBeTruthy();
    expect(ctaBox!.x - sectionBox!.x).toBeCloseTo(1119, 0);
    expect(ctaBox!.y - sectionBox!.y).toBeCloseTo(101.5, 0);

    await page.locator(".blud-section").screenshot({ path: "artifacts/blud-desktop.png" });
  });

  test("captures Program arrow default, hover, and focus states", async ({ page }) => {
    const cards = page.locator(".program-cards .program-card");
    await expect(cards).toHaveCount(3);
    await page.mouse.move(0, 0);
    await page.locator(".program-cards").screenshot({ path: "artifacts/program-right-cards-default.png" });

    const captures = [
      ["program-lsp-hover.png", 0],
      ["program-osis-hover.png", 1],
      ["program-bkk-hover.png", 2],
    ] as const;
    for (const [filename, index] of captures) {
      await page.mouse.move(0, 0);
      await cards.nth(index).hover();
      await page.waitForTimeout(400);
      await cards.nth(index).screenshot({ path: `artifacts/${filename}` });
    }

    await page.mouse.move(0, 0);
    await cards.nth(0).locator(".program-card-content > a").focus();
    await page.waitForTimeout(100);
    await page.locator(".program-cards").screenshot({ path: "artifacts/program-arrow-focus.png" });
  });

  test("captures BLUD default, hover, and focus states", async ({ page }) => {
    const section = page.locator(".blud-section");
    const grid = page.locator(".blud-grid");
    const cards = page.locator(".blud-card");
    await expect(cards).toHaveCount(6);
    await page.mouse.move(0, 0);
    await section.screenshot({ path: "artifacts/blud-default.png" });

    const kgs = cards.nth(0);
    const icon = kgs.locator(".blud-icon");
    const title = kgs.locator("h3");
    const description = kgs.locator("p");
    const readStability = async () => ({
      card: await kgs.boundingBox(),
      icon: await icon.boundingBox(),
      title: await title.boundingBox(),
      description: await description.boundingBox(),
    });
    const before = await readStability();
    await section.screenshot({ path: "artifacts/blud-motion-000.png" });
    const shapeWrap = page.locator(".blud-card-0 .blud-shape-wrap");
    const computedMotion = await page.evaluate(() => {
      const selectors = [".blud-card-0", ".blud-card-0 .blud-shape-wrap", ".blud-card-0 .blud-default-shape", ".blud-card-0 .blud-hover-shape"];
      return Object.fromEntries(selectors.map((selector) => {
        const style = getComputedStyle(document.querySelector(selector)!);
        return [selector, { property: style.transitionProperty, duration: style.transitionDuration, timing: style.transitionTimingFunction }];
      }));
    });
    console.log("BLUD_COMPUTED_MOTION", JSON.stringify(computedMotion));
    for (const selector of [".blud-card-0 .blud-shape-wrap", ".blud-card-0 .blud-default-shape", ".blud-card-0 .blud-hover-shape"]) {
      expect(computedMotion[selector].duration).toContain("0.4s");
      expect(computedMotion[selector].timing).toContain("cubic-bezier(0.4");
    }
    const sample = async (label: string) => {
      const box = await shapeWrap.boundingBox();
      console.log(`BLUD_MOTION_${label}`, JSON.stringify(box));
    };
    await page.mouse.move(0, 0);
    await page.waitForTimeout(30);
    const kgsBox = await kgs.boundingBox();
    await page.mouse.move(kgsBox!.x + kgsBox!.width / 2, kgsBox!.y + kgsBox!.height / 2);
    await sample("0");
    await page.waitForTimeout(100);
    await sample("100");
    await section.screenshot({ path: "artifacts/blud-motion-100.png" });
    await page.waitForTimeout(100);
    await sample("200");
    await section.screenshot({ path: "artifacts/blud-motion-200.png" });
    await page.waitForTimeout(100);
    await sample("300");
    await section.screenshot({ path: "artifacts/blud-motion-300.png" });
    await page.waitForTimeout(100);
    await sample("400");
    await section.screenshot({ path: "artifacts/blud-motion-400.png" });
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);
    await sample("leave-100");
    await section.screenshot({ path: "artifacts/blud-leave-100.png" });
    await page.waitForTimeout(100);
    await sample("leave-200");
    await section.screenshot({ path: "artifacts/blud-leave-200.png" });
    await page.waitForTimeout(100);
    await sample("leave-300");
    await section.screenshot({ path: "artifacts/blud-leave-300.png" });
    await page.waitForTimeout(100);
    await sample("leave-400");
    await section.screenshot({ path: "artifacts/blud-leave-400.png" });
    await page.waitForTimeout(50);
    await section.screenshot({ path: "artifacts/blud-leave-settled.png" });
    const after = await readStability();
    for (const key of ["card", "icon", "title", "description"] as const) {
      expect(after[key]!.x).toBeCloseTo(before[key]!.x, 0);
      expect(after[key]!.y).toBeCloseTo(before[key]!.y, 0);
      expect(after[key]!.width).toBeCloseTo(before[key]!.width, 0);
      expect(after[key]!.height).toBeCloseTo(before[key]!.height, 0);
    }

    const captures = [
      ["blud-hover-kgs.png", 0],
      ["blud-hover-uptechno.png", 1],
      ["blud-hover-eman.png", 2],
      ["blud-hover-manufaktur26.png", 3],
      ["blud-hover-garage26.png", 4],
      ["blud-hover-gadiz.png", 5],
    ] as const;
    for (const [filename, index] of captures) {
      await page.mouse.move(0, 0);
      await cards.nth(index).hover();
      await page.waitForTimeout(400);
      await grid.screenshot({ path: `artifacts/${filename}` });
    }

    await page.mouse.move(0, 0);
    await cards.nth(0).focus();
    await page.waitForTimeout(100);
    await section.screenshot({ path: "artifacts/blud-focus.png" });
  });
});
