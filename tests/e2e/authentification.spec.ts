import { test, expect, chromium } from '@playwright/test';

test('has title', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.route('https://agir-back-dev.osc-fr1.scalingo.io/utilisateurs/login', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        utilisateur: {
          id: 'wojtek',
          nom: 'WOJCIK',
          prenom: 'Wojtek',
          email: 'ww@w.com',
          code_postal: '91120',
          commune: 'PALAISEAU',
          revenu_fiscal: null,
          nombre_de_parts_fiscales: 2.5,
          quizzProfile: {
            climat: {
              level: 1,
              isCompleted: false,
            },
            dechet: {
              level: 1,
              isCompleted: false,
            },
            loisir: {
              level: 1,
              isCompleted: false,
            },
            logement: {
              level: 2,
              isCompleted: false,
            },
            transport: {
              level: 1,
              isCompleted: false,
            },
            alimentation: {
              level: 1,
              isCompleted: false,
            },
            consommation: {
              level: 1,
              isCompleted: false,
            },
          },
          created_at: '2023-12-20T16:28:07.766Z',
          fonctionnalites_debloquees: ['aides', 'services', 'recommandations'],
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dGlsaXNhdGV1cklkIjoid29qdGVrIiwiaWF0IjoxNzAzMTU1MzM2LCJleHAiOjE3MDU3NDczMzZ9.bJOxx98NUoYDq3e0mXKgv-YjAq-ZfSRc4S05bgwvKdA',
      }),
    });
  });

  await page.goto('/authentification');

  await page.fill('#email', 'exemple@domaine.com');
  await page.fill('#password-input', '');

  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForURL('/coach/');

  await expect(page).toHaveTitle('Agir ! - Coach');
});
