import { expect, test } from "@playwright/test";

test.describe("homepage Figma interaction contracts", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
  });

  test("navbar, hero buttons, search, and quick access states", async ({ page }) => {
    const navItem = page.getByRole("navigation", { name: "Navigasi utama" }).getByRole("link", { name: "Program", exact: true });
    await navItem.hover();
    await expect(navItem).toHaveCSS("color", "rgb(0, 146, 255)");
    await expect(page.getByRole("link", { name: "Login", exact: true })).toBeVisible();

    const explore = page.getByRole("link", { name: "Jelajahi SMKN 26" });
    const video = page.getByRole("link", { name: "Tonton Video Profile" });
    await explore.hover();
    await expect(explore).toHaveCSS("color", "rgb(0, 146, 255)");
    await expect(video).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await video.hover();
    await expect(video).toHaveCSS("color", "rgb(255, 255, 255)");

    const search = page.getByRole("search");
    await expect(search).toHaveCSS("width", "840px");
    await expect(search).toHaveCSS("height", "44px");
    await search.hover();
    await expect(search).toHaveCSS("width", "840px");
    await expect(search).toHaveCSS("height", "44px");
    await expect(search).toHaveCSS("background-color", "rgb(255, 255, 255)");

    const cards = [
      page.getByRole("link", { name: "SPMB" }),
      page.getByRole("link", { name: "Perpustakaan" }),
      page.getByRole("link", { name: "KJP & PIP" }),
      page.getByRole("button", { name: "Tanya AI", exact: true }),
    ];
    const defaultBox = await cards[0].boundingBox();
    await cards[2].hover();
    await expect(cards[2]).toHaveCSS("opacity", "1");
    await expect(cards[0]).toHaveCSS("opacity", "0.5");
    const activeBox = await cards[2].boundingBox();
    expect(activeBox && defaultBox).toBeTruthy();
    expect(activeBox!.y).toBeCloseTo(defaultBox!.y - 4, 0);
    await page.mouse.move(700, 500);
    await expect(cards[0]).toHaveCSS("opacity", "1");
  });

  test("overview, advantages, video, program, BLUD, achievement, news, AI, footer, and chatbot", async ({ page }) => {
    const overview = page.getByRole("link", { name: /Kenal Lebih Dekat/ });
    await overview.hover();
    await expect(overview).toHaveCSS("background-image", /linear-gradient/);

    const advantage = page.locator("article").filter({ hasText: "Pendidikan Berkualitas" });
    await advantage.hover();
    await page.waitForTimeout(500);
    await expect(advantage).toHaveCSS("box-shadow", /rgba\(15, 23, 42/);
    await page.locator(".video-play").hover();
    await expect(page.locator(".video-play")).toHaveCSS("filter", /drop-shadow/);

    const programCard = page.locator(".program-card").first();
    await programCard.hover();
    await page.waitForTimeout(500);
    await expect(programCard).toHaveCSS("box-shadow", /rgba\(15, 23, 42/);
    const blud = page.locator(".blud-card").first();
    await blud.hover();
    await page.waitForTimeout(500);
    await expect(blud).toHaveCSS("border-width", "4px");
    await expect.poll(async () => Number.parseFloat(await page.locator(".achievement-stats").evaluate((el) => getComputedStyle(el).width))).toBeCloseTo(1194, 0);
    await page.locator(".achievement-stats").hover();
    await page.waitForTimeout(500);
    await expect(page.locator(".achievement-stats")).toHaveCSS("box-shadow", /rgba\(15, 23, 42/);

    const achievement = page.locator(".achievement-card").first();
    await achievement.hover();
    await expect(achievement).toHaveCSS("width", "261px");
    const news = page.locator(".news-card").first();
    const newsBox = await news.boundingBox();
    expect(newsBox).toBeTruthy();
    await news.focus();
    await page.waitForTimeout(500);
    await expect(news).toHaveCSS("border-width", "4px");
    await page.getByRole("button", { name: "Mulai Bertanya" }).hover();
    await expect(page.getByRole("button", { name: "Mulai Bertanya" })).toHaveCSS("background-color", /rgba|rgb/);

    const footerInput = page.getByRole("textbox", { name: "Email" });
    await footerInput.hover();
    await expect(footerInput).toHaveCSS("border-color", "rgb(0, 108, 220)");
    await page.getByRole("button", { name: "Buka Tanya AI" }).hover();
    await expect(page.getByRole("button", { name: "Buka Tanya AI" }).locator("img")).toHaveAttribute("src", /chatbot-hover/);
  });
});
