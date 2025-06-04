<template>
  <section class="background--white fr-p-2w fr-mb-3w shadow">
    <ActionIntroduction
      :introduction="actionSimulateurViewModel.introduction"
      :sources="actionSimulateurViewModel.sources"
    />

    <SimulationVoiture
      v-if="actionSimulateurViewModel.actionId === SimulateursSupportes.VOITURE"
      :id-enchainement-kycs="actionSimulateurViewModel.idEnchainementKYCs"
    />
    <SimulationMaif v-else-if="actionSimulateurViewModel.actionId === SimulateursSupportes.MAIF" />
    <SimulationAideRenos v-else-if="actionSimulateurViewModel.actionId === SimulateursSupportes.MES_AIDES_RENO" />

    <ActionAides :aides="actionSimulateurViewModel.aides" />
  </section>
</template>

<script lang="ts" setup>
  import ActionAides from '@/components/custom/Action/composants/ActionAides.vue';
  import ActionIntroduction from '@/components/custom/Action/composants/ActionIntroduction.vue';
  import SimulationAideRenos from '@/components/custom/Action/Simulation/AidesReno/SimulationAideRenos.vue';
  import SimulationMaif from '@/components/custom/Action/Simulation/Maif/SimulationMaif.vue';
  import SimulationVoiture from '@/components/custom/Action/Simulation/Voiture/SimulationVoiture.vue';
  import { ActionSimulateurViewModel } from '@/domaines/actions/ports/action.presenter';
  import { SimulateursSupportes } from '@/shell/simulateursSupportes';

  defineProps<{ actionSimulateurViewModel: ActionSimulateurViewModel }>();
</script>
