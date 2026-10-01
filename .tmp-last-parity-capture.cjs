const { chromium } = require('@playwright/test');

(async () => {
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.setDefaultTimeout(10000);
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(3000);
    const sections = [
      ['video', '.video-profile'],
      ['program', '.programs-section'],
      ['news', '.news-section'],
      ['ai', '.ai-cta'],
      ['footer', '.figma-footer'],
      ['advantages', 'main > section:has(.advantages-carousel)'],
    ];
    for (const [name, selector] of sections) {
      await page.locator(selector).screenshot({ path: `artifacts/last-fix-${name}.png`, animations: 'disabled' });
    }
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    await page.locator('.programs-section').screenshot({ path: 'artifacts/last-fix-program-after-3s.png', animations: 'disabled' });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);
    await page.locator('.blud-card').first().hover();
    await page.waitForTimeout(350);
    await page.locator('.blud-section').screenshot({ path: 'artifacts/last-fix-blud-kgs-hover.png', animations: 'disabled' });
    const metrics = await page.evaluate(() => ({ height: document.documentElement.scrollHeight, video: document.querySelector('.video-profile').getBoundingClientRect().top + scrollY, program: document.querySelector('.programs-section').getBoundingClientRect().top + scrollY, blud: document.querySelector('.blud-section').getBoundingClientRect().top + scrollY, news: document.querySelector('.news-section').getBoundingClientRect().top + scrollY, ai: document.querySelector('.ai-cta').getBoundingClientRect().top + scrollY, footer: document.querySelector('.figma-footer').getBoundingClientRect().top + scrollY }));
    console.log(JSON.stringify(metrics));
  } finally {
    if (browser) await browser.close();
  }
})();
