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
    await expect(page.getByRole("link", { name: "Program", exact: true })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Navigasi utama" }).getByText("Tour", { exact: true })).toHaveCount(0);
    await expect(page.locator(".video-profile")).toBeVisible();
    await expect(page.locator(".figma-footer")).toBeVisible();
    await expect(page.locator('.hero-student-female')).toHaveAttribute('src', /student-male\.png$/);
    await expect(page.locator('img[src$="student-male.png"]')).toHaveCount(2);
    for (const label of ["Ekstrakurikuler", "Lembaga Sertifikasi Profesi", "OSIS & MPK", "Bursa Kerja Khusus"]) await expect(page.getByRole("heading", { name: label, exact: true })).toBeVisible();
    for (const value of ["100+", "10", "56", "24", "30"]) await expect(page.locator(".achievement-stats")).toContainText(value);
    await expect(page.locator('.achievement-card > img').nth(0)).toHaveAttribute('src', /achievements-raw-08\.png$/);
    await expect(page.locator('.achievement-card > img').nth(1)).toHaveAttribute('src', /achievements-raw-02\.png$/);
    await expect(page.locator('.news-card').nth(1).locator('img')).toHaveAttribute('src', /news-raw-04\.png$/);
    await expect(page.locator('.news-card').nth(2).locator('img')).toHaveAttribute('src', /news-raw-01\.png$/);
    await expect(page.locator('.ai-cta-badge')).toHaveText('Tanya Pembangunan.AI');
    await expect(page.locator('.program-card').first().locator('a img')).toHaveAttribute('src', /programs-svg-01\.svg$/);
    const newsCard = page.locator(".news-card").first();
    await expect(newsCard).toHaveCSS("width", "400px");
    await expect(newsCard).toHaveCSS("height", "300px");
    await expect(newsCard).toHaveCSS("border-radius", "24px");
    await expect(newsCard).toHaveCSS("border-width", "2px");
    await expect(newsCard).toHaveCSS("box-shadow", "none");
    await expect(page.locator(".news-controls button")).toHaveCount(2);
    await expect(page.locator(".news-controls button").first()).toHaveCSS("width", "48px");
    await expect(page.locator(".news-controls button img").first()).toHaveCSS("width", "24px");
    await expect(page.locator(".achievement-carousel > button")).toHaveCount(2);
    await expect(page.locator(".achievement-carousel > button").first()).toHaveCSS("width", "48px");
    await expect(page.locator(".achievement-carousel > button img").first()).toHaveCSS("width", "24px");
    await expect(page.locator(".achievement-track")).toHaveCSS("width", "1272px");
    const programCard = page.locator(".program-card").first();
    await expect(programCard.locator(":scope > a img")).toHaveCount(1);
    await expect(programCard.locator(":scope > a img")).toBeVisible();
    await expect(programCard).toHaveCSS("box-shadow", "none");
    await programCard.hover();
    await expect(programCard).toHaveCSS("box-shadow", "none");
    const pseudoContent = await programCard.locator(":scope > a").evaluate((element) => getComputedStyle(element, "::after").content);
    expect(pseudoContent).toBe("none");
    await expect(page.locator('.video-play-circle img')).toHaveAttribute('src', /video-profile-svg-01\.svg$/);
    await expect(page.locator('.footer-brand-lockup strong')).toHaveCSS('font-style', 'normal');
    await expect(page.getByRole("button", { name: "Mulai Bertanya" })).toBeVisible();
    await expect(page.getByText("Kenal Lebih Dekat")).toBeVisible();
    await expect(page.getByText("Siswa SMKN 26 Raih Prestasi di LKS")).toBeVisible();
    await expect(page.locator(".achievement-stats")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.locator(".footer-map img")).toBeVisible();
    await expect(page.getByText("© 2026 SMKN 26 Jakarta. Semua Hak Dilindungi.")).toBeVisible();
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
    const metrics = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, height: document.documentElement.scrollHeight }));
    expect(metrics.scrollWidth).toBe(metrics.clientWidth);
    expect(metrics.height).toBeGreaterThanOrEqual(8093);
    expect(metrics.height).toBeLessThanOrEqual(8097);
    expect(failedAssets).toEqual([]);
    await page.screenshot({ path: "artifacts/homepage-1440-full.png", fullPage: true });
  });

  test("hero video CTA scrolls to video and every major exposes a hover card", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await page.getByRole("link", { name: "Tonton Video Profile" }).click();
    await expect(page.locator("#video-profile")).toBeInViewport();
    for (const code of ["KGS", "TEK", "TITL", "TFLM", "TKR", "SIJA"]) {
      await page.getByRole("button", { name: `Lihat ${code === "KGS" ? "Konstruksi Gedung & Sanitasi" : code === "TEK" ? "Teknik Elektronika & Komunikasi" : code === "TITL" ? "Teknik Instalasi Tenaga Listrik" : code === "TFLM" ? "Teknik Fabrikasi Logam & Manufaktur" : code === "TKR" ? "Teknik Kendaraan Ringan" : "Sistem Informasi, Jaringan & Aplikasi"}` }).hover();
      await expect(page.locator(".major-card-layer").last()).toBeVisible();
    }
    const visualWidth = await page.locator(".major-unit").first().locator(".major-person-visual").evaluate((element) => element.getBoundingClientRect().width);
    const hitboxWidth = await page.locator(".major-unit").first().locator(".major-person-hitbox").evaluate((element) => element.getBoundingClientRect().width);
    expect(visualWidth).toBeGreaterThan(hitboxWidth);
    expect(visualWidth).toBeGreaterThan(300);
    await page.getByRole("button", { name: "Lihat Sistem Informasi, Jaringan & Aplikasi" }).focus();
    await page.waitForTimeout(500);
    await expect(page.locator(".major-unit.is-active")).toBeVisible();
    await expect(page.locator(".major-unit.is-active .major-person-visual")).toHaveCSS("opacity", "1");
    await expect(page.locator(".major-unit.is-dimmed .major-person-visual").first()).toHaveCSS("opacity", "0.25");
  });

  test("achievement, BLUD, AI, and footer states expose their Figma layers", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    const achievement = page.locator(".achievement-card").first();
    await expect(achievement.locator(".achievement-card-content")).toHaveCSS("opacity", "0");
    await achievement.hover();
    await expect(achievement.locator("a", { hasText: "Lihat Detail" })).toBeVisible();
    await achievement.focus();
    await expect(achievement.locator(".achievement-card-content")).toHaveCSS("opacity", "1");
    const blud = page.locator(".blud-card").first();
    await expect(blud.locator(".blud-shape-wrap")).toHaveCSS("left", "392px");
    await expect(blud.locator(".blud-default-shape")).toBeVisible();
    await blud.hover();
    await expect(blud.locator(".blud-shape-wrap")).toHaveCSS("left", "297px");
    await expect(blud.locator(".blud-hover-shape")).toBeVisible();
    await expect(blud.locator(".blud-hover-shape")).toHaveAttribute("src", "/assets/figma/blud/blud-svg-19.svg");
    await expect(page.locator(".ai-cta-art .ai-cta-layer")).toHaveCount(3);
    await expect(page.locator(".ai-cta-art .ai-cta-bot")).toHaveCSS("width", "285px");
    await expect(page.locator(".footer-top-social a")).toHaveCount(3);
    await expect(page.locator(".footer-brand a img")).toHaveCount(2);
    await expect(page.locator(".footer-brand-lockup strong")).toHaveText("SMK NEGERI 26JAKARTA");
    await expect(page.locator(".footer-brand")).not.toContainText("☎");
    await expect(page.locator(".footer-brand")).not.toContainText("✉");
    await expect(page.locator(".footer-brand")).not.toContainText("⌖");
    await expect(page.locator(".footer-columns .footer-column-stack")).toHaveCount(2);
    await expect(page.locator(".footer-map img")).toBeVisible();
    await expect(page.locator('.footer-subscribe input')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(page.getByText("© 2026 SMKN 26 Jakarta. Semua Hak Dilindungi.")).toBeVisible();
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
