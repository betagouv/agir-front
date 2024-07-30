import { playAudit } from 'playwright-lighthouse';
import { test, chromium, Page, Browser } from '@playwright/test';
import { beforeAll } from 'vitest';
test.describe.configure({ mode: 'parallel' });
test.describe('Audit a11y - pages non connectées', () => {
  let context: Browser;
  let page: Page;
  beforeAll(async () => {
    context = await chromium.launch({ args: ['--remote-debugging-port=9222'] });
    page = await context.newPage();
  });
  test("Page d'accueil", async () => {
    await page.goto('/');
    await playAuditA11y(page);
  });

  test('Page CGU', async () => {
    await page.goto('/cgu');
    await playAuditA11y(page);
  });

  test('Page de connexion', async () => {
    await page.goto('/authentification');
    await playAuditA11y(page);
  });
});
const playAuditA11y = async (page: Page) => {
  await playAudit({
    page: page,
    port: 9222,
    thresholds: {
      accessibility: 100,
    },
  });
};
