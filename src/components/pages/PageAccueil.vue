<template>
  <section class="background--main fr-pt-4w fr-py-md-16w background-image-header">
    <div class="fr-container">
      <LandingHeader />
    </div>
  </section>
  <section class="fr-py-8w background--beige">
    <div class="fr-container">
      <div class="fr-col-md-10 fr-mx-auto">
        <LandingPourquoi />
      </div>
    </div>
  </section>
  <section class="fr-py-8w background--white">
    <div class="fr-container">
      <LandingNotreApproche />
    </div>
  </section>
  <section class="fr-py-12w background--vert rappel-app-cta">
    <div class="fr-container">
      <LandingRappelAppCTA />
    </div>
  </section>
  <section class="fr-py-12w">
    <div class="fr-container">
      <LandingOnglet />
    </div>
  </section>
  <section class="fr-py-12w rappel-cta">
    <div class="fr-container">
      <LandingRappelCTA />
    </div>
  </section>
  <section class="fr-py-8w background--beige">
    <div class="fr-container">
      <div class="fr-col-md-10 fr-mx-auto">
        <LandingEnsemble />
      </div>
    </div>
  </section>
  <section class="fr-py-16w rappel-app">
    <div class="fr-container">
      <LandingApp />
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
  import LandingApp from '@/components/custom/Landing/LandingApp.vue';
  import LandingCitations from '@/components/custom/Landing/LandingCitations.vue';
  import LandingCollectivite from '@/components/custom/Landing/LandingCollectivite.vue';
  import LandingEnsemble from '@/components/custom/Landing/LandingEnsemble.vue';
  import LandingHeader from '@/components/custom/Landing/LandingHeader.vue';
  import LandingNotreApproche from '@/components/custom/Landing/LandingNotreApproche.vue';
  import LandingOnglet from '@/components/custom/Landing/LandingOnglet.vue';
  import LandingPourquoi from '@/components/custom/Landing/LandingPourquoi.vue';
  import LandingRappelAppCTA from '@/components/custom/Landing/LandingRappelAppCTA.vue';
  import LandingRappelCTA from '@/components/custom/Landing/LandingRappelCTA.vue';
</script>

<style scoped>
  .rappel-cta {
    background-color: var(--blue-france-sun-113-625);
    background-image: url('/hp-background-rappel-cta.svg');
    background-size: contain;
    background-position: center bottom;
    background-repeat: no-repeat;
  }

  .background-image-header {
    --height-background-img-mobile: 20rem;

    background-image: url('/hp-background-header.webp');
    background-repeat: no-repeat;
    background-size: auto var(--height-background-img-mobile);
    background-position: right bottom;
    padding-bottom: calc(var(--height-background-img-mobile) + 2rem);
  }

  @media (min-width: 48rem) {
    .background-image-header {
      background-position: right bottom;
      background-size: 45%;
    }

    .rappel-app-cta {
      background-image: url('/hp-background-rappel-app-cta.webp');
      background-position: 70% bottom;
      background-repeat: no-repeat;
      background-size: auto 90%;
    }
  }

  @media (min-width: 62rem) {
    .rappel-app {
      background-image: url('/hp-background-rappel-app.webp');
      background-position: 5% bottom;
      background-repeat: no-repeat;
      background-size: auto 80%;
    }
  }

  @media (min-width: 78rem) {
    .rappel-app {
      background-position: 10% bottom;
      background-size: contain;
    }
  }
</style>
