<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col-md-6">
      <h1>Comment réduire notre empreinte écologique selon nos moyens, nos lieux de vie et nos envies</h1>
      <p class="fr-text--xl">
        Faîtes un premier pas en estimant les principaux impacts de vos usages en moins d’une minute !
      </p>
      <div class="fr-grid fr-grid-row fr-grid-row--middle">
        <router-link
          :to="{ name: RouteCommuneName.AUTHENTIFICATION }"
          class="fr-btn fr-btn--lg fr-btn--secondary fr-mr-2w fr-mb-2w fr-mb-md-0"
        >
          Se connecter
        </router-link>
        <router-link
          :to="{ name: RouteOnboardingName.ONBOARDING }"
          class="fr-btn fr-btn--lg fr-btn--icon-right fr-icon-arrow-right-line"
        >
          Commencer
        </router-link>
      </div>
    </div>
    <div class="fr-col-md-5 fr-col-offset-1 fr-hidden fr-unhidden-md">
      <img src="/landing-header.jpg" class="border-radius--full max-full-width" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { RouteCommuneName } from '@/router';
  import { RouteOnboardingName } from '@/router/onboarding/routeOnboardingName';
</script>
