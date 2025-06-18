<template>
  <div class="background--vert text--white">
    <div class="fr-container">
      <div class="position--relative flex flex-space-between full-height">
        <div class="flex align-items--center">
          <img src="/ic_ngc_small.webp" class="logo-ngc fr-mr-1w" alt="" />

          <router-link
            :to="{ name: RouteBilanCarboneName.BILAN_CARBONE }"
            class="enlever-background-actif-dsfr text--bold fr-icon-arrow-right-s-line fr-link--icon-right fr-text--lg fr-m-0 fr-my-3w text--white"
          >
            Calculer mon empreinte écologique
          </router-link>
        </div>

        <div class="illustration">
          <img src="/illustration-encart-empreinte.svg" alt="" class="fr-hidden fr-unhidden-lg full-height" />
        </div>

        <EncartEmpreinteProgressBar v-if="progression < 100" :progression="props.progression" />
        <EncartEmpreinteResultat v-else :tonnes="props.tonnes" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import EncartEmpreinteProgressBar from '@/components/custom/AccueilConnectee/EncartEmpreinteProgressBar.vue';
  import EncartEmpreinteResultat from '@/components/custom/AccueilConnectee/EncartEmpreinteResultat.vue';
  import { RouteBilanCarboneName } from '@/router/bilanCarbone/routes.js';

  const props = defineProps<{ progression: number; tonnes: number }>();
</script>

<style scoped>
  .logo-ngc {
    width: 2rem;
    height: 2rem;
  }

  .enlever-background-actif-dsfr:active {
    background-color: transparent;
  }
</style>
