<template>
  <header role="banner" class="fr-header">
    <div class="fr-header__body">
      <div class="fr-container">
        <div class="fr-header__body-row">
          <div class="fr-header__brand fr-enlarge-link">
            <div class="fr-header__brand-top">
              <div class="fr-header__navbar">
                <button class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="modal-1935" aria-haspopup="menu" id="button-1936" title="Menu">
                  Menu
                </button>
              </div>
            </div>
            <div class="fr-header__service">
              <img width="70" alt="agir-logo" src="/logo_agir.png" />
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
                  <div class="utilisateur">
                    <img src="/ic_user.svg" alt="" />{{ nomUtilisateur }}
                    <div class="score"><img src="/leaf.svg" alt="" />{{ score }}</div>
                  </div>
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
      <div class="fr-container">
        <button class="fr-btn--close fr-btn" aria-controls="modal-1918" id="button-1921" title="Fermer">Fermer</button>
        <div class="fr-header__menu-links"></div>
        <nav class="fr-nav" id="navigation" role="navigation" aria-label="Menu principal" data-fr-js-navigation="true">
          <ul class="fr-nav__list">
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link v-if="isCoachActif" class="fr-nav__link" :to="{ name: 'coach' }" aria-current="page"> Le coach </router-link>
              <router-link v-else class="fr-nav__link" :to="{ name: 'coach' }"> Le coach </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link v-if="isMesAidesActif" class="fr-nav__link" :to="{ name: 'mes-aides' }" aria-current="page"> Mes Aides </router-link>
              <router-link v-else class="fr-nav__link" :to="{ name: 'mes-aides' }"> Mes Aides </router-link>
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
import { defineComponent, onMounted, ref } from "vue";
import { RouteLocation } from "vue-router";
export default defineComponent({
  name: "Header",
  computed: {
    store() {
      return store;
    },
    score() {
      return store.getters["utilisateur/getScore"];
    },
    nomUtilisateur() {
      return store.getters["utilisateur/getUtilisateur"];
    },
  },
  watch: {
    $route(to: RouteLocation, from: RouteLocation) {
      this.isCoachActif = to.fullPath.includes("/coach");
      this.isMesAidesActif = to.fullPath.includes("/mes-aides");
    },
  },
  setup() {
    const currentPage = ref<string>("");
    const isCoachActif = ref<boolean>(false);
    const isMesAidesActif = ref<boolean>(false);
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
      isCoachActif,
      isMesAidesActif,
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
.score {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 8px;
  background: #f6f6f6;
}

.utilisateur {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  flex: 1 0 0;
}
</style>
