import { test, expect, Page } from '@playwright/test';
import { creerUtilisateurConnecte } from './utils/creerUtilisateurConnecte';
import supprimerUtilisateur from './utils/supprimerUtilisateur';

let page: Page;

test.beforeAll(async () => {
  page = await creerUtilisateurConnecte();
});

test.describe('Mission 1', async () => {
  test('Objectif 1 - récolter ses premiers points', async () => {
    await expect(page).toHaveTitle('Agir ! - Agir');
    const scoreInitial = parseInt(await page.innerText('.utilisateur .score'));
    expect(scoreInitial).toEqual(0);

    await expect(page.getByRole('heading', { name: 'Votre 1ère mission' })).toBeVisible();

    const bouton = page.getByRole('button', { name: 'Récolter vos' });
    await expect(bouton).toBeVisible();
    bouton.click({ force: true });

    await expect(bouton).toBeDisabled();

    const score1 = parseInt(await page.innerText('.utilisateur .score'));

    expect(score1).toBeGreaterThan(scoreInitial);
  });
  test('Objectif 2 - premier Quiz', async () => {
    // clique sur le deuxième objectif et lecture de la réponse du serveur pour tricher sur le quiz
    const [response] = await Promise.all([
      page.waitForResponse('**/api/quizzes/*'),
      page.locator('h3:text("À faire") ~ ul li:first-child a').click(),
    ]);

    const quizzData = await response.json();
    const questions = quizzData.data.attributes.questions;

    const exactTrueResponseTexts = questions.map(question => {
      const reponses = question.reponses;
      const exactTrueResponse = reponses.find(reponse => reponse.exact === true);
      return exactTrueResponse ? exactTrueResponse.reponse : null;
    });

    // vérifie que l'on est sur la page du quiz
    await expect(page).toHaveTitle('Agir ! - Quiz');
    // vérification que le contenu est bien chargé et affiché
    await expect(page.getByText('Quiz', { exact: true })).toBeVisible();

    // répondre correctement au quiz
    await page.getByText(exactTrueResponseTexts[0]).click();

    // valider le quiz
    const validation = page.getByRole('button', { name: 'Valider' });
    await expect(validation).toBeVisible();
    validation.click({ force: true });
  });
  test('vérifier "la bonne réponse"', async () => {
    const suivant = page.getByRole('button', { name: "Passer à l'étape suivante" });
    await expect(suivant).toBeVisible();
    suivant.click({ force: true });
  });
  test('Fin du quizz', async () => {
    // vérifier que l'on est bien sur la page de fin du quiz
    await expect(page.locator('#app').getByText('Bien joué !')).toBeVisible();
    // cliquer sur le bouton suivant
    const suivant = page.getByRole('link', { name: 'Continuer' });
    await expect(suivant).toBeVisible();
    suivant.click({ force: true });
  });

  test('récolte et bonus', async () => {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.utilisateur .score');
    await expect(page).toHaveTitle('Agir ! - Agir');
    const bouton = page.getByRole('button', { name: 'Récolter vos', disabled: false });
    bouton.click({ force: true });

    const decouvrir = page.getByRole('button', { name: 'Découvrir le bonus' });
    await expect(decouvrir).toBeVisible();
    decouvrir.click({ force: true });

    await expect(page.locator('#app').getByText('Accomplie')).toBeVisible();
    await page.getByRole('button', { name: 'Continuer' }).click({ force: true });
  });
  test('Mission 2', async () => {
    await expect(page.locator('#app').getByText('Mission 2')).toBeVisible();
    // lire un article et passer de niveau
  });
});

test.afterAll(async () => {
  await supprimerUtilisateur(page);
});
