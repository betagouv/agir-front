import { playAudit } from 'playwright-lighthouse';
import { test, chromium, Page, Browser } from '@playwright/test';

test.describe.configure({ mode: 'parallel', retries: 3, timeout: 25000 });
test.describe('Audit a11y - pages connectées', () => {
  let context: Browser;

  test.beforeAll(async () => {
    context = await chromium.launch({
      args: ['--remote-debugging-port=9224'],
    });
    const page = await context.newPage();

    await page.goto('/authentification');

    await page.getByRole('textbox', { name: 'Adresse électronique Format' }).fill(`${process.env.PLAYWRIGHT_EMAIL}`);
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill(`${process.env.PLAYWRIGHT_PASSWORD}`);
    await page.getByRole('button', { name: 'Se connecter' }).click({ force: true });
    await page.getByRole('textbox', { name: 'code' }).fill('999999');
    await page.getByRole('button', { name: 'Valider' }).click({ force: true });
    await page.waitForTimeout(1500);
  });

  test("Page d'accueil connectée", async () => {
    const page = await context.newPage();
    await page.goto('/agir/');
    await playAuditA11y(page);
  });

  test("Page catalogue d'aides", async () => {
    const page = await context.newPage();
    await page.goto('/vos-aides/');
    await playAuditA11y(page);
  });

  test('Page bibliothèque', async () => {
    const page = await context.newPage();
    await page.goto('/agir/bibliotheque');
    await playAuditA11y(page);
  });

  test('Page mon compte - informations', async () => {
    const page = await context.newPage();
    await page.goto('/mon-compte/');
    await playAuditA11y(page);
  });

  test('Page mon compte - mieux vous connaître', async () => {
    const page = await context.newPage();
    await page.goto('/mon-compte/mieux-vous-connaitre');
    await playAuditA11y(page);
  });

  test('Page mon compte - logement', async () => {
    const page = await context.newPage();
    await page.goto('/mon-compte/logement');
    await playAuditA11y(page);
  });

  test('Page mon compte - défis', async () => {
    const page = await context.newPage();
    await page.goto('/mon-compte/vos-actions');
    await playAuditA11y(page);
  });

  test('Page mon compte - options avancées', async () => {
    const page = await context.newPage();
    await page.goto('/mon-compte/options-avancees');
    await playAuditA11y(page);
  });

  test('Page service linky', async () => {
    const page = await context.newPage();
    await page.goto('/agir/services/linky');
    await playAuditA11y(page);
  });

  test('Page défi', async () => {
    const page = await context.newPage();
    await page.goto('/defi/18');
    await playAuditA11y(page);
  });

  test('Page mieux vous connaître', async () => {
    const page = await context.newPage();
    await page.goto('/mieux-vous-connaitre/KYC002');
    await playAuditA11y(page);
  });

  test('Page article', async () => {
    const page = await context.newPage();
    await page.goto('/article/comment-bien-choisir-son-sapin-/30');
    await playAuditA11y(page);
  });

  test('Page quiz', async () => {
    const page = await context.newPage();
    await page.goto('/agir/quiz/14');
    await playAuditA11y(page);
  });

  test('Page service - Près de chez nous', async () => {
    const page = await context.newPage();
    await page.goto('/service/pres-de-chez-nous');
    await playAuditA11y(page);
  });

  test('Page service - Fruits et légumes', async () => {
    const page = await context.newPage();
    await page.goto('/service/fruits-et-legumes');
    await playAuditA11y(page);
  });

  test('Page service - Recettes', async () => {
    const page = await context.newPage();
    await page.goto('/service/recettes');
    await playAuditA11y(page);
  });

  test('Page classement', async () => {
    const page = await context.newPage();
    await page.goto('/agir/classement');
    await playAuditA11y(page);
  });
});

const playAuditA11y = async (page: Page) => {
  await playAudit({
    page: page,
    port: 9224,
    thresholds: {
      accessibility: 100,
    },
  });
};
