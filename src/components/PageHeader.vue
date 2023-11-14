<template>
  <header role="banner" class="fr-header">
    <div class="fr-header__body">
      <div class="fr-container">
        <div class="fr-header__body-row">
          <div class="fr-header__brand">
            <div class="fr-header__brand-top">
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
            <div class="fr-col-12 fr-grid-row fr-grid-row--middle">
              <router-link class="fr-header__service" :to="{ name: estConnecte ? 'coach' : 'accueil' }">
                <img height="60" alt="agir-logo" src="/logo_agire_beta.png" />
              </router-link>
            </div>
          </div>
          <div class="fr-header__tools">
            <div class="fr-header__tools-links">
              <ul class="fr-btns-group">
                <li v-if="!estConnecte">
                  <a class="fr-btn fr-icon-lock-line" href="/authentification"> Se connecter </a>
                </li>
                <li v-if="estConnecte">
                  <div class="utilisateur">
                    <router-link title="accéder à mon compte" :to="{ name: 'mon-compte' }">
                      <img src="/ic_user.svg" class="fr-mr-1v fr-mb-n1v" alt="" />
                      {{ nomUtilisateur }}
                    </router-link>
                    <div class="tag__progression niveau fr-text--bold">
                      1 <img width="16" src="/ic_star.svg" alt="niveau" />
                    </div>
                    <div class="tag__progression score fr-text--bold">
                      {{ score }} <img width="16" src="/ic_score.svg" alt="score" />
                    </div>
                  </div>
                  <button class="fr-btn fr-btn--sm" @click="logout">Se déconnecter</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fr-header__menu fr-modal" id="modal-menu" aria-labelledby="button-menu">
      <div class="fr-container">
        <button class="fr-btn--close fr-btn" aria-controls="modal-menu" id="button-menu" title="Fermer">Fermer</button>
        <div @click="logout" class="fr-header__menu-links"></div>
        <nav
          v-if="nomUtilisateur"
          class="fr-nav"
          id="navigation"
          role="navigation"
          aria-label="Menu principal"
          data-fr-js-navigation="true"
        >
          <ul class="fr-nav__list">
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link v-if="isCoachActif" class="fr-nav__link" :to="{ name: 'coach' }" aria-current="page">
                Le coach
              </router-link>
              <router-link v-else class="fr-nav__link" :to="{ name: 'coach' }"> Le coach </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link v-if="isMesAidesActif" class="fr-nav__link" :to="{ name: 'mes-aides' }" aria-current="page">
                Mes Aides
              </router-link>
              <router-link v-else class="fr-nav__link" :to="{ name: 'mes-aides' }"> Mes Aides </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
  import router from '@/router';
  import { defineComponent, onMounted, ref } from 'vue';
  import { RouteLocation } from 'vue-router';
  import { utilisateurStore } from '@/store/utilisateur';
  import Cookies from 'js-cookie';

  export default defineComponent({
    name: 'PageHeader',
    computed: {
      score() {
        return utilisateurStore().score;
      },
      nomUtilisateur() {
        return utilisateurStore().utilisateur.prenom;
      },
      estConnecte() {
        return utilisateurStore().utilisateur.nom.length > 0;
      },
    },
    watch: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      $route(to: RouteLocation, from: RouteLocation) {
        this.isCoachActif = to.fullPath.includes('/coach');
        this.isMesAidesActif = to.fullPath.includes('/mes-aides');
        this.isDashboardActif = to.fullPath.includes('/mon-tableau-de-bord');
      },
    },
    setup() {
      const currentPage = ref<string>('');
      const isCoachActif = ref<boolean>(false);
      const isMesAidesActif = ref<boolean>(false);
      const isDashboardActif = ref<boolean>(false);

      function logout() {
        utilisateurStore().reset();
        Cookies.remove('bearer');
        router.replace('/');
      }

      onMounted(() => {
        currentPage.value = window.location.pathname;
      });

      return {
        logout,
        currentPage,
        isCoachActif,
        isMesAidesActif,
        isDashboardActif,
      };
    },
  });
</script>

<style scoped>
  .tag__progression {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    border-radius: 8px;
  }

  .tag__progression.score {
    background: rgba(104, 165, 50, 0.1);
  }

  .tag__progression.niveau {
    background: rgba(237, 142, 0, 0.1);
  }

  .utilisateur {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1 0 0;
  }

  .fr-header__service {
    box-shadow: none;
    width: auto;
  }
</style>
