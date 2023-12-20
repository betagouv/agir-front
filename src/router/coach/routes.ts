import Coach from '@/components/Coach.vue';
import PageCatalogueServices from '@/components/pages/PageCatalogueServices.vue';
import PageSuiviDuJour from '@/components/pages/PageSuiviDuJour.vue';
import PageQuiz from '@/components/pages/PageQuiz.vue';
import PagePrevisualisationQuiz from '@/components/pages/PagePrevisualisationQuiz.vue';
enum RouteCoachPath {
  COACH = '/coach/',
  SERVICES = 'services',
  SUIVI_DU_JOUR = 'suivi-du-jour',
  QUIZ = 'quiz',
  QUIZ_ID = ':id',
  QUIZ_PREVISUALISATION = 'previsualisation/:id',
}

export enum RouteCoachName {
  COACH = 'coach',
  SERVICES = 'services',
  SUIVI_DU_JOUR = 'suivi-du-jour',
  QUIZ = 'quiz',
  QUIZ_PREVISUALISATION = 'quiz-previsualisation',
}
const coachRoutes = [
  {
    path: RouteCoachPath.COACH,
    children: [
      {
        path: RouteCoachPath.COACH,
        name: RouteCoachName.COACH,
        component: Coach,
        meta: {
          title: 'Coach',
        },
      },
      {
        path: RouteCoachPath.SERVICES,
        name: RouteCoachName.SERVICES,
        component: PageCatalogueServices,
        meta: {
          title: 'Catalogue de services',
        },
      },
      {
        path: RouteCoachPath.SUIVI_DU_JOUR,
        name: RouteCoachName.SUIVI_DU_JOUR,
        component: PageSuiviDuJour,
        meta: {
          title: 'Suivi du jour',
        },
      },
      {
        path: RouteCoachPath.QUIZ,
        children: [
          {
            path: RouteCoachPath.QUIZ_ID,
            name: RouteCoachName.QUIZ,
            component: PageQuiz,
            meta: {
              title: 'Quiz',
            },
          },
          {
            path: RouteCoachPath.QUIZ_PREVISUALISATION,
            name: RouteCoachName.QUIZ_PREVISUALISATION,
            component: PagePrevisualisationQuiz,
            meta: {
              title: 'Quiz',
              estPublique: true,
            },
          },
        ],
      },
    ],
  },
];

export default coachRoutes;
