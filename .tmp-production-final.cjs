const { chromium } = require('@playwright/test');

(async () => {
  let browser;
  const failed = [];
  const errors = [];
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(20000);
    page.on('requestfailed', (request) => failed.push(`${request.url()} :: ${request.failure()?.errorText || 'failed'}`));
    page.on('response', (response) => { if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('https://inceptionsmkn-26.vercel.app/', { waitUntil: 'networkidle', timeout: 20000 });
    const result = await page.evaluate(() => {
      const selectors = [
        ['hero', 'main > section:first-child'], ['overview', '.school-overview'],
        ['advantages', '.advantages-carousel'], ['partners', '.partners-section'],
        ['jurusan', '.school-majors'], ['video', '.video-profile'], ['program', '.programs-section'],
        ['blud', '.blud-section'], ['prestasi', '.achievements-section'], ['news', '.news-section'],
        ['ai', '.ai-cta'], ['footer', '.figma-footer'],
      ];
      return {
        sections: selectors.map(([name, selector]) => { const match = document.querySelector(selector); const e = match?.closest('section') || match; if (!e) return { name, missing: true }; const r = e.getBoundingClientRect(); return { name, top: r.top + scrollY, height: r.height }; }),
        documentHeight: document.documentElement.scrollHeight,
      };
    });
    await page.screenshot({ path: 'artifacts/vercel-final-after-fixes.png', fullPage: true, animations: 'disabled', timeout: 30000 });
    console.log(JSON.stringify({ ...result, failed: [...new Set(failed)], consoleErrors: [...new Set(errors)] }, null, 2));
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
})();
