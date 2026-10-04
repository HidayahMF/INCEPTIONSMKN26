import { test, expect } from "@playwright/test";

test("wide viewport centering", async ({ page }) => {
  await page.setViewportSize({ width: 2880, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const result = await page.evaluate(() => {
    const gaps = (sel: string) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = (el as HTMLElement).getBoundingClientRect();
      const left = Math.round(r.x);
      const right = Math.round(window.innerWidth - r.right);
      return { left, right, centered: Math.abs(left - right) <= 2 };
    };
    return {
      bludGrid: gaps(".blud-grid"),
      aiCta: gaps(".ai-cta"),
      newsViewport: gaps(".news-viewport"),
      programs: gaps(".programs-section"),
      achievements: gaps(".achievements-section"),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  console.log("CENTER " + JSON.stringify(result));
  expect(result.overflow).toBe(0);
  for (const section of [result.bludGrid, result.aiCta, result.newsViewport, result.programs, result.achievements]) {
    expect(section).toBeTruthy();
    expect(section!.centered).toBe(true);
  }
});
