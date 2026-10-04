import { expect, test } from "@playwright/test";

// Order verified against docs/figma-reference/achievements.png by reading the
// text baked into each exported poster artwork:
// 1 Basket, 2 Futsal, 3 Paskibrada, 4 Pramuka, 5 Voli.
const expectedCardAssets = [
  "/assets/figma/achievements/achievements-raw-08.png",
  "/assets/figma/achievements/achievements-raw-03.png",
  "/assets/figma/achievements/achievements-raw-01.png",
  "/assets/figma/achievements/achievements-raw-04.png",
  "/assets/figma/achievements/achievements-raw-07.png",
];

test("Prestasi default and hover states match the prototype", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const section = page.locator(".achievements-section");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  await expect(section.locator(".section-badge")).toHaveText("Prestasi SMK Negeri 26 Jakarta");
  await expect(section.getByRole("heading", { name: /Karya dan/ })).toBeVisible();

  const cards = section.locator(".achievement-card");
  await expect(cards).toHaveCount(5);
  const sources = await cards.locator("> img").evaluateAll((items) => items.map((item) => item.getAttribute("src")));
  expect(sources).toEqual(expectedCardAssets);

  const defaultBox = await cards.first().boundingBox();
  expect(defaultBox!.width).toBeCloseTo(237, 0);
  expect(defaultBox!.height).toBeCloseTo(296, 0);
  await expect(cards.first().locator(".achievement-card-content")).toHaveCSS("opacity", "0");

  await section.screenshot({ path: "artifacts/prestasi-default.png" });

  await cards.first().hover();
  await page.waitForTimeout(400);
  const hoverBox = await cards.first().boundingBox();
  expect(hoverBox!.width).toBeCloseTo(237, 0);
  expect(hoverBox!.height).toBeCloseTo(296, 0);
  await expect(cards.first().locator(".achievement-card-content")).toHaveCSS("opacity", "1");

  const cta = cards.first().locator(".achievement-card-content a");
  await expect(cta).toBeVisible();
  await expect(cta.locator("img")).toHaveCount(1);
  await expect(cta.locator("img")).toHaveAttribute("src", "/assets/figma/icons/secondary-arrow-right.svg");
  await cta.hover();
  await expect(cta).toHaveCSS("background-color", "rgb(0, 146, 255)");
  await expect(cta).toHaveCSS("color", "rgb(255, 255, 255)");

  await section.screenshot({ path: "artifacts/prestasi-hover.png" });

  const longCard = cards.nth(2);
  await longCard.hover();
  await page.waitForTimeout(400);
  const longCardBox = await longCard.boundingBox();
  const longCta = await longCard.locator(".achievement-card-content a").boundingBox();
  expect(longCardBox && longCta).toBeTruthy();
  expect(longCardBox!.y + longCardBox!.height - (longCta!.y + longCta!.height)).toBeCloseTo(16, 0);
  await page.mouse.move(10, 10);

  const stats = section.locator(".achievement-stats");
  const statsBox = await stats.boundingBox();
  expect(statsBox!.width).toBeCloseTo(1194, 0);
  expect(statsBox!.height).toBeCloseTo(122, 0);
  await expect(stats).toHaveCSS("box-shadow", "rgba(15, 23, 42, 0.06) 0px 4px 16px 0px");
  await stats.hover();
  await page.waitForTimeout(400);
  await expect(stats).toHaveCSS("box-shadow", /rgba\(15, 23, 42, 0.08\)/);

  const previous = section.getByRole("button", { name: "Prestasi sebelumnya" });
  const next = section.getByRole("button", { name: "Prestasi berikutnya" });
  for (const button of [previous, next]) {
    await expect(button).toHaveCSS("width", "48px");
    await expect(button).toHaveCSS("height", "48px");
  }
  await expect(previous.locator("img")).toHaveAttribute("src", "/assets/figma/advantages/advantage-carousel-left.svg");
  await expect(next.locator("img")).toHaveAttribute("src", "/assets/figma/advantages/advantage-carousel-right.svg");
  await next.hover();
  await expect(next).toHaveCSS("background-color", "rgb(0, 108, 220)");
  await expect(next.locator("img")).toHaveCSS("filter", "brightness(0) invert(1)");

  const desktopOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(desktopOverflow.scrollWidth).toBe(desktopOverflow.clientWidth);
});

test("Prestasi carousel can be dragged on narrow viewports", async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const track = page.locator(".achievement-track");
  await track.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const scrollable = await track.evaluate((element) => element.scrollWidth > element.clientWidth);
  expect(scrollable).toBe(true);

  const box = await track.boundingBox();
  expect(box).toBeTruthy();
  const startY = box!.y + box!.height / 2;

  await page.mouse.move(box!.x + box!.width - 40, startY);
  await page.mouse.down();
  await page.mouse.move(box!.x + 40, startY, { steps: 12 });
  await page.mouse.up();

  const scrollLeft = await track.evaluate((element) => element.scrollLeft);
  expect(scrollLeft).toBeGreaterThan(0);

  const tabletOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(tabletOverflow.scrollWidth).toBe(tabletOverflow.clientWidth);

  await track.evaluate((element) => {
    element.scrollLeft = 0;
  });
  await page.waitForTimeout(400);
  expect(await track.evaluate((element) => element.scrollLeft)).toBe(0);

  await page.getByRole("button", { name: "Prestasi berikutnya" }).click();
  await page.waitForTimeout(800);
  expect(await track.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
});