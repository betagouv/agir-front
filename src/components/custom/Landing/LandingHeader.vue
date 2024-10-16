<template>
  <div class="fr-col-md-7">
    <h1>
      <img src="/logo-jagis.svg" height="110px" class="display-block" alt="J'agis" />
      Des solutions pour la transition écologique à mon échelle
    </h1>
    <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-pl-0 fr-mb-2w">
      <li class="fr-col-auto">
        <span class="fr-icon-check-line text--vert" aria-hidden="true" />
        Selon mes moyens
      </li>
      <li class="fr-col-auto">
        <span class="fr-icon-check-line text--vert" aria-hidden="true" />
        Selon mes lieux de vie
      </li>
      <li class="fr-col-auto">
        <span class="fr-icon-check-line text--vert" aria-hidden="true" />
        Selon mes envies
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
      <div class="fr-col-6 fr-p-1v">
        <a href="https://play.google.com/store/apps/details?id=fr.gouv.agir" target="_blank" class="no_blank">
          <img src="/bouton-google-play.svg" alt="Disponible sur Google Play" class="display-block full-width" />
        </a>
      </div>
      <div class="fr-col-6 fr-p-1v">
        <a href="https://apps.apple.com/fr/app/jagis/id6504984321" target="_blank" class="no_blank">
          <img src="/bouton-app-store.svg" alt="Télécharger dans l'App Store" class="display-block full-width" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>
