<template>
  <LienDEvitement />
  <header role="banner" class="fr-header" id="header-navigation">
    <div class="fr-header__body">
      <div class="fr-container">
        <div class="fr-header__body-row">
          <div class="fr-header__brand fr-enlarge-link">
            <div class="fr-header__brand-top">
              <div class="fr-header__logo">
                <p class="fr-logo">
                  République
                  <br />Française
                </p>
              </div>
              <div class="fr-header__operator">
                <img class="fr-responsive-img" src="/logo-jagis-full.svg" alt="J'agis" />
              </div>
              <div class="fr-header__navbar">
                <button
                  class="fr-btn--menu fr-btn"
                  data-fr-opened="false"
                  aria-controls="modal-menu"
                  aria-haspopup="menu"
                  id="button-menu"
                  title="Menu"
                >
                  Menu
                </button>
              </div>
            </div>
            <div class="fr-header__service">
              <router-link :to="{ name: estConnecte ? RouteCoachName.COACH : RouteCommuneName.ACCUEIL }">
                <p class="fr-header__service-title">J'agis</p>
              </router-link>
            </div>
          </div>
          <div class="fr-header__tools">
            <div class="fr-header__tools-links">
              <ul class="fr-btns-group fr-btns-group--lg">
                <li v-if="!estConnecte">
                  <router-link
                    :to="{ name: RouteCommuneName.AUTHENTIFICATION }"
                    class="fr-btn fr-btn--secondary fr-mr-2w"
                  >
                    Je me connecte
                  </router-link>
                </li>
                <li v-if="!estConnecte">
                  <router-link :to="{ name: RouteCompteName.CREATION_COMPTE }" class="fr-btn fr-btn--primary">
                    Je crée mon compte
                  </router-link>
                </li>
                <li v-if="doitAfficherLeBoutonSeDeconnecter">
                  <button
                    class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-logout-box-r-line fr-btn--lg fr-mr-auto"
                    @click="logout"
                  >
                    Se déconnecter
                  </button>
                </li>
                <li v-if="utilisateurStore().utilisateur.onboardingAEteRealise">
                  <div class="utilisateur">
                    <router-link
                      class="fr-btn fr-mb-0 fr-text--lg fr-icon-user-fill"
                      title="accéder à mon compte"
                      :to="{ name: RouteCompteName.MON_COMPTE }"
                    >
                      {{ nomUtilisateur }}
                    </router-link>
                    <ScoreHeader v-if="utilisateurStore().utilisateur.onboardingAEteRealise" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fr-header__menu fr-modal" id="modal-menu" aria-labelledby="button-menu">
      <div class="fr-container">
        <button class="fr-btn--close fr-btn" aria-controls="modal-menu" title="Fermer">Fermer</button>
        <div class="fr-header__menu-links"></div>
        <nav class="fr-nav" id="navigation" role="navigation" aria-label="Menu principal" data-fr-js-navigation="true">
          <ul class="fr-nav__list" v-if="utilisateurStore().utilisateur.onboardingAEteRealise">
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                class="fr-nav__link"
                :to="{ name: RouteCoachName.COACH }"
                :aria-current="route.name === RouteCoachName.COACH ? 'page' : null"
              >
                Agir
              </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                class="fr-nav__link"
                :to="{ name: RouteUniversName.UNIVERS, params: { id: 'alimentation' } }"
                :aria-current="
                  route.name === RouteUniversName.UNIVERS && route.params.id === 'alimentation' ? 'page' : null
                "
              >
                Cuisine
              </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                class="fr-nav__link"
                :to="{ name: RouteUniversName.UNIVERS, params: { id: 'logement' } }"
                :aria-current="
                  route.name === RouteUniversName.UNIVERS && route.params.id === 'logement' ? 'page' : null
                "
              >
                Logement
              </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                class="fr-nav__link"
                :to="{ name: RouteUniversName.UNIVERS, params: { id: 'consommation' } }"
                :aria-current="
                  route.name === RouteUniversName.UNIVERS && route.params.id === 'consommation' ? 'page' : null
                "
              >
                Consommation
              </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                class="fr-nav__link"
                :to="{ name: RouteUniversName.UNIVERS, params: { id: 'transport' } }"
                :aria-current="
                  route.name === RouteUniversName.UNIVERS && route.params.id === 'transport' ? 'page' : null
                "
              >
                Transport
              </router-link>
            </li>
            <li
              v-if="utilisateurStore().utilisateur.fonctionnalitesDebloquees.includes(Fonctionnalites.AIDES)"
              class="fr-nav__item"
              data-fr-js-navigation-item="true"
            >
              <router-link
                class="fr-nav__link"
                :to="{ name: RouteAidesName.AIDES }"
                :aria-current="route.name === RouteAidesName.AIDES ? 'page' : null"
              >
                Mes aides
              </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                class="fr-nav__link"
                :to="{ name: RouteCoachName.BIBLIOTHEQUE }"
                v-if="utilisateurStore().utilisateur.fonctionnalitesDebloquees.includes(Fonctionnalites.BIBLIOTHEQUE)"
                :aria-current="route.name === RouteCoachName.BIBLIOTHEQUE ? 'page' : null"
              >
                Ma bibliothèque
              </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                class="fr-nav__link"
                :to="{ name: RouteBilanCarboneName.BILAN_CARBONE }"
                v-if="utilisateurStore().utilisateur.fonctionnalitesDebloquees.includes(Fonctionnalites.BILAN_CARBONE)"
                :aria-current="route.name === RouteBilanCarboneName.BILAN_CARBONE ? 'page' : null"
              >
                Mon bilan
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/header/header.min.css';
  import '@gouvfr/dsfr/dist/component/navigation/navigation.min.css';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import router, { RouteCommuneName } from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  import ScoreHeader from '@/components/custom/ScoreHeader.vue';
  import LienDEvitement from '@/components/dsfr/LienDEvitement.vue';
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import { RouteBilanCarboneName } from '@/router/bilanCarbone/routes';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
  import Cookies from 'js-cookie';
  import { RouteUniversName } from '@/router/univers/routes';

  const route = useRoute();
  const store = utilisateurStore();

  const nomUtilisateur = computed(() => store.utilisateur.prenom);
  const estConnecte = computed(() => store.utilisateur.id.length > 0);
  const doitAfficherLeBoutonSeDeconnecter = computed(
    () => estConnecte.value && !store.utilisateur.onboardingAEteRealise,
  );

  const logout = () => {
    store.reset();
    Cookies.remove('bearer');
    router.replace('/');
  };
</script>

<style scoped>
  .utilisateur {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1 0 0;
  }

  .utilisateur a {
    max-width: 100% !important;
  }

  .fr-header__service {
    box-shadow: none;
    width: auto;
  }

  .fr-responsive-img {
    height: 4rem;
  }

  .fr-header__tools-links .fr-btn--primary {
    background-color: var(--blue-france-sun-113-625);
    color: white;
  }

  .fr-header__tools-links .fr-btn--primary:hover {
    background-color: var(--blue-france-sun-113-625-hover);
  }

  @media (min-width: 62em) {
    .fr-header__body-row {
      padding: 1rem 0;
    }
  }
</style>
