import { test, expect, Page, Locator } from '@playwright/test';
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

    await recolterPoints(page);

    const score1 = parseInt(await page.innerText('.utilisateur .score'));
    expect(score1).toBeGreaterThan(scoreInitial);
  });

  test('Objectif 2 - premier quizz', async () => {
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { name: 'Votre 1ère mission' })).toBeVisible();
    await cliqueTodo(page);
  });

  test('récolte et bonus', async () => {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.utilisateur .score');
    await expect(page).toHaveTitle('Agir ! - Agir');
    recolterPoints(page);

    const decouvrir = page.getByRole('button', { name: 'Découvrir le bonus' });
    await expect(decouvrir).toBeVisible();
    decouvrir.click({ force: true });

    await expect(page.locator('#app').getByText('Accomplie')).toBeVisible();
    await page.getByRole('button', { name: 'Continuer' }).click({ force: true });
  });
});
test.describe('Mission 2', async () => {
  test('Mission 2 - début', async () => {
    await expect(page.locator('#app').getByText('Mission 2')).toBeVisible();
    await cliqueTodo(page);
    await expect(page.locator('#app').getByText('Mission 2')).toBeVisible();
    await recolterPoints(page);
    await cliqueTodo(page);
    await expect(page.locator('#app').getByText('Mission 2')).toBeVisible();
    await recolterPoints(page);
  });
});

test.afterAll(async () => {
  await supprimerUtilisateur(page);
});

async function recolterPoints(page: Page) {
  const niveauInitial = parseInt(await page.innerText('.utilisateur .niveau'));
  for (const bouton of await page.getByRole('button', { name: 'Récolter vos' }).all()) {
    await expect(bouton).toBeVisible();
    await bouton.click({ force: true });
    await expect(bouton).toBeDisabled();
    if (await page.locator('dialog#passageDeNiveau').isVisible()) {
      await checkPassageNiveau(page);
      const nouveauNiveau = parseInt(await page.innerText('.utilisateur .niveau'));
      expect(nouveauNiveau).toBeGreaterThan(niveauInitial);
    }
  }
}

async function checkPassageNiveau(page: Page) {
  await page.locator('dialog#passageDeNiveau').getByText('Fermer').click({ force: true });
}

async function cliqueTodo(page: Page) {
  const nextTodo = await page.locator('h3:text("À faire") ~ ul li:first-child a');
  const nextTodoUrl = (await nextTodo.getAttribute('href')) || '';
  if (nextTodoUrl.includes('article')) {
    await lireArticle(nextTodo, page);
  } else if (nextTodoUrl.includes('quiz')) {
    await repondreQuiz(nextTodo, page);
  }
}

async function lireArticle(linkElement: Locator, page: Page): Promise<Page> {
  linkElement.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('.cms__content');
  await page.getByText("Revenir à l'accueil").click();
  await page.waitForLoadState('domcontentloaded');

  return page;
}
async function repondreQuiz(linkElement: Locator, page: Page): Promise<Page> {
  // clique sur le deuxième objectif et lecture de la réponse du serveur pour tricher sur le quiz
  const [response] = await Promise.all([page.waitForResponse('**/api/quizzes/*'), linkElement.click()]);

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

  const suivant = page.getByRole('button', { name: "Passer à l'étape suivante" });
  await expect(suivant).toBeVisible();
  suivant.click({ force: true });
  // vérifier que l'on est bien sur la page de fin du quiz
  await expect(page.locator('#app').getByText('Bien joué !')).toBeVisible();
  // cliquer sur le bouton suivant
  const continuer = page.getByRole('link', { name: 'Continuer' });
  await expect(continuer).toBeVisible();
  continuer.click({ force: true });

  return page;
}

/*test('Objectif 2 - premier Quiz', async () => {
    // clique sur le deuxième objectif et lecture de la réponse du serveur pour tricher sur le quiz
    const [response] = await Promise.all([

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
  });*/
