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
    await expect(navItem).toHaveCSS("font-size", "20px");
    await expect(navItem).toHaveCSS("background-image", /linear-gradient/);
    await expect(page.getByRole("link", { name: "Login", exact: true })).toBeVisible();

    const explore = page.getByRole("link", { name: "Jelajahi SMKN 26" });
    const video = page.getByRole("link", { name: "Tonton Video Profile" });
    await explore.hover();
    await expect(explore).toHaveCSS("background-color", "rgb(241, 245, 249)");
    await expect(explore).toHaveCSS("border-color", "rgb(203, 213, 225)");
    await expect(explore).toHaveCSS("color", "rgb(0, 146, 255)");
    await expect(video).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await video.hover();
    await expect(video).toHaveCSS("background-color", "rgb(0, 146, 255)");
    await expect(video).toHaveCSS("color", "rgb(255, 255, 255)");

    const search = page.getByRole("search");
    await expect(search).toHaveCSS("width", "840px");
    await expect(search).toHaveCSS("height", "44px");
    await search.hover();
    await expect(search).toHaveCSS("border-width", "1px");
    await expect(search).toHaveCSS("border-color", "rgb(0, 108, 220)");
    await expect(search).toHaveCSS("width", "840px");
    await expect(search).toHaveCSS("height", "44px");
    await expect(search).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(search.locator("input")).toHaveCSS("color", "rgb(0, 146, 255)");

    const cards = [
      page.getByRole("link", { name: "SPMB" }),
      page.getByRole("link", { name: "Perpustakaan" }),
      page.getByRole("link", { name: "KJP & PIP" }),
      page.getByRole("button", { name: "Tanya AI", exact: true }),
    ];
    const quickAccess = page.locator("section.relative.z-30").first();
    const quickBox = await quickAccess.boundingBox();
    expect(quickBox).toBeTruthy();
    expect(quickBox!.x).toBeCloseTo(132, 0);
    expect(quickBox!.y).toBeCloseTo(807, 0);
    expect(quickBox!.width).toBeCloseTo(1192, 0);
    expect(quickBox!.height).toBeCloseTo(149, 0);
    const defaultCardBoxes = await Promise.all(cards.map((card) => card.boundingBox()));
    expect(defaultCardBoxes.map((box) => Math.round(box!.x - quickBox!.x))).toEqual([0, 304, 608, 912]);
    expect(defaultCardBoxes.map((box) => Math.round(box!.y - quickBox!.y))).toEqual([1, 0, 0, 0]);
    const chatbotBox = await page.getByRole("button", { name: "Buka Tanya AI" }).boundingBox();
    expect(chatbotBox).toBeTruthy();
    expect(chatbotBox!.x).toBeCloseTo(1292, 0);
    expect(chatbotBox!.y).toBeCloseTo(816, 0);
    expect(chatbotBox!.width).toBeCloseTo(120, 0);
    expect(chatbotBox!.height).toBeCloseTo(120, 0);
    await expect(cards[0]).toHaveCSS("box-shadow", "none");
    await cards[2].hover();
    await expect(cards[2]).toHaveCSS("opacity", "1");
    await expect(cards[0]).toHaveCSS("opacity", "0.5");
    const activeBox = await cards[2].boundingBox();
    expect(activeBox).toBeTruthy();
    expect(activeBox!.y).toBeLessThan(quickBox!.y);
    expect(activeBox!.y).toBeGreaterThan(quickBox!.y - 12);
    await page.mouse.move(700, 500);
    await expect(cards[0]).toHaveCSS("opacity", "1");
  });

  test("overview, advantages, video, program, BLUD, achievement, news, AI, footer, and chatbot", async ({ page }) => {
    const overviewSection = page.locator(".school-overview");
    const overviewBox = await overviewSection.boundingBox();
    expect(overviewBox).toBeTruthy();
    expect(overviewBox!.x).toBeCloseTo(84, 0);
    expect(overviewBox!.y).toBeCloseTo(1009, 0);
    expect(overviewBox!.width).toBeCloseTo(1272, 0);
    expect(overviewBox!.height).toBeCloseTo(400, 0);
    const overviewImage = overviewSection.locator(".absolute.left-0.top-\\[67px\\]");
    const imageBox = await overviewImage.boundingBox();
    expect(imageBox).toBeTruthy();
    expect(imageBox!.x).toBeCloseTo(853, 0);
    expect(imageBox!.y).toBeCloseTo(1111, 0);
    expect(imageBox!.width).toBeCloseTo(420, 0);
    expect(imageBox!.height).toBeCloseTo(233, 0);
    const overview = page.getByRole("link", { name: /Kenal Lebih Dekat/ });
    const overviewCtaBox = await overview.boundingBox();
    expect(overviewCtaBox).toBeTruthy();
    expect(overviewCtaBox!.x).toBeCloseTo(1154, 0);
    expect(overviewCtaBox!.y).toBeCloseTo(1321, 0);
    expect(overviewCtaBox!.width).toBeCloseTo(182, 0);
    expect(overviewCtaBox!.height).toBeCloseTo(41, 0);
    expect(overviewCtaBox!.x + overviewCtaBox!.width).toBeGreaterThan(imageBox!.x + imageBox!.width);
    await expect(overview).toContainText("Kenal Lebih Dekat");
    await expect(overview.locator("img")).toBeVisible();
    await expect(overview).toHaveCSS("overflow", "visible");
    await expect(overview).toHaveCSS("box-shadow", /rgba\(15, 23, 42, 0.08\)/);
    await overview.hover();
    await expect(overview).toHaveCSS("background-color", "rgb(0, 146, 255)");

    const advantage = page.locator("article").filter({ hasText: "Pendidikan Berkualitas" });
    await advantage.hover();
    await page.waitForTimeout(500);
    await expect(advantage).toHaveCSS("box-shadow", /rgba\(15, 23, 42/);
    await page.locator(".video-play").hover();
    await expect(page.locator(".video-play")).toHaveCSS("filter", /drop-shadow/);
    await expect.poll(async () => Number.parseFloat(await page.locator(".video-play-button-o").evaluate((element) => getComputedStyle(element).width))).toBeCloseTo(98.4, 1);
    await expect.poll(async () => Number.parseFloat(await page.locator(".video-play-button-o").evaluate((element) => getComputedStyle(element).height))).toBeCloseTo(98.4, 1);
    await expect(page.locator(".video-play-button-o")).toHaveCSS("background-color", "rgb(0, 108, 220)");

    const programCard = page.locator(".program-card").first();
    await programCard.hover();
    await page.waitForTimeout(500);
    await expect(programCard).toHaveCSS("box-shadow", /rgba\(15, 23, 42/);
    const blud = page.locator(".blud-card").first();
    await blud.hover();
    await page.waitForTimeout(500);
    await expect(blud).toHaveCSS("border-width", "4px");
    await expect.poll(async () => Number.parseFloat(await page.locator(".achievement-stats").evaluate((el) => getComputedStyle(el).width))).toBeCloseTo(1194, 0);
    const statsBox = await page.locator(".school-overview .absolute.left-0.top-\\[180px\\]").last().boundingBox();
    expect(statsBox).toBeTruthy();
    expect(statsBox!.x).toBeCloseTo(85, 0);
    expect(statsBox!.y + await page.evaluate(() => window.scrollY)).toBeCloseTo(1252, 0);
    expect(statsBox!.width).toBeCloseTo(680, 0);
    expect(statsBox!.height).toBeCloseTo(90, 0);
    await expect(page.locator(".school-overview")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(244, 248, 255)");
    const chatbotBox = await page.locator(".floating-chatbot").boundingBox();
    expect(chatbotBox).toBeTruthy();
    expect(chatbotBox!.y + chatbotBox!.height).toBeLessThanOrEqual(overviewBox!.y);
    await overview.hover();
    await overview.screenshot({ path: "artifacts/overview-cta-hover-v2.png" });
    await page.locator(".school-overview .absolute.left-0.top-\\[180px\\]").last().screenshot({ path: "artifacts/overview-stats-v2.png" });
    await page.locator(".achievement-stats").hover();
    await page.waitForTimeout(500);
    await expect(page.locator(".achievement-stats")).toHaveCSS("box-shadow", /rgba\(15, 23, 42/);

    const achievement = page.locator(".achievement-card").first();
    await achievement.hover();
    await expect(achievement).toHaveCSS("width", "261px");
    const achievementCta = achievement.getByRole("link", { name: /Lihat Detail/ });
    await achievementCta.hover();
    await expect(achievementCta).toHaveCSS("background-color", "rgb(0, 146, 255)");
    const news = page.locator(".news-card").first();
    const newsBox = await news.boundingBox();
    expect(newsBox).toBeTruthy();
    await news.focus();
    await page.waitForTimeout(500);
    await expect(news).toHaveCSS("border-width", "4px");
    await page.getByRole("button", { name: "Mulai Bertanya" }).hover();
    await expect(page.getByRole("button", { name: "Mulai Bertanya" })).toHaveCSS("background-color", /rgba|rgb/);

    const programCta = page.getByRole("link", { name: /Jelajahi Esktrakurikuler/ });
    await expect(programCta).toHaveCSS("width", "218px");
    await expect(programCta).toHaveCSS("height", "41px");
    await programCta.hover();
    await expect(programCta).toHaveCSS("background-color", "rgb(241, 245, 249)");
    await expect(programCta.locator("img")).toHaveAttribute("src", "/assets/figma/icons/icon-arrow-right.svg");
    await expect(page.getByRole("link", { name: /Jelajahi BLUD/ }).locator("img")).toHaveAttribute("src", "/assets/figma/icons/icon-arrow-right.svg");
    await expect(page.getByRole("button", { name: "Mulai Bertanya" }).locator("img")).toHaveAttribute("src", "/assets/figma/icons/icon-arrow-right.svg");

    const buttonO = page.locator(".news-controls button").first();
    await buttonO.hover();
    await expect(buttonO).toHaveCSS("background-color", "rgb(0, 108, 220)");

    const footerInput = page.getByRole("textbox", { name: "Email" });
    await expect(footerInput).toHaveCSS("width", "654px");
    await expect(footerInput).toHaveCSS("border-color", "rgb(203, 213, 225)");
    await expect(page.getByRole("button", { name: "Kirim" })).toHaveCSS("width", "112px");
    await expect(page.locator(".footer-top-social a").first()).toHaveCSS("border-color", "rgb(226, 232, 240)");
    await footerInput.hover();
    await expect(footerInput).toHaveCSS("border-color", "rgb(0, 108, 220)");
    await page.getByRole("button", { name: "Buka Tanya AI" }).hover();
     await expect(page.getByRole("button", { name: "Buka Tanya AI" }).locator("img")).toHaveAttribute("src", /ai-cta-raw-02\.png/);

    await page.locator(".ai-cta").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1100);
    await expect(page.locator(".ai-cta.is-bot-settled .ai-cta-bot")).toHaveCSS("top", "68px");
    await expect(page.locator(".ai-cta.is-bot-settled .ai-cta-outline")).toHaveCSS("height", "417px");
  });
});
