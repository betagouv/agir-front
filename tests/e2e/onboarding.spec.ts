import { test, expect, Page } from '@playwright/test';
import { chromium } from '@playwright/test';

let page: Page;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  page = await browser.newPage();
});

test.describe('Onboarding complet', () => {
  test("Aller sur l'onboarding", async () => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Commencer' }).click();
    await expect(page).toHaveURL('/onboarding');

    const titre = page.getByRole('heading', { level: 1, name: 'Quelques questions pour apprendre à se connaître' });
    expect(titre).toBeDefined();
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

    const button = page.getByRole('button', { name: 'Continuer' });
    await button.click();
  });

  test('onboarding - Bilan', async () => {
    // TO FIX - toujours vert
    const titre = page.getByRole('heading', { level: 1, name: 'Premiers résultats' });
    expect(titre).toBeDefined();

    expect(page.locator('aria-label="Jauge de 🏡 Logement - 70 rempli"')).toBeTruthy();
    expect(page.locator('aria-label="Jauge de 🚗 Transports - 35 rempli"')).toBeTruthy();
    expect(page.locator('aria-label="Jauge de 🛒 Consommation - 6 rempli"')).toBeTruthy();
    expect(page.locator('aria-label="Jauge de 🥦 Alimentation - 6 rempli"')).toBeTruthy();
  });
});
