<template>
  <header role="banner" class="fr-header">
    <div class="fr-header__body">
      <div class="header-container">
        <div class="fr-header__body-row">
          <div class="fr-header__brand fr-enlarge-link">
            <div class="fr-header__brand-top">
              <div class="fr-header__logo">
                <a href="/dashboard" title="Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)">
                  <p class="fr-logo">
                    République
                    <br />Française
                  </p>
                </a>
              </div>
              <div class="fr-header__navbar">
                <button class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="modal-1935" aria-haspopup="menu" id="button-1936" title="Menu">
                  Menu
                </button>
              </div>
            </div>
            <div class="fr-header__service">
              <img width="70" alt="agir-logo" src="../../public/logo_agir.png" />
            </div>
          </div>
          <div class="fr-header__tools">
            <div class="fr-header__tools-links">
              <ul class="fr-btns-group">
                <li v-if="!store.getters['utilisateur/getUtilisateur']">
                  <a class="fr-btn fr-icon-lock-line" id="button-1938" href="/"> Se connecter </a>
                </li>
                <li v-if="!store.getters['utilisateur/getUtilisateur']">
                  <a class="fr-btn fr-icon-account-line" id="button-1939" href="#[url - à modifier]"> S’enregistrer </a>
                </li>
                <li v-if="store.getters['utilisateur/getUtilisateur']" @click="logout">
                  <a class="fr-btn fr-icon-logout-box-r-line" href="#"> Se déconnecter </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fr-header__menu fr-modal" id="modal-1935" aria-labelledby="button-1936">
      <div class="fr-container">
        <button class="fr-btn--close fr-btn" aria-controls="modal-1935" id="button-1940" title="Fermer">Fermer</button>
        <div @click="logout" class="fr-header__menu-links"></div>
      </div>
    </div>
    <div v-if="store.getters['utilisateur/getUtilisateur']" class="fr-header__menu fr-modal" id="modal-1918" aria-labelledby="button-1919">
      <div class="header-container">
        <button class="fr-btn--close fr-btn" aria-controls="modal-1918" id="button-1921" title="Fermer">Fermer</button>
        <div class="fr-header__menu-links"></div>
        <nav class="fr-nav" id="navigation" role="navigation" aria-label="Menu principal" data-fr-js-navigation="true">
          <ul class="fr-nav__list">
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <a v-if="isCoach" class="fr-nav__link" href="/quiz" target="_self" aria-current="page"> Le coach </a>
              <a v-else class="fr-nav__link" href="/coach" target="_self"> Le coach </a>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <a v-if="isDashboard" class="fr-nav__link" href="/dashboard" target="_self" aria-current="page"> Tableau de bord </a>
              <a v-else class="fr-nav__link" href="/dashboard" target="_self"> Tableau de bord </a>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <a v-if="isAides" class="fr-nav__link" href="/mes-aides" target="_self" aria-current="page"> Mes Aides </a>
              <a v-else class="fr-nav__link" href="/mes-aides" target="_self"> Mes Aides </a>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <a v-if="isCommunity" class="fr-nav__link" href="/communaute" target="_self" aria-current="page"> Communauté </a>
              <a v-else class="fr-nav__link" href="/communaute" target="_self"> Communauté </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import router from "@/router";
import store from "@/store";
import { computed, defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "Header",
  computed: {
    store() {
      return store;
    },
    isAides() {
      return this.currentPage && this.currentPage == "/aides";
    },
    isCoach() {
      return this.currentPage && this.currentPage == "/coach";
    },
    isDashboard() {
      return this.currentPage && this.currentPage == "/dashboard";
    },
    isCommunity() {
      return this.currentPage && this.currentPage == "/communaute";
    },
  },
  setup() {
    const currentPage = ref<string>("/dashboard");

    function logout() {
      store.dispatch("utilisateur/reset");
      router.replace("/");
    }

    onMounted(() => {
      currentPage.value = window.location.pathname;
    });

    return {
      logout,
      currentPage,
    };
  },
});
</script>

<style scoped>
header {
  left: 0;
  top: 0;
  width: 100%;
}

.header-container {
  margin: 0 0 0 50px;
}

@media only screen and (max-width: 1024px) {
  .header-container {
    margin: 0 0 0 5px;
  }
}
</style>
