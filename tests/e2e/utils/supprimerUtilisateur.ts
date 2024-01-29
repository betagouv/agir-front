import { Page, chromium } from '@playwright/test';

export const supprimerUtilisateur: (page) => Promise<Page> = async page => {
  await page.goto('mon-compte/options-avancees');
  // cliquer sur le bouton supprimer mon compte
  const supprimer = page.getByRole('button', { name: 'Supprimer votre Compte' });

  await supprimer.click();
  // cliquer sur le bouton oui dans la modal
  const confirmer = page.getByRole('button', { name: 'Confirmer' });
  await confirmer.click();

  return page;
};
