import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { storeIdNGC } from '@/bilan/middleware/pendingSimulation';
import { utilisateurStore } from '@/store/utilisateur';
import articlesRoutes from '@/router/articles/routes';
import aidesRoutes from '@/router/aides/routes';
import compteRoutes from '@/router/compte/routes';
import onboardingRoutes from '@/router/onboarding/routes';
import coachRoutes from '@/router/coach/routes';
import kycRoutes from '@/router/kyc/routes';
import { RouteCoachName } from '@/router/coach/routeCoachName';
const Authentification = () => import('@/components/Authentification.vue');
const Page404 = () => import('@/components/pages/Page404.vue');
const FranceConnectCallBack = () => import('@/components/FranceConnectCallBack.vue');
const PageAccueil = () => import('@/components/pages/PageAccueil.vue');
const PageSessionExpiree = () => import('@/components/pages/PageSessionExpiree.vue');
const PageBetaFermee = () => import('@/components/pages/PageBetaFermee.vue');

export enum RouteCommuneName {
  ACCUEIL = 'accueil',
  AUTHENTIFICATION = 'authentification',
  SESSION_EXPIREE = 'session-expiree',
  DASHBOARD = 'dashboard',
  BETA_FERMEE = 'beta-fermee',
  NOT_FOUND = 'not-found',
  RETOUR_AUTH_FRANCE_CONNECT = 'retour-auth-france-connect',
}

enum RouteCommunePath {
  BETA_FERMEE = '/beta-fermee',
  AUTHENTIFICATION = '/authentification',
  SESSION_EXPIREE = '/session-expiree',
  LOGIN_CALLBACK = '/login-callback',
}

const routes: RouteRecordRaw[] = [
  ...kycRoutes,
  ...compteRoutes,
  ...coachRoutes,
  ...onboardingRoutes,
  ...articlesRoutes,
  ...aidesRoutes,
  {
    path: '/',
    name: RouteCommuneName.ACCUEIL,
    component: PageAccueil,
    meta: {
      title: 'Accueil',
      estPublique: true,
    },
    beforeEnter: () => {
      storeIdNGC;
      if (utilisateurStore().utilisateur.id.length > 0) {
        router.replace({ name: RouteCoachName.COACH });
      }
    },
  },
  {
    path: RouteCommunePath.BETA_FERMEE,
    name: RouteCommuneName.BETA_FERMEE,
    component: PageBetaFermee,
    meta: {
      title: 'Bêta fermée',
      estPublique: true,
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
    path: RouteCommunePath.LOGIN_CALLBACK,
    name: RouteCommuneName.RETOUR_AUTH_FRANCE_CONNECT,
    component: FranceConnectCallBack,
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
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

export default router;
