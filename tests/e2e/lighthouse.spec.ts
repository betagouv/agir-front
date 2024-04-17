import { playAudit } from 'playwright-lighthouse';
import { test, chromium, BrowserContext, Page } from '@playwright/test';
import fs from 'fs';

test.describe('Audit a11y', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async () => {
    context = await chromium.launchPersistentContext('./tmp', {
      args: ['--remote-debugging-port=9222'],
    });
    page = await context.newPage();

    await page.goto('/authentification');

    await page.getByLabel('Adresse électronique Format').fill(`${process.env.PLAYWRIGHT_EMAIL}`);
    await page.locator('#password-input').fill(`${process.env.PLAYWRIGHT_PASSWORD}`);
    await page.getByRole('button', { name: 'Se connecter' }).click({ force: true });
    await page.waitForTimeout(1500);
  });

  test("Page d'accueil connectée", async () => {
    await playAudit({
      page: page,
      port: 9222,
      thresholds: {
        accessibility: 100,
      },
    });
  });

  test('Page catalogue de service', async () => {
    await page.goto('/agir/services');

    await playAudit({
      page: page,
      port: 9222,
      thresholds: {
        accessibility: 100,
      },
    });
  });

  test("Page catalogue d'aides", async () => {
    await page.goto('/vos-aides/');

    await playAudit({
      page: page,
      port: 9222,
      thresholds: {
        accessibility: 100,
      },
    });
  });

  test('Page bibliothèque', async () => {
    await page.goto('/agir/bibliotheque');

    await playAudit({
      page: page,
      port: 9222,
      thresholds: {
        accessibility: 100,
      },
    });
  });

  test('Page mon compte', async () => {
    await page.goto('/mon-compte/');

    await playAudit({
      page: page,
      port: 9222,
      thresholds: {
        accessibility: 100,
      },
    });
  });

  test.afterAll(async () => {
    await context.close();
    fs.rmSync('./tmp', { recursive: true, force: true });
  });
});
