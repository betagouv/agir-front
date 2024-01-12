import Coach from '@/components/Coach.vue';
import PageCatalogueServices from '@/components/pages/PageCatalogueServices.vue';
import PageSuiviDuJour from '@/components/pages/PageSuiviDuJour.vue';
import PageQuiz from '@/components/pages/PageQuiz.vue';
import PagePrevisualisationQuiz from '@/components/pages/PagePrevisualisationQuiz.vue';
import { RouteRecordRaw } from 'vue-router';
import { RouteCoachName } from '@/router/coach/routeCoachName';

enum RouteCoachPath {
  COACH = '/agir/',
  SERVICES = 'services',
  SUIVI_DU_JOUR = 'suivi-du-jour',
  QUIZ = 'quiz',
  QUIZ_ID = ':id',
  QUIZ_PREVISUALISATION = 'previsualisation/:id',
}

const coachRoutes: RouteRecordRaw[] = [
  {
    path: RouteCoachPath.COACH,
    children: [
      {
        path: RouteCoachPath.COACH,
        name: RouteCoachName.COACH,
        component: Coach,
        meta: {
          title: 'Agir',
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
