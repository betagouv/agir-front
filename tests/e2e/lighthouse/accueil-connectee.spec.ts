import { playAudit } from 'playwright-lighthouse';
import { chromium } from 'playwright';
import { test } from '@playwright/test';
import fs from 'fs';

test.describe('Accueil - audit a11y', () => {
  test("Page d'accueil connectée", async () => {
    const context = await chromium.launchPersistentContext('./tmp', {
      args: ['--remote-debugging-port=9222'],
    });
    const page = await context.newPage();
    await page.goto('/authentification');

    await page.getByLabel('Adresse électronique Format').fill(`${process.env.PLAYWRIGHT_EMAIL}`);
    await page.locator('#password-input').fill(`${process.env.PLAYWRIGHT_PASSWORD}`);
    await page.getByRole('button', { name: 'Se connecter' }).click({ force: true });
    await page.waitForTimeout(1500);

    await playAudit({
      page: page,
      port: 9222,
      thresholds: {
        accessibility: 95,
      },
    });

    await context.close();
  });
});

test.afterAll(() => {
  fs.rmSync('./tmp', { recursive: true, force: true });
});
