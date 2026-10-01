import { expect, test } from "@playwright/test";

const youtubeUrl = "https://www.youtube.com/watch?si=IP1NH2avF07GO1DZ&v=BAWRtymSpNg&feature=youtu.be";

async function openVideoProfile(page: import("@playwright/test").Page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const section = page.locator("#video-profile");
  await section.scrollIntoViewIfNeeded();
  await page.mouse.move(20, 20);
  return { section, play: page.locator(".video-play"), ring: page.locator(".video-play-ring"), inner: page.locator(".video-play-button") };
}

async function ringBox(ring: import("@playwright/test").Locator) {
  const box = await ring.boundingBox();
  if (!box) throw new Error("Video Profile ring is not measurable");
  return { x: box.x, y: box.y, width: box.width, height: box.height };
}

test.describe("Video Profile", () => {
  test("renders the verified link and local play assets", async ({ page }) => {
    const { section, play } = await openVideoProfile(page);
    await expect(section).toHaveCount(1);
    await expect(play).toHaveAttribute("href", youtubeUrl);
    await expect(play).toHaveAttribute("target", "_blank");
    await expect(play).toHaveAttribute("rel", /noopener noreferrer/);
    await expect(play).toHaveAttribute("aria-label", "Tonton Video Profil SMKN 26 Jakarta di YouTube");
    await expect(play.locator(".video-play-button img")).toHaveAttribute("src", /video-profile-play-icon\.svg$/);
    await expect(play.locator(".video-play-ring")).toHaveAttribute("src", /video-profile-play-ring\.svg$/);
  });

  test("idle ring animates without hover", async ({ page }) => {
    const { section, play, ring } = await openVideoProfile(page);
    const times = [0, 400, 800, 1200, 1600];
    const samples: Record<number, { x: number; y: number; width: number; height: number }> = {};
    for (const time of times) {
      if (time > 0) await page.waitForTimeout(400);
      samples[time] = await ringBox(ring);
      await section.screenshot({ path: `artifacts/video-play-idle-${String(time).padStart(3, "0")}.png` });
      const playBox = await play.boundingBox();
      expect(playBox && (20 < playBox.x || 20 > playBox.x + playBox.width || 20 < playBox.y || 20 > playBox.y + playBox.height)).toBeTruthy();
    }
    const widths = Object.values(samples).map((sample) => sample.width);
    expect(Math.max(...widths) - Math.min(...widths)).toBeGreaterThan(8);
    expect(Math.min(...widths)).toBeGreaterThanOrEqual(98);
    expect(Math.max(...widths)).toBeLessThanOrEqual(121);
    console.log(`IDLE_MEASUREMENTS ${JSON.stringify(samples)}`);
  });

  test("hover settles ring and leaves inner button unscaled", async ({ page }) => {
    const { section, play, ring, inner } = await openVideoProfile(page);
    await play.hover();
    await page.waitForTimeout(350);
    const box = await ringBox(ring);
    await section.screenshot({ path: "artifacts/video-play-hover.png" });
    expect(box.width).toBeCloseTo(120, 0);
    expect(box.height).toBeCloseTo(120, 0);
    await expect.poll(() => inner.evaluate((node) => getComputedStyle(node).transform)).toBe("none");
  });

  test("mouseleave resumes idle animation", async ({ page }) => {
    const { play, ring } = await openVideoProfile(page);
    await play.hover();
    await page.waitForTimeout(350);
    await page.mouse.move(20, 20);
    const first = await ringBox(ring);
    await page.waitForTimeout(400);
    const second = await ringBox(ring);
    expect(Math.abs(second.width - first.width)).toBeGreaterThan(2);
    console.log(`MOUSELEAVE ${JSON.stringify({ first, second })}`);
  });

  test("active press scales only the inner button", async ({ page }) => {
    const { section, play, ring, inner } = await openVideoProfile(page);
    const box = await play.boundingBox();
    if (!box) throw new Error("Video Profile play link is not measurable");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(80);
    const transform = await inner.evaluate((node) => getComputedStyle(node).transform);
    const ringDuringPress = await ringBox(ring);
    await section.screenshot({ path: "artifacts/video-play-active.png" });
    expect(transform).toMatch(/matrix\(0\.98/);
    expect(ringDuringPress.width).toBeCloseTo(120, 0);
    await page.mouse.up();
    await expect.poll(() => inner.evaluate((node) => getComputedStyle(node).transform)).toBe("none");
  });

  test("focus-visible expands ring without pressed appearance", async ({ page }) => {
    const { section, play, ring, inner } = await openVideoProfile(page);
    await play.focus();
    await page.waitForTimeout(50);
    const box = await ringBox(ring);
    await section.screenshot({ path: "artifacts/video-play-focus.png" });
    expect(box.width).toBeCloseTo(120, 0);
    expect(await inner.evaluate((node) => getComputedStyle(node).transform)).toBe("none");
  });

  test("reduced motion disables idle animation", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "networkidle" });
    await page.locator("#video-profile").scrollIntoViewIfNeeded();
    const ring = page.locator(".video-play-ring");
    await page.waitForTimeout(900);
    await expect(ring).toHaveCSS("animation-name", "none");
    const first = await ringBox(ring);
    await page.waitForTimeout(400);
    const second = await ringBox(ring);
    expect(second.width).toBeCloseTo(first.width, 1);
    expect(second.width).toBeCloseTo(98.4, 0);
    await context.close();
  });
});
