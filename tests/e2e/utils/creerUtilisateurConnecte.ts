import { Page, chromium } from '@playwright/test';

export const creerUtilisateurConnecte: () => Promise<Page> = async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
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

  await page.goto('/onboarding/bilan');
  await page.click('text="Inscrivez-vous !"');

  await page.fill('#utilisateur-mail', process.env.PLAYWRIGHT_EMAIL || '');
  await page.fill('#utilisateur-nom', "L'éponge");
  await page.fill('#utilisateur-prenom', 'Bob');
  await page.fill('#password', process.env.PLAYWRIGHT_PASSWORD || '');
  await page.click('button[type="submit"]');

  await page.fill('#code', process.env.PLAYWRIGHT_OTP_DEV || '');
  const valider = page.getByRole('button', { name: 'Valider' });
  await valider.click();

  return page;
};
