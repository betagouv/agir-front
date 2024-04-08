import { test, expect, Page } from '@playwright/test';
import { creerUtilisateurConnecte } from './utils/creerUtilisateurConnecte';
import supprimerUtilisateur from './utils/supprimerUtilisateur';

let page: Page;

test.beforeAll(async () => {
  page = await creerUtilisateurConnecte();
});

test.describe('kyc', () => {
  test('doit afficher le bon title et titre', async () => {
    await expect(page).toHaveTitle('Agir ! - Agir');
    await page.goto('/mieux-vous-connaitre/KYC001');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Question pour mieux vous connaître');
    await page.getByText('🥦 Alimentation').click();
    await page.getByRole('button', { name: 'Valider' }).click();
  });
  test('doit afficher le remerciement', async () => {
    expect(await page.textContent('#app > div > main > div > div > div > span.fr-display--xs.fr-mb-2w')).toBe(
      'Merci pour votre réponse !',
    );
    await page.click('text="Continuer"');
    await expect(page).toHaveTitle('Agir ! - Agir');
  });
});

test.afterAll(async () => {
  await supprimerUtilisateur(page);
});
