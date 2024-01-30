import { test, expect, Page } from '@playwright/test';
import { creerUtilisateurConnecte } from './utils/creerUtilisateurConnecte';
import supprimerUtilisateur from './utils/supprimerUtilisateur';

let page: Page;

test.beforeAll(async () => {});
test.describe('kyc', () => {
  test('doit afficher le bon title et titre', async () => {
    page = await creerUtilisateurConnecte();
    await expect(page).toHaveTitle('Agir ! - Agir');
    await page.goto('/kyc/1');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Question pour mieux vous connaître');
    await page.fill('#reponse', 'Ma réponse, lorem ipsum dolor');
    await page.getByRole('button', { name: 'Valider' }).click();
    expect(await page.textContent('#app > div > main > div > div > div > span.fr-display--xs.fr-mb-2w')).toBe(
      'Merci pour votre réponse !'
    );
    await page.click('text="Continuer"');
    await expect(page).toHaveTitle('Agir ! - Agir');
    await supprimerUtilisateur(page);
  });
});
