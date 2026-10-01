const { chromium } = require('@playwright/test');

(async () => {
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.setDefaultTimeout(10000);
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1200);
    const metrics = await page.evaluate(() => {
      const selectors = [
        ['hero', 'main > section:nth-of-type(1)'],
        ['overview', '.school-overview'],
        ['advantages', 'main > section:has(.advantages-carousel)'],
        ['partners', '.partners-section'],
        ['jurusan', '.school-majors'],
        ['video', '.video-profile'],
        ['program', '.programs-section'],
        ['blud', '.blud-section'],
        ['prestasi', '.achievements-section'],
        ['news', '.news-section'],
        ['ai', '.ai-cta'],
        ['footer', '.figma-footer'],
      ];
      return {
        sections: selectors.map(([name, selector]) => {
          const element = document.querySelector(selector);
          if (!element) return { name, missing: true };
          const rect = element.getBoundingClientRect();
          return { name, top: rect.top + scrollY, height: rect.height };
        }),
        stage: ['.major-stage-wrap', '.major-stage-background', '.major-stage'].map((selector) => {
          const element = document.querySelector(selector);
          const section = document.querySelector('.school-majors');
          const rect = element.getBoundingClientRect();
          const root = section.getBoundingClientRect();
          return { selector, relativeTop: rect.top - root.top, height: rect.height };
        }),
        people: [...document.querySelectorAll('.major-unit:not(.is-active) .major-person-visual')].map((element) => {
          const rect = element.getBoundingClientRect();
          const root = document.querySelector('.school-majors').getBoundingClientRect();
          return { relativeTop: rect.top - root.top, height: rect.height, width: rect.width };
        }),
        scrollHeight: document.documentElement.scrollHeight,
      };
    });
    console.log(JSON.stringify(metrics, null, 2));
    const shots = [
      ['final-livefix-full', page.locator('body'), true],
      ['final-livefix-hero', page.locator('main > section').nth(0)],
      ['final-livefix-overview', page.locator('.school-overview')],
      ['final-livefix-jurusan', page.locator('.school-majors')],
      ['final-livefix-video', page.locator('.video-profile')],
      ['final-livefix-program', page.locator('.programs-section')],
      ['final-livefix-blud-default', page.locator('.blud-section')],
      ['final-livefix-prestasi-default', page.locator('.achievements-section')],
      ['final-livefix-news', page.locator('.news-section')],
      ['final-livefix-ai', page.locator('.ai-cta')],
      ['final-livefix-footer', page.locator('.figma-footer')],
    ];
    for (const [name, locator, fullPage] of shots) {
      await locator.screenshot({ path: `artifacts/${name}.png`, fullPage: Boolean(fullPage), animations: 'disabled', timeout: 20000 });
    }
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(700);
    const blud = page.locator('.blud-card').first();
    await blud.hover();
    await page.waitForTimeout(350);
    await page.locator('.blud-section').screenshot({ path: 'artifacts/final-livefix-blud-hover.png', animations: 'disabled' });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(700);
    await page.locator('.achievement-card').first().hover();
    await page.waitForTimeout(350);
    await page.locator('.achievements-section').screenshot({ path: 'artifacts/final-livefix-prestasi-hover.png', animations: 'disabled' });
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
})();
