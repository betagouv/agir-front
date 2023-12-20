import PageCompte from '@/components/pages/PageCompte.vue';
import PageModificationMotDePasse from '@/components/pages/PageModificationMotDePasse.vue';
import PageCreationCompte from '@/components/pages/PageCreationCompte.vue';
import { onboardingStore } from '@/store/onboarding';
import PageValidationCompte from '@/components/pages/PageValidationCompte.vue';
import PageMotDePasseOublie from '@/components/pages/PageMotDePasseOublie.vue';
import PageMotDePasseOublieRedefinirMotDePasse from '@/components/pages/PageMotDePasseOublieRedefinirMotDePasse.vue';
import { RouteRecordRaw } from 'vue-router';

enum RouteComptePath {
  MON_COMPTE = '/mon-compte/',
  MODIFIER_MOT_DE_PASSE = '/mon-compte/changer-de-mot-de-passe',
  CREATION_COMPTE = '/creation-compte',
  VALIDATION_COMPTE = '/validation-compte',
  MOT_DE_PASSE_OUBLIE = '/mot-de-passe-oublie',
  REDEFINIR_MOT_DE_PASSE = '/mot-de-passe-oublie/redefinir-mot-de-passe',
}

export enum RouteCompteName {
  MON_COMPTE = 'mon-compte',
  MODIFIER_MOT_DE_PASSE = 'modifier-mot-de-passe',
  CREATION_COMPTE = 'creation-compte',
  VALIDATION_COMPTE = 'validation-compte',
  MOT_DE_PASSE_OUBLIE = 'mot-de-passe-oublie',
  REDEFINIR_MOT_DE_PASSE = 'redefinir-mot-de-passe',
}

const compteRoutes: RouteRecordRaw[] = [
  {
    path: RouteComptePath.MON_COMPTE,
    children: [
      {
        path: RouteComptePath.MON_COMPTE,
        name: RouteCompteName.MON_COMPTE,
        component: PageCompte,
      },
      {
        path: RouteComptePath.MODIFIER_MOT_DE_PASSE,
        name: RouteCompteName.MODIFIER_MOT_DE_PASSE,
        component: PageModificationMotDePasse,
      },
    ],
  },
  {
    path: RouteComptePath.CREATION_COMPTE,
    name: RouteCompteName.CREATION_COMPTE,
    component: PageCreationCompte,
    beforeEnter: (to, from, next) => {
      if (!onboardingStore().estComplet) {
        next({ name: 'pre-onboarding' });
      } else {
        next();
      }
    },
    meta: {
      title: 'Création du compte',
      estPublique: true,
    },
  },
  {
    path: RouteComptePath.VALIDATION_COMPTE,
    name: RouteCompteName.VALIDATION_COMPTE,
    component: PageValidationCompte,
    meta: {
      title: 'Validation du compte',
      estPublique: true,
    },
  },
  {
    path: RouteComptePath.MOT_DE_PASSE_OUBLIE,
    children: [
      {
        path: RouteComptePath.MOT_DE_PASSE_OUBLIE,
        name: RouteCompteName.MOT_DE_PASSE_OUBLIE,
        component: PageMotDePasseOublie,
        meta: {
          title: 'Mot de passe oublié',
          estPublique: true,
        },
      },
      {
        path: RouteComptePath.REDEFINIR_MOT_DE_PASSE,
        name: RouteCompteName.REDEFINIR_MOT_DE_PASSE,
        component: PageMotDePasseOublieRedefinirMotDePasse,
        meta: {
          title: 'Redéfinir mot de passe',
          estPublique: true,
        },
      },
    ],
  },
];

export default compteRoutes;
