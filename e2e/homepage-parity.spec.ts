import { expect, test } from "@playwright/test";

test.describe("public homepage parity smoke", () => {
  test("renders the documented desktop section order without overflow", async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 1440, height: 1000 });
    const failedAssets: string[] = [];
    page.on("response", (response) => {
      if (response.request().resourceType() === "image" && response.status() >= 400) failedAssets.push(response.url());
    });
    await page.goto("/");
    await expect(page.locator(".video-profile")).toBeVisible();
    await expect(page.locator(".figma-footer")).toBeVisible();
    const sections = await page.locator("main > section").evaluateAll((items) => items.map((item) => item.className));
    expect(sections).toEqual([
      expect.stringContaining("relative h-[760px]"),
      expect.stringContaining("relative z-30"),
      expect.stringContaining("mt-[60px]"),
      expect.stringContaining("relative mt-[88px]"),
       expect.stringContaining("h-[218px]"),
      expect.stringContaining("school-majors"),
      expect.stringContaining("video-profile"),
      expect.stringContaining("programs-section"),
      expect.stringContaining("blud-section"),
      expect.stringContaining("achievements-section"),
      expect.stringContaining("news-section"),
      expect.stringContaining("ai-cta"),
    ]);
    const metrics = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, height: document.body.scrollHeight }));
    expect(metrics.scrollWidth).toBe(metrics.clientWidth);
    expect(metrics.height).toBeGreaterThan(8000);
    expect(failedAssets).toEqual([]);
    await page.screenshot({ path: "artifacts/homepage-1440-full.png", fullPage: true });
  });

  test("CTA opens the existing public chat and mobile stays usable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: /Tanya AI/ }).last().click();
    await expect(page.getByRole("dialog", { name: /Tanya AI SMKN 26 Jakarta/ })).toBeVisible();
    const metrics = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(metrics.scrollWidth).toBe(metrics.clientWidth);
  });
});
