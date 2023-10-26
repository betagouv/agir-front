<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col-md-7">
      <h1>Comment réduire notre empreinte écologique selon nos moyens, nos lieux de vie et nos envies</h1>
      <p class="fr-text--xl">
        Faîtes un premier en estimant les principaux impacts de vos usages en moins d’une minute !
      </p>
      <router-link :to="{ name: 'authentification' }" class="fr-btn fr-btn--secondary fr-mr-2w">
        Se connecter
      </router-link>
      <router-link :to="{ name: 'pre-onboarding' }" class="fr-btn fr-btn--icon-right fr-icon-arrow-right-line">
        Commencer
      </router-link>
    </div>
    <div class="fr-col-md-5 fr-hidden fr-unhidden-md">
      <img src="/landing-header.jpg" class="border-radius--full max-full-width" alt="" />
    </div>
  </div>
</template>
