import { expect, test } from "@playwright/test";

test("capture requested homepage sections", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: ".capture-static .program-panel-track { transition: none !important; transform: translateX(0) !important; }" });
  await page.evaluate(() => document.documentElement.classList.add("capture-static"));

  const programs = page.locator(".programs-section");
  await programs.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await programs.screenshot({ path: "artifacts/program-smkn26-default.png" });

  const programCard = programs.locator(".program-card").first();
  await expect(programs.locator(".program-card-content > a")).toHaveCount(3);
  await expect(programs.locator(".program-card-content > a img").first()).toHaveAttribute("src", /programs-svg-01\.svg$/);
  await expect(programs.locator(".program-card-content > a img").last()).toHaveAttribute("src", /programs-svg-01\.svg$/);
  const programArrowLink = programCard.locator(".program-card-content > a");
  await programArrowLink.hover();
  await page.waitForTimeout(500);
  await expect(programCard).toHaveCSS("box-shadow", /rgba\(15, 23, 42/);
  await expect(programArrowLink).toHaveCSS("background-color", "rgb(0, 146, 255)");
  await programs.screenshot({ path: "artifacts/program-smkn26-hover.png" });

  await programs.getByRole("link", { name: "Jelajahi Ekstrakurikuler" }).hover();
  await page.waitForTimeout(300);
  await expect(programs.getByRole("link", { name: "Jelajahi Ekstrakurikuler" })).toHaveCSS("background-color", "rgb(241, 245, 249)");
  await programs.screenshot({ path: "artifacts/program-cta-hover.png" });

  const blud = page.locator(".blud-section");
  await blud.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await blud.screenshot({ path: "artifacts/belajar-berkarya-menghasilkan-default.png" });

  const bludCard = blud.locator(".blud-card").first();
  await bludCard.hover();
  await page.waitForTimeout(500);
  await blud.screenshot({ path: "artifacts/belajar-berkarya-menghasilkan-hover.png" });

  for (const card of await blud.locator(".blud-card").all()) {
    await card.hover();
    await expect(card).toHaveCSS("border-width", "4px");
    await expect(card.locator(".blud-hover-shape")).toBeVisible();
  }

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.reload();
    await page.addStyleTag({ content: ".capture-static .program-panel-track { transition: none !important; transform: translateX(0) !important; }" });
    await page.evaluate(() => document.documentElement.classList.add("capture-static"));
    await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    })).then(({ scrollWidth, clientWidth }) => {
      if (scrollWidth !== clientWidth) throw new Error(`Horizontal overflow at ${viewport.width}px: ${scrollWidth} != ${clientWidth}`);
    });
  }
});
