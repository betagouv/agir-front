<template>
  <section class="background--main">
    <LandingHeader />
  </section>
  <section class="fr-pt-4w fr-pb-12w background--olive-clair">
    <div class="fr-container">
      <div class="fr-mx-auto">
        <LandingNosSolutions />
      </div>
    </div>
  </section>

  <section class="fr-py-12w rappel-cta">
    <div class="fr-container">
      <LandingPourquoiAgir />
    </div>
  </section>
  <section class="fr-py-12w">
    <div class="fr-container">
      <LandingOnglet />
    </div>
  </section>
  <section class="fr-py-8w fr-pb-3w background--white">
    <div class="fr-container">
      <div class="fr-col-md-10 fr-mx-auto">
        <LandingCitations />
        <LandingCollectivite />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import LandingCitations from '@/components/custom/Landing/LandingCitations.vue';
  import LandingCollectivite from '@/components/custom/Landing/LandingCollectivite.vue';
  import LandingHeader from '@/components/custom/Landing/LandingHeader.vue';
  import LandingNosSolutions from '@/components/custom/Landing/LandingNosSolutions.vue';
  import LandingOnglet from '@/components/custom/Landing/LandingOnglet.vue';
  import LandingPourquoiAgir from '@/components/custom/Landing/LandingPourquoiAgir.vue';
</script>

<style scoped>
  .rappel-cta {
    background-color: var(--blue-france-sun-113-625);
    background-image: url('/hp-background-rappel-cta.svg');
    background-size: contain;
    background-position: center bottom;
    background-repeat: no-repeat;
  }
</style>
