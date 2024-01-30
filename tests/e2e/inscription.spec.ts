import { test, expect, Page } from '@playwright/test';
import { chromium } from '@playwright/test';

let page: Page;
const browser = await chromium.launch({
  headless: true,
});
const context = await browser.newContext();

test.beforeAll(async () => {
  page = await browser.newPage();

  await page.goto('/onboarding');
  await page.evaluate(() => {
    localStorage.setItem(
      'onboarding',
      JSON.stringify({
        etapeTransport: { avion: 0, transports: ['voiture'], done: true },
        etapeLogement: {
          code_postal: '75001',
          commune: 'PARIS 01',
          adultes: 1,
          enfants: 0,
          residence: 'maison',
          proprietaire: false,
          superficie: 'superficie_35',
          chauffage: 'electricite',
          done: true,
        },
        etapeAlimentation: { repas: 'vegan', done: true },
        etapeConsommation: { consommation: 'jamais', done: true },
      })
    );
  });
});

test.describe('Inscription - connexion - suppression', () => {
  test('inscription', async () => {
    await page.goto('/onboarding/bilan');
    await page.click('text="Inscrivez-vous !"');

    await expect(page).toHaveTitle('Agir ! - Création du compte');
    await page.fill('#utilisateur-mail', process.env.PLAYWRIGHT_EMAIL || '');
    await page.fill('#utilisateur-nom', "L'éponge");
    await page.fill('#utilisateur-prenom', 'Bob');
    await page.fill('#password', process.env.PLAYWRIGHT_PASSWORD || '');
    await page.click('button[type="submit"]');

    await page.fill('#code', process.env.PLAYWRIGHT_OTP_DEV || '');
    const valider = page.getByRole('button', { name: 'Valider' });
    expect(valider).toBeTruthy();
    await valider.click();
    await expect(page).toHaveTitle('Agir ! - Agir');
  });

  test('suppression du compte', async () => {
    await page.goto('mon-compte/options-avancees');

    const supprimer = page.getByRole('button', { name: 'Supprimer votre Compte' });
    expect(supprimer).toBeTruthy();
    await supprimer.click();
    // cliquer sur le bouton oui dans la modal
    const confirmer = page.getByRole('button', { name: 'Confirmer' });
    expect(confirmer).toBeTruthy();
    await confirmer.click();

    // vérifier que l'utilisateur est bien redirigé vers la page d'accueil
    await expect(page).toHaveTitle('Agir ! - Accueil');
  });
});
