<template>
  <section class="background--main fr-py-16w background-image-header">
    <div class="fr-container">
      <LandingHeader />
    </div>
  </section>
  <section class="fr-py-8w background--beige">
    <div class="fr-container">
      <LandingPourquoi />
    </div>
  </section>
  <section class="fr-py-8w background--white">
    <div class="fr-container">
      <LandingNotreApproche />
    </div>
  </section>
  <section class="fr-py-8w rappel-cta">
    <div class="fr-container">
      <LandingRappelCTA />
    </div>
  </section>
  <section class="fr-py-8w background--beige">
    <div class="fr-container">
      <LandingEnsemble />
    </div>
  </section>
  <section class="fr-py-16w">
    <div class="fr-container">
      <LandingApp />
    </div>
  </section>
  <section class="fr-py-16w background--vert rappel-app-cta">
    <div class="fr-container">
      <LandingRappelAppCTA />
    </div>
  </section>
</template>

<script setup lang="ts">
  import LandingApp from '@/components/custom/Landing/LandingApp.vue';
  import LandingEnsemble from '@/components/custom/Landing/LandingEnsemble.vue';
  import LandingHeader from '@/components/custom/Landing/LandingHeader.vue';
  import LandingNotreApproche from '@/components/custom/Landing/LandingNotreApproche.vue';
  import LandingPourquoi from '@/components/custom/Landing/LandingPourquoi.vue';
  import LandingRappelAppCTA from '@/components/custom/Landing/LandingRappelAppCTA.vue';
  import LandingRappelCTA from '@/components/custom/Landing/LandingRappelCTA.vue';
</script>

<style scoped>
  .rappel-cta {
    background-color: var(--blue-france-sun-113-625);
    background-image: url('/hp-background-rappel-cta.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  @media (min-width: 48rem) {
    .background-image-header {
      background-image: url('/hp-background-header.png');
      background-position: right bottom;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .rappel-app-cta {
      background-image: url('/hp-background-rappel-app-cta.png');
      background-position: 70% bottom;
      background-repeat: no-repeat;
    }
  }
</style>
