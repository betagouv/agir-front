<template>
  <LienDEvitement />
  <header id="header-navigation" class="fr-header" role="banner">
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
                <img alt="J'agis" class="fr-responsive-img" src="/logo-jagis-full.svg" />
              </div>
              <div class="fr-header__navbar">
                <button
                  id="button-menu"
                  aria-controls="modal-menu"
                  aria-haspopup="menu"
                  class="fr-btn--menu fr-btn"
                  data-fr-opened="false"
                  title="Menu"
                >
                  Menu
                </button>
              </div>
            </div>
            <div class="fr-header__service">
              <router-link :to="{ name: estConnecte ? RouteCoachName.ACCUEIL_CONNECTEE : RouteCommuneName.ACCUEIL }">
                <p class="fr-header__service-title">J'agis</p>
              </router-link>
            </div>
          </div>
          <div class="fr-header__tools">
            <div class="fr-header__tools-links">
              <ul class="fr-btns-group fr-btns-group--lg">
                <li>
                  <router-link :to="{ name: RouteCommuneName.ACCUEIL }" class="fr-btn fr-btn--secondary fr-mr-2w">
                    Tester le service citoyen
                  </router-link>
                </li>
                <li>
                  <a href="mailto:collectivites@jagis.beta.gouv.fr" class="fr-btn fr-btn--primary">Nous contacter</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modal-menu" aria-label="Menu" class="fr-header__menu fr-modal">
      <div class="fr-container">
        <button aria-controls="modal-menu" class="fr-btn--close fr-btn" title="Fermer">Fermer</button>
        <div class="fr-header__menu-links"></div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  import '@gouvfr/dsfr/dist/component/header/header.min.css';
  import '@gouvfr/dsfr/dist/component/navigation/navigation.min.css';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { RouteCommuneName } from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  import LienDEvitement from '@/components/dsfr/LienDEvitement.vue';
  import { RouteCoachName } from '@/router/coach/routeCoachName';

  const route = useRoute();
  const store = utilisateurStore();

  const estConnecte = computed(() => store.utilisateur.id.length > 0);
</script>

<style scoped>
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
