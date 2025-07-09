<template>
  <KyCsAction
    :action-id="SimulateursSupportes.VOITURE"
    :idEnchainementKycs="idEnchainementKycs"
    :type-action="TypeAction.SIMULATEUR"
    @fin-kyc-atteinte="focusResultat"
    class="fr-px-2w"
  >
    <template v-slot:fin>
      <SimulationResultatVoiture ref="simulationResultatVoitureRef" />
    </template>
  </KyCsAction>
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue';
  import SimulationResultatVoiture from '@/components/custom/Action/Simulation/Voiture/SimulationResultatVoiture.vue';
  import KyCsAction from '@/components/custom/KYC/KYCsAction.vue';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository.js';
  import { SimulateursSupportes } from '@/shell/simulateursSupportes.js';

  defineProps<{
    idEnchainementKycs: string;
  }>();

  const simulationResultatVoitureRef = ref<InstanceType<typeof SimulationResultatVoiture>>();

  async function focusResultat() {
    await nextTick();
    simulationResultatVoitureRef.value?.focus();
  }
</script>
