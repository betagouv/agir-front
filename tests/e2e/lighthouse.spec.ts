import { playAudit } from 'playwright-lighthouse';
import { test, chromium, BrowserContext, Page } from '@playwright/test';
import fs from 'fs';

test.describe('Audit a11y - pages non connectées', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async () => {
    context = await chromium.launchPersistentContext('./tmp', {
      args: ['--remote-debugging-port=9222'],
    });
    page = await context.newPage();
  });

  test("Page d'accueil", async () => {
    await page.goto('/');
    await playAuditA11y(page);
  });

  test('Page de connexion', async () => {
    await page.goto('/authentification');
    await playAuditA11y(page);
  });

  test('Page CGU', async () => {
    await page.goto('/cgu');
    await playAuditA11y(page);
  });

  test.afterAll(async () => {
    await context.close();
    fs.rmSync('./tmp', { recursive: true, force: true });
  });
});

test.describe('Audit a11y - pages connectées', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async () => {
    context = await chromium.launchPersistentContext('./tmp', {
      args: ['--remote-debugging-port=9222'],
    });
    page = await context.newPage();

    await page.goto('/authentification');

    await page.getByRole('textbox', { name: 'Adresse électronique Format' }).fill(`${process.env.PLAYWRIGHT_EMAIL}`);
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill(`${process.env.PLAYWRIGHT_PASSWORD}`);
    await page.getByRole('button', { name: 'Se connecter' }).click({ force: true });
    await page.waitForTimeout(1500);
  });

  test("Page d'accueil connectée", async () => {
    await playAuditA11y(page);
  });

  test('Page catalogue de service', async () => {
    await page.goto('/agir/services');
    await playAuditA11y(page);
  });

  test("Page catalogue d'aides", async () => {
    await page.goto('/vos-aides/');
    await playAuditA11y(page);
  });

  test('Page bibliothèque', async () => {
    await page.goto('/agir/bibliotheque');
    await playAuditA11y(page);
  });

  test('Page mon compte - informations', async () => {
    await page.goto('/mon-compte/');
    await playAuditA11y(page);
  });

  test('Page mon compte - mieux vous connaître', async () => {
    await page.goto('/mon-compte/mieux-vous-connaitre');
    await playAuditA11y(page);
  });

  test('Page mon compte - logement', async () => {
    await page.goto('/mon-compte/logement');
    await playAuditA11y(page);
  });

  test('Page mon compte - défis', async () => {
    await page.goto('/mon-compte/vos-actions');
    await playAuditA11y(page);
  });

  test('Page mon compte - options avancées', async () => {
    await page.goto('/mon-compte/options-avancees');
    await playAuditA11y(page);
  });

  test('Page service linky', async () => {
    await page.goto('/agir/services/linky');
    await playAuditA11y(page);
  });

  test('Page défi', async () => {
    await page.goto('/defi/18');
    await playAuditA11y(page);
  });

  test('Page mieux vous connaître', async () => {
    await page.goto('/mieux-vous-connaitre/KYC002');
    await playAuditA11y(page);
  });

  test('Page article', async () => {
    await page.goto('/article/comment-bien-choisir-son-sapin-/30');
    await playAuditA11y(page);
  });

  test('Page quiz', async () => {
    await page.goto('/agir/quiz/14');
    await playAuditA11y(page);
  });

  test.afterAll(async () => {
    await context.close();
    fs.rmSync('./tmp', { recursive: true, force: true });
  });
});

const playAuditA11y = async (page: Page) => {
  await playAudit({
    page: page,
    port: 9222,
    thresholds: {
      accessibility: 100,
    },
  });
};
