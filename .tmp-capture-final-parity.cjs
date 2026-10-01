const { chromium } = require('@playwright/test');

(async () => {
  let browser;

  try {
    console.log('[1/12] Launch Chromium');
    browser = await chromium.launch();

    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 }
    });

    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(15000);

    async function openHome() {
      await page.goto('http://127.0.0.1:5173/', {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });
    }

    async function capture(name, action) {
      console.log(`Capturing: ${name}`);

      await openHome();

      if (action) {
        await action(page);
      }

      await page.screenshot({
        path: `artifacts/${name}.png`,
        fullPage: false,
        timeout: 15000
      });

      console.log(`Done: ${name}`);
    }

    console.log('[2/12] Full homepage');
    await openHome();
    await page.screenshot({
      path: 'artifacts/final-parity-after.png',
      fullPage: true,
      timeout: 20000
    });

    await capture('jurusan-default-1440', async (page) => {
      await page.locator('.school-majors').scrollIntoViewIfNeeded();
    });

    const majors = [
      ['Konstruksi Gedung & Sanitasi', 'jurusan-hover-kgs-1440'],
      ['Teknik Elektronika & Komunikasi', 'jurusan-hover-tek-1440'],
      ['Teknik Instalasi Tenaga Listrik', 'jurusan-hover-titl-1440'],
      ['Teknik Fabrikasi Logam & Manufaktur', 'jurusan-hover-tflm-1440'],
      ['Teknik Kendaraan Ringan', 'jurusan-hover-tkr-1440'],
      ['Sistem Informasi, Jaringan & Aplikasi', 'jurusan-hover-sija-1440'],
    ];

    for (const [label, name] of majors) {
      await capture(name, async (page) => {
        const button = page.locator(
          `.major-person-hitbox[aria-label="Lihat ${label}"]`
        );

        await button.scrollIntoViewIfNeeded();
        await button.hover({ timeout: 10000 });
        await page.waitForTimeout(350);
      });
    }

    await capture('blud-default-1440', async (page) => {
      await page.locator('.blud-section').scrollIntoViewIfNeeded();
    });

    await capture('blud-kgs-hover-1440', async (page) => {
      const card = page.locator('.blud-card').first();
      await card.scrollIntoViewIfNeeded();
      await card.hover({ timeout: 10000 });
      await page.waitForTimeout(350);
    });

    await capture('prestasi-default-1440', async (page) => {
      await page.locator('.achievements-section').scrollIntoViewIfNeeded();
    });

    await capture('prestasi-hover-1440', async (page) => {
      const card = page.locator('.achievement-card').first();
      await card.scrollIntoViewIfNeeded();
      await card.hover({ timeout: 10000 });
      await page.waitForTimeout(350);
    });

    await capture('ai-cta-1440', async (page) => {
      await page.locator('.ai-cta').scrollIntoViewIfNeeded();
    });

    await capture('footer-1440', async (page) => {
      await page.locator('.figma-footer').scrollIntoViewIfNeeded();
    });

    console.log('ALL CAPTURES COMPLETE');
  } catch (error) {
    console.error('CAPTURE FAILED:');
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
