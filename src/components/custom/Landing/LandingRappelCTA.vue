<template>
  <div class="text--center">
    <h2 class="fr-h2 text--white fr-mb-4w">
      Agissez comme vous voulez,<br />
      à hauteur de vos moyens
    </h2>
    <router-link
      class="fr-btn fr-btn--lg fr-btn--icon-right fr-icon-arrow-right-s-line border--white"
      :to="{ name: RouteCompteName.CREATION_COMPTE }"
    >
      Je m’inscris maintenant
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>
