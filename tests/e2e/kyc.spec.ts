import { test, expect, Page } from '@playwright/test';
import { connecterUtilisateur } from './utils/connecterUtilisateurs';

let page: Page;

test.beforeAll(async () => {
  page = await connecterUtilisateur();

  await page.route(`${process.env.VITE_API_URL}/kyc/1`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: '1',
        question: 'Comment avez vous connu le service ?',
        categorie: 'service',
        points: 10,
        type: 'libre',
        is_NGC: false,
      }),
    });
  });

  await page.goto('/kyc/1');
});

test('doit afficher le bon title et titre', async () => {
  await expect(page).toHaveTitle('Agir !');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Question pour mieux vous connaître');
});

test('reponse a un kyc doit afficher "Merci pour votre réponse"', async () => {
  await page.fill('#reponse', 'Ma réponse, lorem ipsum dolor');
  await page.getByRole('button', { name: 'Valider' }).click();

  expect(await page.textContent('#app > div > main > div > div > div > span.fr-display--xs.fr-mb-2w')).toBe(
    'Merci pour votre réponse !'
  );
});
