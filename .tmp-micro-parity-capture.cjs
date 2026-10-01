const { chromium } = require('@playwright/test');

(async () => {
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.setDefaultTimeout(10000);
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1200);
    const data = await page.evaluate(() => {
      const rect = (selector) => { const e = document.querySelector(selector); const r = e.getBoundingClientRect(); return { pageLeft: r.left + scrollX, pageTop: r.top + scrollY, width: r.width, height: r.height }; };
      const style = (selector, props) => { const s = getComputedStyle(document.querySelector(selector)); return Object.fromEntries(props.map((prop) => [prop, s[prop]])); };
      return {
        documentHeight: document.documentElement.scrollHeight,
        aiSection: rect('.ai-cta'),
        aiCopy: { ...rect('.ai-cta-copy'), ...style('.ai-cta-copy', ['paddingLeft', 'fontWeight']) },
        bot: rect('.ai-cta-art'),
        smallCircle: rect('.ai-circle-small'),
        largeCircle: rect('.ai-circle-large'),
        video: rect('.video-profile'),
        videoOverlay: style('.video-profile-overlay', ['backgroundImage', 'opacity']),
        footer: rect('.figma-footer'),
        crest: style('.footer-brand-lockup > img', ['width', 'height']),
        brand: style('.footer-brand-lockup strong', ['fontSize', 'lineHeight', 'fontWeight', 'fontStyle']),
        tagline: style('.footer-brand-lockup em', ['fontSize', 'lineHeight', 'fontStyle']),
        column: style('.footer-column h3', ['fontSize', 'fontWeight']),
        copyright: style('.footer-bottom', ['fontSize', 'lineHeight']),
      };
    });
    console.log(JSON.stringify(data, null, 2));
    for (const [name, selector] of [['ai', '.ai-cta'], ['video', '.video-profile'], ['footer', '.figma-footer']]) {
      await page.locator(selector).screenshot({ path: `artifacts/micro-${name}.png`, animations: 'disabled' });
    }
  } finally {
    if (browser) await browser.close();
  }
})();
