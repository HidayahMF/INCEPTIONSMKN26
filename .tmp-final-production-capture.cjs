const { chromium } = require('@playwright/test');

(async () => {
  let browser;
  const failed = [];
  const consoleErrors = [];
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(20000);
    page.on('requestfailed', (request) => failed.push(`${request.url()} :: ${request.failure()?.errorText || 'failed'}`));
    page.on('response', (response) => { if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
    await page.goto('https://inceptionsmkn-26.vercel.app/', { waitUntil: 'networkidle', timeout: 20000 });
    const metrics = await page.evaluate(() => {
      const entries = [
        ['video', '.video-profile'], ['program', '.programs-section'], ['blud', '.blud-section'],
        ['prestasi', '.achievements-section'], ['news', '.news-section'], ['ai', '.ai-cta'], ['footer', '.figma-footer'],
      ];
      return { sections: entries.map(([name, selector]) => { const r = document.querySelector(selector).getBoundingClientRect(); return { name, top: r.top + scrollY, height: r.height }; }), documentHeight: document.documentElement.scrollHeight };
    });
    await page.screenshot({ path: 'artifacts/vercel-final-after-fixes.png', fullPage: true, animations: 'disabled', timeout: 30000 });
    console.log(JSON.stringify({ ...metrics, failed: [...new Set(failed)], consoleErrors: [...new Set(consoleErrors)] }, null, 2));
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
})();
