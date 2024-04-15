import { playAudit } from 'playwright-lighthouse';
import { test, chromium, Page, Route } from '@playwright/test';
import { InjectUtilisateur } from './../utils/injectUtilisateur';
import { InjectService } from './../utils/injectService';
import { InjectGamification } from './../utils/injectGamification';
import { InjectRecommandations } from './../utils/injectRecommandations';
import { InjectTodo } from './../utils/injectTodo';

test.describe('Accueil connecté - audit ', () => {
  test('open browser', async () => {
    const browser = await chromium.launch({
      args: ['--remote-debugging-port=9222'],
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');

    const injectUtilisateur = new InjectUtilisateur();
    const utilisateurPourLocalStorage = injectUtilisateur.avecUtilisateurPremiereConnexion();

    await page.evaluate(utilisateur => {
      localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
    }, utilisateurPourLocalStorage);

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/services`, route => {
      fullFillServiceVierge(route);
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/recommandations`, route => {
      fullFillRecommandationsVierge(route);
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/gamification`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(new InjectGamification().avecPointsTargetInNiveau(50).build()),
      });
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/profile`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/todo`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          new InjectTodo().avecTodo({
            numero_todo: 0,
            points_todo: 0,
            titre: 'Première mission !',
            todo: [
              {
                titre: 'Titre de ma mission à faire',
                thematiques: ['logement'],
                type: 'article',
                content_id: 'id',
                service_id: 'serviceId',
                id: 'id',
                points: 10,
                sont_points_en_poche: false,
                progression: {
                  current: 0,
                  target: 1,
                },
              },
            ],
            done: [
              {
                titre: 'Titre de ma mission terminée',
                thematiques: ['logement'],
                type: 'todoType',
                content_id: 'id1',
                id: 'id1',
                points: 10,
                sont_points_en_poche: false,
                progression: {
                  current: 1,
                  target: 1,
                },
              },
            ],
            is_last: false,
          }),
        ),
      });
    });

    await page.goto('/agir');
    await page.goto('http://localhost:9222/agir');

    await page.goto('/agir');

    await playAudit({
      page: page,
      port: 9222,
      thresholds: {
        accessibility: 50,
        'best-practices': 50,
      },
      reports: {
        formats: {
          json: false,
          html: true,
        },
      },
    });

    await browser.close();
  });
});

const fullFillServiceVierge = (route: Route) => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(new InjectService().vierge()),
  });
};

const fullFillRecommandationsVierge = (route: Route) => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(new InjectRecommandations().vierge()),
  });
};

const postfullFillGagnerPointReponseOk = (route: Route, id: string) => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: 'Ok',
  });
};
