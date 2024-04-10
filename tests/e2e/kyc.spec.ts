import { test, expect, chromium, Page } from '@playwright/test';
import { InjectService } from './utils/injectService';
import { InjectUtilisateur } from './utils/injectUtilisateur';
import { InjectRecommandations } from './utils/injectRecommandations';
import { InjectTodo } from './utils/injectTodo';
import { InjectKYC } from './utils/injectKYC';
import { InjectGamification } from './utils/injectGamification';
import { ThematiqueQuestion } from '@/kyc/recupererQuestionUsecase';

let page: Page;

test.beforeAll(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('/');

  const injectUtilisateur = new InjectUtilisateur();
  const utilisateurPourLocalStorage = injectUtilisateur.avecUtilisateurPremiereConnexion();

  await page.evaluate(utilisateur => {
    localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
  }, utilisateurPourLocalStorage);

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/services`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(new InjectService().avecServices([])),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/gamification`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(new InjectGamification().vierge()),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/recommandations`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(new InjectRecommandations().vierge()),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/todo`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(new InjectTodo().vierge()),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/questionsKYC/KYC001`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(
        new InjectKYC().avecKYC({
          id: 'KYC001',
          question: 'Sur quel(s) sujet(s) souhaitez-vous en savoir plus pour réduire votre impact environnemental ?',
          reponse: ['🥦 Alimentation'],
          categorie: 'mission',
          points: 5,
          type: 'choix_multiple',
          reponses_possibles: [
            '🥦 Alimentation',
            '☀️ Climat et Environnement',
            '🛒 Consommation durable',
            '🗑️ Déchets',
            '🏡 Logement',
            '⚽ Loisirs (vacances, sport,...)',
            '🚗 Transports',
            'Aucun / Je ne sais pas',
          ],
          thematique: ThematiqueQuestion.AUTRE,
        }),
      ),
    });
  });
});

test.describe('kyc', () => {
  test('doit afficher le bon title et titre', async () => {
    await page.goto('/mieux-vous-connaitre/KYC001');

    await expect(page).toHaveTitle('Agir ! - Mieux vous connaître');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Question pour mieux vous connaître');
  });

  test('doit afficher le remerciement', async () => {
    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/questionsKYC/KYC001`, route => {
      route.fulfill({
        status: 201,
      });
    });

    await page.getByRole('checkbox', { name: '🥦 Alimentation' }).check();
    await page.getByRole('button', { name: 'Valider' }).click();

    expect(await page.getByText('Merci pour votre réponse !!!')).toBeDefined();

    await page.getByRole('link', { name: 'Continuer' }).click();

    await expect(page).toHaveTitle('Agir ! - Agir');
  });
});
