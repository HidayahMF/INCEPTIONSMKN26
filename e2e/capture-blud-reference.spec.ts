import { expect, test } from "@playwright/test";

test("capture BLUD reference states", async ({ page }) => {
  await page.setViewportSize({ width: 1704, height: 780 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const section = page.locator(".blud-section");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await expect(page.locator(".floating-chatbot")).toHaveCSS("opacity", "1");
  await section.screenshot({ path: "artifacts/blud-reference-default.png" });

  const cta = section.getByRole("link", { name: "Jelajahi BLUD" });
  await cta.hover();
  await expect(cta).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await section.screenshot({ path: "artifacts/blud-reference-hover.png" });

  const firstCard = section.locator(".blud-card").first();
  await firstCard.hover();
  const cardBox = await firstCard.boundingBox();
  const shapeBox = await firstCard.locator(".blud-shape-wrap").boundingBox();
  expect(cardBox && shapeBox).toBeTruthy();
  await expect(firstCard.locator(".blud-shape-wrap")).toHaveCSS("opacity", "0");
  await section.screenshot({ path: "artifacts/blud-card-hover.png" });

  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(metrics.scrollWidth).toBe(metrics.clientWidth);
});
