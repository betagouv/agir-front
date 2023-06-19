<template>
  <footer v-if='store.getters["utilisateur/getUtilisateur"]' class="fr-footer" role="contentinfo" id="footer-5848">
    <div class="fr-container">
      <div class="fr-footer__body">
        <div class="fr-footer__brand fr-enlarge-link">
          <a id="footer-operator" href="/dashboard" title="Retour à l’accueil du site - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)">
            <p class="fr-logo">
              République
              <br>
              française
            </p>
          </a>
        </div>
        <div class="fr-footer__content">
          <p class="fr-footer__content-desc">Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et. Diam maecenas sed enim ut</p>
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
        <ul class="fr-footer__bottom-list">
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
        <div class="fr-footer__bottom-copy">
          <p>Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank">licence etalab-2.0</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import store from "@/store";

export default {
  name: "Footer",
  computed: {
    store() {
      return store
    }
  },
  props: {},
  methods: {},
};
</script>

<style scoped>
footer {
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: left;
  padding: 10px 0;
}
</style>
