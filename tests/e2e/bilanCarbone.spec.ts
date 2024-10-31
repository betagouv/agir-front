import { test, expect, chromium, Page } from '@playwright/test';
import { InjectUtilisateur } from './utils/injectUtilisateur';
import { InjectGamification } from './utils/injectGamification';
import { RouteCoachPath } from '@/router/coach/routes';

let page: Page;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('/');

  const injectUtilisateur = new InjectUtilisateur();
  const utilisateurPourLocalStorage = injectUtilisateur.avecUtilisateurPremiereConnexion();

  await page.evaluate(utilisateur => {
    localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
  }, utilisateurPourLocalStorage);

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/gamification`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(new InjectGamification().avecPointsTargetInNiveau(50).avecPoints(50).build()),
    });
  });
});

test.describe('Bilan carbone', () => {
  test.describe('quand le bilan carbone est en cours de chargement', async () => {
    test('doit afficher le meta titre associé, le breadcrumb et le loader', async () => {
      await page.route(`${process.env.VITE_API_URL}/utilisateur/dorian/bilans/last`, async _route => {});
      await page.goto('/bilan-environnemental');

      await expect(page).toHaveTitle("J'agis - Mon bilan environnemental");

      const breadcrumb = page.getByRole('navigation', { name: 'Vous êtes ici :', exact: true });
      await expect(breadcrumb).toBeVisible();

      const elementsBreadcrumb = await breadcrumb.getByRole('list').getByRole('listitem').all();
      expect(elementsBreadcrumb).toHaveLength(2);

      const lienAccueil = elementsBreadcrumb[0].getByRole('link', { name: 'Accueil', exact: true });
      await expect(lienAccueil).toBeVisible();
      await expect(lienAccueil).toHaveAttribute('href', RouteCoachPath.COACH);

      const lienCourant = elementsBreadcrumb[1].getByText('Mon bilan environnemental');
      await expect(lienCourant).toBeVisible();
      await expect(lienCourant).toHaveAttribute('aria-current', 'page');

      const loader = page.getByText('Chargement en cours ...', { exact: true });
      await expect(loader).toHaveRole('paragraph');
      await expect(loader).toBeVisible();

      const titrePrincipal = page.getByRole('heading', {
        level: 1,
        name: 'Estimez mon bilan environnemental',
        exact: true,
      });
      await expect(titrePrincipal).not.toBeVisible();
    });
  });

  test.describe('quand le bilan carbone a rencontré un problème de chargement', async () => {
    test("doit afficher un message d'erreur", async () => {
      await page.route(`${process.env.VITE_API_URL}/utilisateur/dorian/bilans/last`, route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Erreur interne du serveur' }),
        });
      });

      await page.goto('/bilan-environnemental');

      await expect(page).toHaveTitle("J'agis - Mon bilan environnemental");

      const breadcrumb = page.getByRole('navigation', { name: 'Vous êtes ici :', exact: true });
      await expect(breadcrumb).toBeVisible();

      const elementsBreadcrumb = await breadcrumb.getByRole('list').getByRole('listitem').all();
      expect(elementsBreadcrumb).toHaveLength(2);

      const lienAccueil = elementsBreadcrumb[0].getByRole('link', { name: 'Accueil', exact: true });
      await expect(lienAccueil).toBeVisible();
      await expect(lienAccueil).toHaveAttribute('href', RouteCoachPath.COACH);

      const lienCourant = elementsBreadcrumb[1].getByText('Mon bilan environnemental');
      await expect(lienCourant).toBeVisible();
      await expect(lienCourant).toHaveAttribute('aria-current', 'page');

      const messageErreur = page.getByText('Problème de chargement des données', { exact: true });
      await expect(messageErreur).toHaveRole('paragraph');
      await expect(messageErreur).toBeVisible();

      const titrePrincipal = page.getByRole('heading', {
        level: 1,
        name: 'Estimez mon bilan environnemental',
        exact: true,
      });
      await expect(titrePrincipal).not.toBeVisible();
    });
  });

  test.describe('quand le bilan carbone a fini de charger', async () => {
    test('doit afficher la page correctement', async () => {
      await page.route(`${process.env.VITE_API_URL}/utilisateur/dorian/bilans/last`, route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            mini_bilan: {
              impact_transport: 'fort',
              impact_alimentation: 'tres_fort',
              impact_logement: 'fort',
              impact_consommation: 'fort',
            },
            bilan_complet: {
              impact_kg_annee: 7040.79948610642,
              top_3: [
                {
                  label: 'Viandes',
                  pourcentage: 32,
                  pourcentage_categorie: 70,
                  impact_kg_annee: 2233.296,
                  emoji: '🥩',
                },
                {
                  label: 'Construction',
                  pourcentage: 7,
                  pourcentage_categorie: 69,
                  impact_kg_annee: 469.948182921765,
                  emoji: '🧱',
                },
                {
                  label: 'Textile',
                  pourcentage: 7,
                  pourcentage_categorie: 33,
                  impact_kg_annee: 486.13999999999993,
                  emoji: '👕',
                },
              ],
              impact_univers: [
                {
                  pourcentage: 45,
                  univers: 'alimentation',
                  univers_label: 'Me nourrir',
                  impact_kg_annee: 3168.7751821,
                  details: [
                    {
                      label: 'Viandes',
                      pourcentage: 32,
                      pourcentage_categorie: 70,
                      impact_kg_annee: 2233.296,
                      emoji: '🥩',
                    },
                    {
                      label: 'Boissons',
                      pourcentage: 3,
                      pourcentage_categorie: 7,
                      impact_kg_annee: 235.8398,
                      emoji: '🥤',
                    },
                    {
                      label: 'Poissons',
                      pourcentage: 3,
                      pourcentage_categorie: 6,
                      impact_kg_annee: 182,
                      emoji: '🐟',
                    },
                    {
                      label: 'Petit déjeuner',
                      pourcentage: 2,
                      pourcentage_categorie: 4,
                      impact_kg_annee: 113.15,
                      emoji: '🥐',
                    },
                    {
                      label: 'Fruits & Légumes',
                      pourcentage: 0,
                      pourcentage_categorie: 0,
                      impact_kg_annee: 0,
                      emoji: '🥦',
                    },
                  ],
                  emoji: '🍴',
                },
                {
                  pourcentage: 21,
                  univers: 'consommation',
                  univers_label: 'Mes achats',
                  impact_kg_annee: 1473.5466053414032,
                  details: [
                    {
                      label: 'Textile',
                      pourcentage: 7,
                      pourcentage_categorie: 33,
                      impact_kg_annee: 486.13999999999993,
                      emoji: '👕',
                    },
                    {
                      label: 'Ameublement',
                      pourcentage: 4,
                      pourcentage_categorie: 21,
                      impact_kg_annee: 307.4386666666667,
                      emoji: '🛋️',
                    },
                    {
                      label: 'Numérique',
                      pourcentage: 2,
                      pourcentage_categorie: 12,
                      impact_kg_annee: 175.46302466666666,
                      emoji: '📺',
                    },
                    {
                      label: 'Autres produits',
                      pourcentage: 2,
                      pourcentage_categorie: 8,
                      impact_kg_annee: 123.01123396773932,
                      emoji: '📦',
                    },
                    {
                      label: 'Loisirs',
                      pourcentage: 2,
                      pourcentage_categorie: 8,
                      impact_kg_annee: 118.99921707433923,
                      emoji: '🎭',
                    },
                    {
                      label: 'Animaux',
                      pourcentage: 2,
                      pourcentage_categorie: 8,
                      impact_kg_annee: 116.8584629659916,
                      emoji: '🐶',
                    },
                    {
                      label: 'Electroménager',
                      pourcentage: 2,
                      pourcentage_categorie: 8,
                      impact_kg_annee: 112.27000000000001,
                      emoji: '🔌',
                    },
                    {
                      label: 'Tabac',
                      pourcentage: 0,
                      pourcentage_categorie: 0,
                      impact_kg_annee: 7.28,
                      emoji: '🚬',
                    },
                  ],
                  emoji: '📦',
                },
                {
                  pourcentage: 21,
                  univers: 'services_societaux',
                  univers_label: 'Services sociétaux',
                  impact_kg_annee: 1450.9052263863641,
                  details: [
                    {
                      label: 'Services publics',
                      pourcentage: 18,
                      pourcentage_categorie: 87,
                      impact_kg_annee: 1259.4428717769142,
                      emoji: '🏛',
                    },
                    {
                      label: 'Services marchands',
                      pourcentage: 3,
                      pourcentage_categorie: 13,
                      impact_kg_annee: 191.4623546094499,
                      emoji: '✉️',
                    },
                  ],
                  emoji: '🏛️',
                },
                {
                  pourcentage: 10,
                  univers: 'logement',
                  univers_label: 'Me loger',
                  impact_kg_annee: 685.6387708866498,
                  details: [
                    {
                      label: 'Construction',
                      pourcentage: 7,
                      pourcentage_categorie: 69,
                      impact_kg_annee: 469.948182921765,
                      emoji: '🧱',
                    },
                    {
                      label: 'Climatisation',
                      pourcentage: 2,
                      pourcentage_categorie: 20,
                      impact_kg_annee: 138.9877704,
                      emoji: '❄️',
                    },
                    {
                      label: 'Extérieur',
                      pourcentage: 1,
                      pourcentage_categorie: 7,
                      impact_kg_annee: 47.1912715,
                      emoji: '☘️',
                    },
                    {
                      label: 'Electricité',
                      pourcentage: 0,
                      pourcentage_categorie: 4,
                      impact_kg_annee: 29.51154606488484,
                      emoji: '⚡',
                    },
                    {
                      label: 'Chauffage',
                      pourcentage: 0,
                      pourcentage_categorie: 0,
                      impact_kg_annee: 0,
                      emoji: '🔥',
                    },
                    {
                      label: 'Piscine',
                      pourcentage: 0,
                      pourcentage_categorie: 0,
                      impact_kg_annee: 0,
                      emoji: '🏊',
                    },
                    {
                      label: 'Vacances',
                      pourcentage: 0,
                      pourcentage_categorie: 0,
                      impact_kg_annee: 0,
                      emoji: '🏖',
                    },
                  ],
                  emoji: '🏠',
                },
                {
                  pourcentage: 4,
                  univers: 'transport',
                  univers_label: 'Mes déplacements',
                  impact_kg_annee: 261.9337013920033,
                  details: [
                    {
                      label: 'Avion',
                      pourcentage: 3,
                      pourcentage_categorie: 79,
                      impact_kg_annee: 207.43529411764706,
                      emoji: '✈️',
                    },
                    {
                      label: 'Transports en commun',
                      pourcentage: 0,
                      pourcentage_categorie: 13,
                      impact_kg_annee: 33.7904763482199,
                      emoji: '🚌',
                    },
                    {
                      label: 'Ferry',
                      pourcentage: 0,
                      pourcentage_categorie: 5,
                      impact_kg_annee: 11.88805068661542,
                      emoji: '⛴',
                    },
                    {
                      label: 'Train',
                      pourcentage: 0,
                      pourcentage_categorie: 3,
                      impact_kg_annee: 8.8198802395209,
                      emoji: '🚋',
                    },
                    {
                      label: 'Voiture',
                      pourcentage: 0,
                      pourcentage_categorie: 0,
                      impact_kg_annee: 0,
                      emoji: '🚘️',
                    },
                    {
                      label: '2 roues',
                      pourcentage: 0,
                      pourcentage_categorie: 0,
                      impact_kg_annee: 0,
                      emoji: '🛵',
                    },
                    {
                      label: 'Mobilité douce',
                      pourcentage: 0,
                      pourcentage_categorie: 0,
                      impact_kg_annee: 0,
                      emoji: '🚲',
                    },
                    {
                      label: 'Vacances',
                      pourcentage: 0,
                      pourcentage_categorie: 0,
                      impact_kg_annee: 0,
                      emoji: '🏖️',
                    },
                  ],
                  emoji: '🚦',
                },
              ],
            },
            bilan_synthese: {
              impact_transport: 'fort',
              impact_alimentation: 'tres_fort',
              impact_logement: 'fort',
              impact_consommation: 'fort',
              pourcentage_completion_totale: 58,
              liens_bilans_univers: [
                {
                  id_enchainement_kyc: 'ENCHAINEMENT_KYC_bilan_transport',
                  image_url: 'https://res.cloudinary.com/dq023imd8/image/upload/v1728466903/Mobilite_df75aefd09.svg',
                  nombre_total_question: 9,
                  pourcentage_progression: 100,
                  univers: 'transport',
                  univers_label: 'Mes déplacements',
                  temps_minutes: 5,
                },
                {
                  id_enchainement_kyc: 'ENCHAINEMENT_KYC_bilan_alimentation',
                  image_url: 'https://res.cloudinary.com/dq023imd8/image/upload/v1728466523/cuisine_da54797693.svg',
                  nombre_total_question: 6,
                  pourcentage_progression: 33,
                  univers: 'alimentation',
                  univers_label: 'Me nourrir',
                  temps_minutes: 3,
                },
                {
                  id_enchainement_kyc: 'ENCHAINEMENT_KYC_bilan_consommation',
                  image_url: 'https://res.cloudinary.com/dq023imd8/image/upload/v1728468852/conso_7522b1950d.svg',
                  nombre_total_question: 8,
                  pourcentage_progression: 13,
                  univers: 'consommation',
                  univers_label: 'Mes achats',
                  temps_minutes: 10,
                },
                {
                  id_enchainement_kyc: 'ENCHAINEMENT_KYC_bilan_logement',
                  image_url: 'https://res.cloudinary.com/dq023imd8/image/upload/v1728468978/maison_80242d91f3.svg',
                  nombre_total_question: 8,
                  pourcentage_progression: 38,
                  univers: 'logement',
                  univers_label: 'Me loger',
                  temps_minutes: 9,
                },
              ],
              mini_bilan_dispo: true,
              bilan_complet_dispo: false,
            },
          }),
        });
      });

      await page.goto('/bilan-environnemental');

      const titrePrincipal = page.getByRole('heading', {
        level: 1,
        name: 'Estimez mon bilan environnemental',
        exact: true,
      });
      await expect(titrePrincipal).toBeVisible();

      const titreBilanPartiel = page.getByRole('heading', { level: 2, name: 'Ma première estimation', exact: true });
      await expect(titreBilanPartiel).toBeVisible();

      const titreAffinerBilan = page.getByRole('heading', { level: 2, name: 'Affinez mon estimation', exact: true });
      await expect(titreAffinerBilan).toBeVisible();

      const titreQuestionsFAQ = page.getByRole('heading', { level: 2, name: 'Une question ?', exact: true });
      await expect(titreQuestionsFAQ).toBeVisible();
    });
  });
});
