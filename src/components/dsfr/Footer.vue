<template>
  <footer v-if="getUtilisateur" class="fr-footer background--white" role="contentinfo">
    <div class="fr-container">
      <div class="fr-footer__body">
        <div class="fr-footer__brand fr-enlarge-link">
          <router-link :to="{ name: RouteCoachName.COACH }" title="Retour à l’accueil du site">
            <p class="fr-logo">
              République
              <br />
              française
            </p>
          </router-link>
        </div>
        <!-- <div class="fr-footer__content">
          <ul class="fr-footer__content-list">
            <li class="fr-footer__content-item">
              <a class="fr-footer__content-link" target="_blank" href="https://legifrance.gouv.fr"
                >legifrance.gouv.fr</a
              >
            </li>
            <li class="fr-footer__content-item">
              <a class="fr-footer__content-link" target="_blank" href="https://gouvernement.fr">gouvernement.fr</a>
            </li>
            <li class="fr-footer__content-item">
              <a class="fr-footer__content-link" target="_blank" href="https://service-public.fr">service-public.fr</a>
            </li>
            <li class="fr-footer__content-item">
              <a class="fr-footer__content-link" target="_blank" href="https://data.gouv.fr">data.gouv.fr</a>
            </li>
          </ul>
        </div> -->
      </div>
      <div class="fr-footer__partners">
        <h4 class="fr-footer__partners-title">Nos partenaires</h4>
        <div class="fr-footer__partners-logos">
          <div class="fr-footer__partners-main">
            <ul class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
              <li class="fr-col">
                <img class="fr-footer__logo" src="/logo_ademe.png" alt="Agence de la transition écologique à Paris" />
              </li>
              <li class="fr-col">
                <img class="fr-footer__logo" src="/logo_fnv.png" alt="France Nation Verte" />
              </li>
              <li class="fr-col">
                <img class="fr-footer__logo" src="/logo-betagouvfr.svg" alt="Beta gouv" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="fr-footer__bottom">
        <ul class="fr-footer__bottom-list">
          <!-- <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" href="#">Plan du site</a>
          </li> -->
          <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" href="#">Accessibilité : non conforme</a>
          </li>
          <!-- <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" href="#">Mentions légales</a>
          </li>
          <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" href="#">Données personnelles</a>
          </li>
          <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" href="#">Gestion des cookies</a>
          </li> -->
        </ul>
        <div class="fr-footer__bottom-copy">
          <p>
            Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont
            proposés sous
            <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank">licence etalab-2.0</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
  import '@gouvfr/dsfr/dist/component/footer/footer.min.css';
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  import Cookies from 'js-cookie';

  import { RouteCoachName } from '@/router/coach/routeCoachName';

  export default {
    name: 'Footer',
    computed: {
      RouteCoachName() {
        return RouteCoachName;
      },
      getUtilisateur() {
        return utilisateurStore().utilisateur;
      },
    },
    methods: {
      logout() {
        utilisateurStore().reset();
        Cookies.remove('bearer');
        router.replace('/');
      },
    },
  };
</script>
