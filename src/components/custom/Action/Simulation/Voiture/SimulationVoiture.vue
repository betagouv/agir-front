<template>
  <KyCsAction
    :action-id="SimulateursSupportes.VOITURE"
    :idEnchainementKycs="idEnchainementKycs"
    :type-action="TypeAction.SIMULATEUR"
    class="fr-px-2w"
  >
    <template v-slot:fin>
      <SimulationResultatVoiture />
    </template>
  </KyCsAction>
</template>

<script setup lang="ts">
  import SimulationResultatVoiture from '@/components/custom/Action/Simulation/Voiture/SimulationResultatVoiture.vue';
  import KyCsAction from '@/components/custom/KYC/KYCsAction.vue';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository.js';
  import { SimulateursSupportes } from '@/shell/simulateursSupportes.js';

  defineProps<{
    idEnchainementKycs: string;
  }>();
</script>
