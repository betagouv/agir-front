<template>
  <footer v-if="store.getters['utilisateur/getUtilisateur']" class="fr-footer" role="contentinfo" id="footer-5848">
    <div>
      <div class="fr-footer__body">
        <div class="fr-footer__brand fr-enlarge-link footer-item-container">
          <a id="footer-operator" href="/dashboard" title="Retour à l’accueil du site - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)">
            <p class="fr-logo">
              République
              <br />
              française
            </p>
          </a>
        </div>
        <div class="fr-footer__content footer-desc-container">
          <ul class="fr-footer__content-list">
            <li class="fr-footer__content-item">
              <a id="footer__content-link-5849" class="fr-footer__content-link" target="_blank" href="https://legifrance.gouv.fr">legifrance.gouv.fr</a>
            </li>
            <li class="fr-footer__content-item">
              <a id="footer__content-link-5850" class="fr-footer__content-link" target="_blank" href="https://gouvernement.fr">gouvernement.fr</a>
            </li>
            <li class="fr-footer__content-item">
              <a id="footer__content-link-5851" class="fr-footer__content-link" target="_blank" href="https://service-public.fr">service-public.fr</a>
            </li>
            <li class="fr-footer__content-item">
              <a id="footer__content-link-5852" class="fr-footer__content-link" target="_blank" href="https://data.gouv.fr">data.gouv.fr</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="fr-footer__bottom">
        <ul class="fr-footer__bottom-list footer-item-container">
          <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" id="footer__bottom-link-5853" href="#">Plan du site</a>
          </li>
          <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" id="footer__bottom-link-5854" href="#">Accessibilité : non/partiellement/totalement conforme</a>
          </li>
          <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" id="footer__bottom-link-5855" href="#">Mentions légales</a>
          </li>
          <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" id="footer__bottom-link-5856" href="#">Données personnelles</a>
          </li>
          <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" id="footer__bottom-link-5857" href="#">Gestion des cookies</a>
          </li>
        </ul>
        <div class="fr-footer__bottom-copy footer-item-container">
          <p>
            Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous
            <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank">licence etalab-2.0</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import store from "@/store";
import router from "@/router";

export default {
  name: "Footer",
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
};
</script>

<style scoped>
.footer-item-container {
  margin: 0 0 0 50px;
}

@media only screen and (max-width: 1024px) {
  .footer-item-container {
    margin: 0 0 0 10px;
  }

  .footer-desc-container {
    margin: 0 0 0 10px;
  }
}

#footer-5848 > div > div.fr-footer__bottom {
  background-color: white;
}

#footer-5848 > div {
  background-color: white;
}
</style>
