import { Page, chromium } from '@playwright/test';
import supprimerUtilisateur from './supprimerUtilisateur';

export const creerUtilisateurConnecte: () => Promise<Page> = async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  let page = await context.newPage();
  page = await creerUtilisateurOuSupprimmer(page);
  return page;
};

async function creerUtilisateurOuSupprimmer(page: Page): Promise<Page> {
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

  const [response] = await Promise.all([page.waitForResponse('**/utilisateurs/'), page.click('button[type="submit"]')]);

  const res = await response.json();

  if (response.status() === 400 && res.code === '022') {
    // se connecter
    await page.getByText('Se connecter').first().click();
    await page.fill('#email', process.env.PLAYWRIGHT_EMAIL || '');
    await page.fill('#password-input', process.env.PLAYWRIGHT_PASSWORD || '');
    await page.getByRole('button', { name: 'Se connecter' }).first().click();

    await page.waitForTimeout(1000);
    await page.waitForLoadState('domcontentloaded');
    await supprimerUtilisateur(page);
    page = await creerUtilisateurOuSupprimmer(page);
  }
  // user created
  page.getByRole('heading', { name: 'Validez votre compte' });
  await page.fill('#code', process.env.PLAYWRIGHT_OTP_DEV || '');
  await page.getByRole('button', { name: 'Valider' }).click();

  return page;
}
