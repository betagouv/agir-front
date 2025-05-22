<template>
  <section>
    <BanniereCollectivite />
  </section>

  <section>
    <ResponsableMobilisationCitoyenne />
  </section>

  <section>
    <ApprocheSimplifiee lien-rdv="google.com" />
  </section>

  <section>
    <CommuniquerSurJagis />
  </section>

  <section>
    <LandingRappelAppCTA />
  </section>
</template>

<script lang="ts" setup>
  import ApprocheSimplifiee from '@/components/custom/CollectivitesLanding/ApprocheSimplifiee.vue';
  import BanniereCollectivite from '@/components/custom/CollectivitesLanding/BanniereCollectivite.vue';
  import CommuniquerSurJagis from '@/components/custom/CollectivitesLanding/CommuniquerSurJagis.vue';
  import ResponsableMobilisationCitoyenne from '@/components/custom/CollectivitesLanding/ResponsableMobilisationCitoyenne.vue';
  import LandingRappelAppCTA from '@/components/custom/Landing/LandingRappelAppCTA.vue';
</script>
