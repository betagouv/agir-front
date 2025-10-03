<template>
  <section>
    <BanniereCollectivite :lien-rdv="priseDeRdv" />
  </section>

  <section>
    <ResponsableMobilisationCitoyenne />
  </section>

  <section>
    <ApprocheSimplifiee :lien-rdv="priseDeRdv" />
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
  import { trackClick } from '@/shell/tracking/matomo';

  interface PriseDeRdv {
    lien: string;
    fonctionTracking: () => void;
  }

  const priseDeRdv: PriseDeRdv = {
    fonctionTracking: () => {
      trackClick('Collectivité', `Prise de RDV`);
    },
    lien: 'https://meet.brevo.com/jagis',
  };
</script>
