import { test, expect, Page } from '@playwright/test';
import { chromium } from '@playwright/test';

let page: Page;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  page = await browser.newPage();
});

test.describe('Onboarding complet', () => {
  test('pre-onboarding', async () => {
    await page.goto('/pre-onboarding');
    await page.getByRole('link', { name: "Commencer l'estimation" }).click();
    await expect(page).toHaveURL('/onboarding');
  });

  test('onboarding - step 1', async () => {
    const titre = page.getByRole('heading', { level: 2, name: /Étape 1 sur 4/i });
    expect(titre).toBeDefined();
    // click sur une checkbox, voir pourquoi on ne peut pas utiliser le role
    await page.getByText('🛵 Scooter ou moto').click();
    expect(await page.isChecked('#moto')).toBeTruthy();

    const button = page.getByRole('button', { name: 'Continuer' });
    await button.click();
  });

  test('onboarding - step 2', async () => {
    const titre = page.getByRole('heading', { level: 2, name: /Étape 2 sur 4/i });
    expect(titre).toBeDefined();

    await page.getByRole('textbox', { name: 'Code postal' }).fill('75001');

    await page.getByRole('radio', { name: 'Une maison' }).click();
    await page.getByRole('radio', { name: 'Moins de 35 m²' }).click();
    await page.getByRole('radio', { name: 'Fioul' }).click();

    const button = page.getByRole('button', { name: 'Continuer' });
    await button.click();
  });

  test('onboarding - step 3', async () => {
    const titre = page.getByRole('heading', { level: 2, name: /Étape 3 sur 4/i });
    expect(titre).toBeDefined();

    await page.getByRole('radio', { name: 'Aucun' }).click();

    const button = page.getByRole('button', { name: 'Continuer' });
    await button.click();
  });

  test('onboarding - step 4', async () => {
    const titre = page.getByRole('heading', { level: 2, name: /Étape 4 sur 4/i });
    expect(titre).toBeDefined();

    await page.getByRole('radio', { name: 'Je n’achète presque jamais et rarement neuf' }).click();

    const button = await page.getByRole('button', { name: 'Continuer' });
    await button.click();
  });

  test.skip('onboarding - Bilan', () => {});

  test.skip('onboarding - Inscription', () => {});
});
