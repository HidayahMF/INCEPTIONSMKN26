import { test } from "@playwright/test";

test("audit landing sections vs Figma", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);

  const audit = await page.evaluate(() => {
    const pick = (sel: string) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = (el as HTMLElement).getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    };
    const sections = Array.from(document.querySelectorAll("main > section")).map((s) => {
      const el = s as HTMLElement;
      const r = el.getBoundingClientRect();
      return { cls: el.className.split(" ").slice(0, 3).join(" "), w: Math.round(r.width), h: Math.round(r.height) };
    });
    return {
      docH: document.documentElement.scrollHeight,
      sections,
      hero: pick("section.relative.h-\\[760px\\]"),
      quickAccess: pick("section.relative.z-30"),
      overview: pick(".school-overview"),
      overviewStats: pick(".school-overview .absolute.left-0.top-\\[180px\\]"),
      overviewCta: pick(".overview-photo-cta"),
      advantages: pick(".advantages-carousel"),
      partners: pick(".partner-track"),
      majors: pick(".school-majors"),
      majorsStage: pick(".major-stage"),
      video: pick(".video-profile"),
      videoFrame: pick(".video-profile-frame"),
      videoPlayButton: pick(".video-play-button"),
      programs: pick(".programs-section"),
      programGrid: pick(".program-grid"),
      programSlider: pick(".program-slider"),
      programCard: pick(".program-cards .program-card"),
      programCta: pick(".program-feature-copy a.primary-button"),
      blud: pick(".blud-section"),
      bludGrid: pick(".blud-grid"),
      bludCard: pick(".blud-card"),
      bludCta: pick(".blud-cta"),
      achievements: pick(".achievements-section"),
      news: pick(".news-section"),
      newsViewport: pick(".news-viewport"),
      newsCard: pick(".news-card"),
      aiCta: pick(".ai-cta"),
      footer: pick(".figma-footer"),
      chatbot: pick(".floating-chatbot"),
    };
  });
  console.log("AUDIT " + JSON.stringify(audit));
});
