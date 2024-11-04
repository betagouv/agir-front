import { RouteRecordRaw } from 'vue-router';
const PageQuiz = () => import('@/components/pages/PageQuiz.vue');
const PagePrevisualisationQuiz = () => import('@/components/pages/PagePrevisualisationQuiz.vue');

export enum RouteQuizName {
  QUIZ = 'quiz',
  QUIZ_THEMATIQUE = 'quiz-thematique',
}

export enum RouteQuizPath {
  QUIZ = '/quiz/',
  QUIZ_PREVISUALISATION = '/quiz/previsualisation/:id',
}
const quizRoutes: RouteRecordRaw[] = [
  {
    path: RouteQuizPath.QUIZ_PREVISUALISATION,
    name: RouteQuizPath.QUIZ_PREVISUALISATION,
    component: PagePrevisualisationQuiz,
    meta: {
      title: 'Quiz',
      estPublique: true,
    },
  },
  {
    path: `/${RouteQuizPath.QUIZ}/:id`,
    name: RouteQuizName.QUIZ,
    component: PageQuiz,
    meta: {
      title: 'Quiz',
    },
  },
  {
    path: `/${RouteQuizPath.QUIZ}/:universId/:missionId/:id`,
    name: RouteQuizName.QUIZ_THEMATIQUE,
    component: PageQuiz,
    meta: {
      title: 'Mieux vous connaître',
    },
  },
];

export default quizRoutes;
