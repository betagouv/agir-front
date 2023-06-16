<template>
  <header role="banner" class="fr-header">
    <div class="fr-header__body">
      <div class="fr-container">
        <div class="fr-header__body-row">
          <div class="fr-header__brand fr-enlarge-link">
            <div class="fr-header__brand-top">
              <div class="fr-header__logo">
                <img alt="fnv-logo" src="/logo_fnv.png" />
              </div>
              <div class="fr-header__navbar">
                <button class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="modal-1935" aria-haspopup="menu" id="button-1936" title="Menu">
                  Menu
                </button>
              </div>
            </div>
            <div class="fr-header__service">
              <a href="/public" title="Accueil - [À MODIFIER - Nom du site / service] - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)">
                <p class="fr-header__service-title">France Nation Verte</p>
              </a>
              <p class="fr-header__service-tagline">Écologie - réduisez votre empreinte carbone</p>
            </div>
          </div>
          <div class="fr-header__tools">
            <div class="fr-header__tools-links">
              <ul class="fr-btns-group">
                <li v-if='!store.getters["utilisateur/getUtilisateur"]'>
                  <a class="fr-btn fr-icon-lock-line" id="button-1938" href="/"> Se connecter </a>
                </li>
                <li v-if='!store.getters["utilisateur/getUtilisateur"]'>
                  <a class="fr-btn fr-icon-account-line" id="button-1939" href="#[url - à modifier]"> S’enregistrer </a>
                </li>
                <li v-if='store.getters["utilisateur/getUtilisateur"]' @click="logout">
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
  </header>
</template>
<script lang="ts">
import router from "@/router";
import store from "@/store"
export default {
  name: "Header",
  computed: {
    store() {
      return store
    }
  },
  props: {},
  methods: {
    logout() {
      store.commit("utilisateur/removeUtilisateur");
      router.replace("/");
    },
  },
};
</script>

<style scoped>
header {
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
