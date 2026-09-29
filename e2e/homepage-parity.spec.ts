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
    await expect(page.locator('img[src$="student-female.png"]')).toHaveCount(1);
    await expect(page.locator('img[src$="student-male.png"]')).toHaveCount(1);
    for (const label of ["Ekstrakurikuler", "Lembaga Sertifikasi Profesi", "OSIS & MPK", "Bursa Kerja Khusus"]) await expect(page.getByRole("heading", { name: label, exact: true })).toBeVisible();
    for (const value of ["100+", "10", "56", "24", "30"]) await expect(page.locator(".achievement-stats")).toContainText(value);
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
    const metrics = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, height: document.body.scrollHeight }));
    expect(metrics.scrollWidth).toBe(metrics.clientWidth);
    expect(metrics.height).toBeGreaterThan(7600);
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
    await page.getByRole("button", { name: "Lihat Sistem Informasi, Jaringan & Aplikasi" }).hover();
    await expect(page.locator(".major-unit.is-active")).toHaveCSS("left", "728px");
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
    await expect(blud.locator(".blud-shape")).toHaveCSS("opacity", "0");
    await blud.hover();
    await expect(blud.locator(".blud-shape")).toHaveCSS("opacity", "0.9");
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
