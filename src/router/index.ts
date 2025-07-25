import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import actionsRoutes from '@/router/actions/routes';
import aidesRoutes from '@/router/aides/routes';
import articlesRoutes from '@/router/articles/routes';
import bilanCarboneRoutes from '@/router/bilanCarbone/routes';
import classementRoutes from '@/router/classement/routes';
import { RouteCoachName } from '@/router/coach/routeCoachName';
import coachRoutes from '@/router/coach/routes';
import collectiviteRoutes from '@/router/collectivites/routes';
import compteRoutes from '@/router/compte/routes';
import conformiteRoutes from '@/router/conformite/routes';
import kycRoutes from '@/router/kyc/routes';
import personnalisationRoutes from '@/router/personnalisation/routes';
import quizRoutes from '@/router/quiz/routes';
import resetRoutes from '@/router/reset/routes';
import serviceRoutes from '@/router/services/routes';
import thematiqueRoutes from '@/router/thematiques/routes';
import { utilisateurStore } from '@/store/utilisateur';

const MagicLinkCallBack = () => import('@/components/pages/PageMagicLinkCallback.vue');
const Authentification = () => import('@/components/Authentification.vue');
const Page404 = () => import('@/components/pages/Page404.vue');
const FranceConnectLogoutCallBack = () => import('@/components/FranceConnectLogoutCallBack.vue');
const FranceConnectCallBack = () => import('@/components/FranceConnectCallBack.vue');
const PageAccueil = () => import('@/components/pages/PageAccueil.vue');
const PageSessionExpiree = () => import('@/components/pages/PageSessionExpiree.vue');

export enum RouteCommuneName {
  ACCUEIL = 'accueil',
  AUTHENTIFICATION = 'authentification',
  SESSION_EXPIREE = 'session-expiree',
  NOT_FOUND = 'not-found',
  RETOUR_AUTH_FRANCE_CONNECT = 'retour-auth-france-connect',
  RETOUR_LOGOUT_FRANCE_CONNECT = 'retour-logout-france-connect',
  MAGIC_LINK_CALLBACK = 'magic-link-callback',
}

enum RouteCommunePath {
  BETA_FERMEE = '/beta-fermee',
  AUTHENTIFICATION = '/authentification',
  SESSION_EXPIREE = '/session-expiree',
  LOGIN_CALLBACK = '/fc-login-callback',
  LOGOUT_CALLBACK = '/fc-logout-callback',
  MAGIC_LINK_CALLBACK = '/authentification/validation-lien-magique',
}

const routes: RouteRecordRaw[] = [
  ...conformiteRoutes,
  ...kycRoutes,
  ...compteRoutes,
  ...coachRoutes,
  ...articlesRoutes,
  ...aidesRoutes,
  ...thematiqueRoutes,
  ...quizRoutes,
  ...serviceRoutes,
  ...bilanCarboneRoutes,
  ...classementRoutes,
  ...collectiviteRoutes,
  ...actionsRoutes,
  ...resetRoutes,
  ...personnalisationRoutes,
  {
    path: '/',
    name: RouteCommuneName.ACCUEIL,
    component: PageAccueil,
    meta: {
      title: 'La transition écologique à mon échelle',
      estPublique: true,
    },
    beforeEnter: () => {
      if (utilisateurStore().utilisateur.id.length > 0) {
        router.replace({ name: RouteCoachName.ACCUEIL_CONNECTEE });
      }
    },
  },
  {
    path: RouteCommunePath.AUTHENTIFICATION,
    name: RouteCommuneName.AUTHENTIFICATION,
    component: Authentification,
    meta: {
      title: 'Authentification',
      estPublique: true,
    },
  },
  {
    path: RouteCommunePath.SESSION_EXPIREE,
    name: RouteCommuneName.SESSION_EXPIREE,
    component: PageSessionExpiree,
    meta: {
      title: 'Session expirée',
      estPublique: true,
    },
  },
  {
    path: RouteCommunePath.MAGIC_LINK_CALLBACK,
    name: RouteCommuneName.MAGIC_LINK_CALLBACK,
    component: MagicLinkCallBack,
    meta: {
      estPublique: true,
    },
  },
  {
    path: RouteCommunePath.LOGIN_CALLBACK,
    name: RouteCommuneName.RETOUR_AUTH_FRANCE_CONNECT,
    component: FranceConnectCallBack,
    meta: {
      estPublique: true,
    },
  },
  {
    path: RouteCommunePath.LOGOUT_CALLBACK,
    name: RouteCommuneName.RETOUR_LOGOUT_FRANCE_CONNECT,
    component: FranceConnectLogoutCallBack,
    meta: {
      estPublique: true,
    },
  },
  {
    path: '/:catchAll(.*)',
    name: RouteCommuneName.NOT_FOUND,
    component: Page404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (from.path === to.path && to.hash === from.hash) {
      return false;
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

// Error handling to force refresh the page when a dynamic import fails
router.onError(error => {
  if (
    error.message.includes('Failed to fetch dynamically imported module') ||
    error.message.includes('Importing a module script failed')
  ) {
    window.location.reload();
  }
});

export default router;
