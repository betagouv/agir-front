<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col-md-8">
      <h2 class="fr-h4 text--white">Vous changez de situation ?</h2>
      <p class="text--white text--bold fr-text--xl">
        Le coach vous conseille et vous accompagne à tout moment avec des conseils et actions adaptées à vos
        changements.
      </p>
    </div>
    <div class="fr-col-md-4">
      <router-link
        :to="{ name: RouteCompteName.MON_COMPTE }"
        class="fr-btn fr-btn--icon-left fr-icon-user-heart-line border--white"
      >
        Mettre à jour vos données
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>
