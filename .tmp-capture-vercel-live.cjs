const { chromium } = require('@playwright/test');

const baseUrl = 'https://inceptionsmkn-26.vercel.app/';
const captures = [];
const failedRequests = [];
const consoleErrors = [];

(async () => {
  let browser;

  try {
    console.log('[1/8] Launch Chromium');
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(20000);

    page.on('requestfailed', (request) => {
      failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText || 'failed'}`);
    });
    page.on('response', (response) => {
      if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`);
    });
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    async function openHome() {
      try {
        await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 20000 });
      } catch (error) {
        console.log(`Network idle fallback: ${error.message}`);
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForTimeout(1500);
      }
    }

    async function saveLocator(name, locator, fullPage = false) {
      await locator.scrollIntoViewIfNeeded();
      const box = await locator.boundingBox();
      await locator.screenshot({ path: `artifacts/${name}.png`, animations: 'disabled', timeout: 20000 });
      const dimensions = box ? { width: Math.round(box.width), height: Math.round(box.height) } : null;
      captures.push({ name: `artifacts/${name}.png`, dimensions, fullPage });
      console.log(`Done: ${name} ${dimensions ? `${dimensions.width}x${dimensions.height}` : 'unknown-size'}`);
    }

    async function captureSection(name, locator) {
      console.log(`Capturing: ${name}`);
      await openHome();
      await saveLocator(name, locator);
    }

    console.log('[2/8] Full production homepage');
    await openHome();
    const documentSize = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }));
    await page.screenshot({ path: 'artifacts/vercel-live-full-1440.png', fullPage: true, animations: 'disabled', timeout: 30000 });
    captures.push({ name: 'artifacts/vercel-live-full-1440.png', dimensions: documentSize, fullPage: true });
    console.log(`Done: vercel-live-full-1440 ${documentSize.width}x${documentSize.height}`);

    console.log('[3/8] Static sections');
    await captureSection('vercel-hero-1440', page.locator('main > section').nth(0));
    await captureSection('vercel-overview-1440', page.locator('.school-overview'));
    await captureSection('vercel-advantages-1440', page.locator('main > section').nth(3));
    await captureSection('vercel-partners-1440', page.locator('main > section').nth(4));
    await captureSection('vercel-jurusan-default-1440', page.locator('.school-majors'));

    console.log('[4/8] Jurusan hover states');
    const majors = [
      ['Konstruksi Gedung & Sanitasi', 'vercel-jurusan-kgs-hover-1440'],
      ['Teknik Elektronika & Komunikasi', 'vercel-jurusan-tek-hover-1440'],
      ['Teknik Instalasi Tenaga Listrik', 'vercel-jurusan-titl-hover-1440'],
      ['Teknik Fabrikasi Logam & Manufaktur', 'vercel-jurusan-tflm-hover-1440'],
      ['Teknik Kendaraan Ringan', 'vercel-jurusan-tkr-hover-1440'],
      ['Sistem Informasi, Jaringan & Aplikasi', 'vercel-jurusan-sija-hover-1440'],
    ];
    for (const [label, name] of majors) {
      await openHome();
      const hitbox = page.locator(`.major-person-hitbox[aria-label="Lihat ${label}"]`);
      await hitbox.hover({ timeout: 10000 });
      await page.waitForTimeout(350);
      await saveLocator(name, page.locator('.school-majors'));
    }

    console.log('[5/8] Remaining sections');
    await captureSection('vercel-video-1440', page.locator('.video-profile'));
    await captureSection('vercel-program-1440', page.locator('.programs-section'));
    await captureSection('vercel-blud-default-1440', page.locator('.blud-section'));
    await openHome();
    const blud = page.locator('.blud-card').first();
    await blud.hover();
    await page.waitForTimeout(350);
    await saveLocator('vercel-blud-hover-1440', page.locator('.blud-section'));
    await captureSection('vercel-prestasi-default-1440', page.locator('.achievements-section'));
    await openHome();
    const achievement = page.locator('.achievement-card').first();
    await achievement.hover();
    await page.waitForTimeout(350);
    await saveLocator('vercel-prestasi-hover-1440', page.locator('.achievements-section'));
    await captureSection('vercel-news-1440', page.locator('.news-section'));
    await captureSection('vercel-ai-cta-1440', page.locator('.ai-cta'));
    await captureSection('vercel-footer-1440', page.locator('.figma-footer'));

    console.log('[6/8] Diagnostics');
    console.log(`FAILED_REQUESTS=${JSON.stringify([...new Set(failedRequests)])}`);
    console.log(`CONSOLE_ERRORS=${JSON.stringify([...new Set(consoleErrors)])}`);
    console.log(`CAPTURES=${JSON.stringify(captures)}`);
    console.log('ALL VERCEL CAPTURES COMPLETE');
  } catch (error) {
    console.error('VERCEL CAPTURE FAILED:');
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
})();
