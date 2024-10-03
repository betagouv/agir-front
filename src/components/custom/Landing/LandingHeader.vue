<template>
  <div class="fr-col-md-7">
    <h1>Simplifiez votre transition écologique, à votre rythme</h1>
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
    <div class="fr-grid-row fr-col-6">
      <span class="fr-col-12 fr-p-1v">
        <router-link
          class="fr-btn full-width fr-btn--lg display-block text--center"
          :to="{ name: RouteCompteName.CREATION_COMPTE }"
        >
          Je m'inscris
        </router-link>
      </span>
      <img src="/bouton-google-play.jpg" class="fr-col-6 fr-p-1v" alt="Télécharger dans l'App Store" />
      <img src="/bouton-app-store.jpg" class="fr-col-6 fr-p-1v" alt="Disponible sur Google Play" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>
