<template>
  <div class="fr-col-md-7">
    <h1>
      <img src="/logo-jagis.svg" height="110px" class="display-block" alt="J'agis" />
      Simplifiez votre transition écologique, à votre rythme
    </h1>
    <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-pl-0 fr-mb-2w">
      <li class="fr-col-auto">
        <span class="fr-icon-check-line text--vert" aria-hidden="true" />
        Selon vos moyens
      </li>
      <li class="fr-col-auto">
        <span class="fr-icon-check-line text--vert" aria-hidden="true" />
        Selon votre lieu de vie
      </li>
      <li class="fr-col-auto">
        <span class="fr-icon-check-line text--vert" aria-hidden="true" />
        Selon vos envies
      </li>
    </ul>
    <div class="fr-grid-row fr-col-md-6 fr-col-12">
      <span class="fr-col-12 fr-p-1v">
        <router-link
          class="fr-btn full-width fr-btn--lg display-block text--center"
          :to="{ name: RouteCompteName.CREATION_COMPTE }"
        >
          Je m'inscris
        </router-link>
      </span>
      <img
        src="/bouton-google-play.svg"
        class="fr-col-6 fr-p-1v"
        alt="Télécharger dans l'App Store"
        type="button"
        aria-describedby="tooltip-bouton-google-store-header"
      />
      <span class="fr-tooltip fr-placement" id="tooltip-bouton-google-store-header" role="tooltip" aria-hidden="true">
        Bientôt dispobile
      </span>
      <img
        src="/bouton-app-store.svg"
        class="fr-col-6 fr-p-1v"
        alt="Disponible sur Google Play"
        aria-describedby="tooltip-bouton-app-store-header"
      />
      <span class="fr-tooltip fr-placement" id="tooltip-bouton-app-store-header" role="tooltip" aria-hidden="true">
        Bientôt dispobile
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/tooltip/tooltip.min.css';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>
