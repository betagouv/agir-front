import { playAudit } from 'playwright-lighthouse';
import { test, chromium, BrowserContext, Page, Browser } from '@playwright/test';
import fs from 'fs';
import { beforeAll } from 'vitest';

test.describe.configure({ mode: 'parallel', retries: 2, timeout: 25000 });
test.describe('Audit a11y - pages non connectées', () => {
  let context: Browser;
  let browserContext: BrowserContext;
  test.beforeAll(async () => {
    context = await chromium.launch({
      args: ['--remote-debugging-port=9223'],
    });
    browserContext = await context.newContext();
  });

  test("Page d'accueil", async () => {
    const page = await browserContext.newPage();
    await page.goto('/');
    await playAuditA11y(page);
  });

  test('Page de connexion', async () => {
    const page = await browserContext.newPage();
    await page.goto('/authentification');
    await playAuditA11y(page);
  });

  test('Page CGU', async () => {
    const page = await browserContext.newPage();
    await page.goto('/cgu');
    await playAuditA11y(page);
  });
});

const playAuditA11y = async (page: Page) => {
  await playAudit({
    page: page,
    port: 9223,
    thresholds: {
      accessibility: 100,
    },
  });
};
