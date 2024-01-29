import { test, expect, Page } from '@playwright/test';
import { creerUtilisateurConnecte } from './utils/creerUtilisateurConnecte';
import { supprimerUtilisateur } from './utils/supprimerUtilisateur';

let page: Page;

test.beforeAll(async () => {
  page = await creerUtilisateurConnecte();
});

test('doit afficher le bon title et titre', async () => {
  await page.goto('/kyc/1');
  await expect(page).toHaveTitle('Agir !');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Question pour mieux vous connaître');
});

test('reponse a un kyc doit afficher "Merci pour votre réponse"', async () => {
  await page.fill('#reponse', 'Ma réponse, lorem ipsum dolor');
  await page.getByRole('button', { name: 'Valider' }).click();
  expect(await page.textContent('#app > div > main > div > div > div > span.fr-display--xs.fr-mb-2w')).toBe(
    'Merci pour votre réponse !'
  );
  supprimerUtilisateur(page);
});
