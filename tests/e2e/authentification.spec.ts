import { test, expect, Page } from '@playwright/test';
import { creerUtilisateurConnecte } from './utils/creerUtilisateurConnecte';
import supprimerUtilisateur from './utils/supprimerUtilisateur';

let page: Page;
test.beforeAll(async () => {
  page = await creerUtilisateurConnecte();
});

test('has title', async () => {
  await expect(page).toHaveTitle('Agir ! - Agir');
});

test.afterAll(async () => {
  await supprimerUtilisateur(page);
});
