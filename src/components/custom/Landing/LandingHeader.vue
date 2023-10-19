<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col-md-7">
      <h1>Réduire votre empreinte écologique selon vos moyens, vos lieux de vie et vos envies</h1>
      <p class="fr-text--xl">
        Faites un premier pas vers la transition écologique en estimant votre impact en 30 secondes chrono !
      </p>
      <router-link :to="{ name: 'pre-onboarding' }" class="fr-btn fr-btn--icon-right fr-icon-arrow-right-line">
        Commencer
      </router-link>
    </div>
    <div class="fr-col-md-5 fr-hidden fr-unhidden-md">
      <img src="/landing-header.jpg" class="border-radius--full max-full-width" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
