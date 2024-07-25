<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col-md-7">
      <h1>Comment réduire notre empreinte écologique selon nos moyens, nos lieux de vie et nos envies</h1>
      <router-link class="fr-btn fr-btn--lg" :to="{ name: RouteCompteName.CREATION_COMPTE }">
        Créer un compte
      </router-link>

      <router-link class="fr-link fr-ml-4w" :to="{ name: RouteCommuneName.AUTHENTIFICATION }">
        J'ai déjà un compte
      </router-link>
    </div>
    <div class="fr-col-md-4 fr-col-offset-1 fr-hidden fr-unhidden-md">
      <img src="/landing-header.jpg" class="border-radius--full max-full-width" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouteCommuneName } from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>
