<template>
  <section class="background--white fr-p-2w fr-mb-3w shadow">
    <ActionIntroduction :introduction="actionSimulateurViewModel.introduction" />

    <SimulationAction :kycs="actionSimulateurViewModel.kycs" :action-id="actionSimulateurViewModel.actionId">
      <template v-slot:fin>
        <SimulationResultatVoiture v-if="actionSimulateurViewModel.actionId === 'action_simulateur_voiture'" />
      </template>
    </SimulationAction>

    <ActionAides :aides="actionSimulateurViewModel.aides" />
  </section>
</template>

<script lang="ts" setup>
  import ActionAides from '@/components/custom/Action/composants/ActionAides.vue';
  import ActionIntroduction from '@/components/custom/Action/composants/ActionIntroduction.vue';
  import SimulationResultatVoiture from '@/components/custom/Action/SimulationResultatVoiture.vue';
  import SimulationAction from '@/components/custom/KYC/SimulationAction.vue';
  import { ActionSimulateurViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ actionSimulateurViewModel: ActionSimulateurViewModel }>();
</script>
