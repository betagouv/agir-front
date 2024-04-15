import { playAudit } from 'playwright-lighthouse';
import { test, chromium } from '@playwright/test';

test.describe.skip('Accueil - audit ', () => {
  test('open browser', async () => {
    const browser = await chromium.launch({
      args: ['--remote-debugging-port=9222'],
    });
    const page = await browser.newPage();
    await page.goto('/');

    await playAudit({
      page: page,
      port: 9222,
      thresholds: {
        accessibility: 50,
        'best-practices': 50,
      },
      reports: {
        formats: {
          json: false,
          html: true,
        },
      },
    });

    await browser.close();
  });
});
