<template>
  <header role="banner" class="fr-header">
    <div class="fr-header__body">
      <div class="fr-container">
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
              <img width="50" alt="fnv-logo" src="/logo_fnv.png" />
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
        <div class="fr-header__menu-links"></div>
      </div>
    </div>

    <div v-if="store.getters['utilisateur/getUtilisateur']" class="fr-header__menu fr-modal" id="modal-1918" aria-labelledby="button-1919">
      <div class="fr-container">
        <button class="fr-btn--close fr-btn" aria-controls="modal-1918" id="button-1921" title="Fermer">Fermer</button>
        <div class="fr-header__menu-links"></div>
        <nav class="fr-nav" id="navigation-1922" role="navigation" aria-label="Menu principal">
          <ul class="fr-nav__list">
            <li class="fr-nav__item">
              <a class="fr-nav__link" href="#" target="test" id="nav-1923">Le coach</a>
            </li>
            <li class="fr-nav__item">
              <a class="fr-nav__link" href="#" target="_self" id="nav-1924">Tableau de bord</a>
            </li>
            <li class="fr-nav__item">
              <a class="fr-nav__link" href="#" target="_self" id="nav-1925">Aides</a>
            </li>
            <li class="fr-nav__item">
              <a class="fr-nav__link" href="#" target="_self" id="nav-1926">Communauté</a>
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
import {defineComponent} from "vue";
export default defineComponent({
  name: "Header",
  computed: {
    store() {
      return store;
    },
  },
  methods: {
    logout() {
      store.dispatch("utilisateur/reset");
      router.replace("/");
    },
  },
});

</script>

<style scoped>
header {
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
