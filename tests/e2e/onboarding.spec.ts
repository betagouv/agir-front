import { test, expect, Page } from '@playwright/test';
import { chromium } from '@playwright/test';

let page: Page;
const browser = await chromium.launch({
  headless: true,
});

test.beforeAll(async () => {
  // Setup - Permet d'avoir un seul contexte pour tous les tests
  page = await browser.newPage();
});

test.describe('Onboarding complet', () => {
  test("Aller sur l'onboarding", async () => {
    await page.goto('/');
    await page.click('text="Commencer"');
    // TODO : le title devrait peut être changer
    await expect(page).toHaveTitle('Agir ! - Accueil');
    // clique sur le bouton "commencer"
    await expect(page).toHaveURL('/onboarding');

    const name = await page.innerText('.fr-stepper__state');
    expect(name).toBe('Étape 1 sur 4');
  });
  test('onboarding - step 1', async () => {
    // click sur une checkbox
    const moto = await page.getByText('🛵 Scooter ou moto').click();
    expect(await page.isChecked('#moto')).toBeTruthy();

    // vérifier que le bouton "suivant" est affiché
    const button = page.getByRole('button', { name: 'Continuer' });
    expect(button).toBeTruthy();
    await button.click();
  });

  test('onboarding - step 2', async () => {
    // vérifier que le step 2 est affiché
    const name2 = await page.innerText('.fr-stepper__state');
    expect(name2).toBe('Étape 2 sur 4');

    await page.getByLabel('Code postal').fill('75001');

    await page.getByRole('radio', { name: 'Une maison' }).click();
    await page.getByRole('radio', { name: 'Moins de 35 m²' }).click();
    await page.getByRole('radio', { name: 'Fioul' }).click();

    const button = page.getByRole('button', { name: 'Continuer' });
    expect(button).toBeTruthy();
    await button.click();
  });

  test('onboarding - step 3', async () => {
    const name = await page.innerText('.fr-stepper__state');
    expect(name).toBe('Étape 3 sur 4');

    await page.getByRole('radio', { name: 'Aucun' }).click();

    const button = page.getByRole('button', { name: 'Continuer' });
    expect(button).toBeTruthy();
    await button.click();
  });

  test('onboarding - step 4', async () => {
    const name = await page.innerText('.fr-stepper__state');
    expect(name).toBe('Étape 4 sur 4');

    await page.getByRole('radio', { name: 'Je n’achète presque jamais et rarement neuf' }).click();

    const button = page.getByRole('button', { name: 'Continuer' });
    expect(button).toBeTruthy();
    await button.click();
  });

  test('onboarding - Bilan', async () => {
    expect(page.locator('aria-label="Jauge de 🏡 Logement - 70 rempli"')).toBeTruthy();
    expect(page.locator('aria-label="Jauge de 🚗 Transports - 35 rempli"')).toBeTruthy();
    expect(page.locator('aria-label="Jauge de 🛒 Consommation - 6 rempli"')).toBeTruthy();
    expect(page.locator('aria-label="Jauge de 🥦 Alimentation - 6 rempli"')).toBeTruthy();
  });
});
