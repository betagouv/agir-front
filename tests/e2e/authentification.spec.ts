import { test, expect } from '@playwright/test';
import { creerUtilisateurConnecte } from './utils/creerUtilisateurConnecte';
import { supprimerUtilisateur } from './utils/supprimerUtilisateur';

test('has title', async () => {
  const page = await creerUtilisateurConnecte();

  await expect(page).toHaveTitle('Agir ! - Agir');
  await supprimerUtilisateur(page);
});
