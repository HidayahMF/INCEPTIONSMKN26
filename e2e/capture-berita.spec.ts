import { expect, test } from "@playwright/test";

test("Berita section matches Figma contract", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const section = page.locator(".news-section");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const badge = section.locator(".section-badge");
  await expect(badge).toHaveText("Berita SMK Negeri 26 Jakarta");
  await expect(badge.locator("img")).toHaveAttribute("src", "/assets/figma/programs/programs-svg-04.svg");

  const introTitle = section.locator(".section-intro h2 span");
  await expect(introTitle).toHaveText("SMK Negeri 26 Jakarta");
  await expect(introTitle).toHaveCSS("background-clip", "text");
  await expect(introTitle).toHaveCSS("-webkit-background-clip", "text");
  await expect(introTitle).toHaveCSS("background-image", /linear-gradient/);

  const card = section.locator(".news-card").first();
  await expect(card.locator("div > span img")).toHaveAttribute("src", "/assets/figma/news/news-calendar.svg");
  await expect(card.locator("div > span img")).toHaveCSS("width", "17px");
  await expect(card).toHaveCSS("width", "400px");
  await expect(card).toHaveCSS("height", "300px");

  const overlaps = await section.locator(".news-card").evaluateAll((cards) =>
    cards.map((card) => {
      const h3 = card.querySelector("h3")!.getBoundingClientRect();
      const time = card.querySelector("time")!.getBoundingClientRect();
      const pill = card.querySelector("div > span")!.getBoundingClientRect();
      return {
        titleDate: h3.bottom > time.top,
        pillTitle: pill.bottom > h3.top && pill.top < h3.bottom,
      };
    }),
  );
  for (const entry of overlaps) {
    expect(entry.titleDate).toBe(false);
    expect(entry.pillTitle).toBe(false);
  }

  const track = section.locator(".news-track");
  await expect(track).toHaveCSS("user-select", "none");
  await expect(track).toHaveCSS("cursor", "grab");
  const initialScroll = await track.evaluate((element) => element.scrollLeft);
  expect(initialScroll).toBe(180);

  const trackBox = await track.boundingBox();
  expect(trackBox).toBeTruthy();
  const dragY = trackBox!.y + trackBox!.height / 2;
  await page.waitForTimeout(250);
  await page.mouse.move(trackBox!.x + trackBox!.width - 60, dragY);
  await page.mouse.down();
  await page.mouse.move(trackBox!.x + 60, dragY, { steps: 10 });
  await page.mouse.up();
  const afterDrag = await track.evaluate((element) => element.scrollLeft);
  expect(afterDrag).toBeGreaterThan(initialScroll);

  await page.addStyleTag({ content: ".floating-chatbot { opacity: 0 !important; }" });
  await page.mouse.move(20, 900);
  await page.evaluate(() => {
    document.querySelector(".news-track").scrollLeft = 180;
  });
  await page.waitForTimeout(300);
  await section.screenshot({ path: "artifacts/berita-default.png" });
});
