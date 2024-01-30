import { Page } from '@playwright/test';

async function supprimerUtilisateur(page: Page): Promise<Page> {
  await page.goto('/mon-compte/options-avancees');
  // cliquer sur le bouton supprimer mon compte
  const supprimer = page.getByRole('button', { name: 'Supprimer votre Compte' });

  await supprimer.click();
  // cliquer sur le bouton oui dans la modal
  const confirmer = page.getByRole('button', { name: 'Confirmer' });
  await confirmer.click();

  return page;
}

export default supprimerUtilisateur;
