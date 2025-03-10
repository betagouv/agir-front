<template>
  <section class="background--white fr-p-2w fr-mb-3w shadow">
    <ActionIntroduction :introduction="actionSimulateurViewModel.introduction" />

    <SimulationAction :kycs="actionSimulateurViewModel.kycs" :action-id="actionSimulateurViewModel.actionId" />

    <ActionAides :aides="actionSimulateurViewModel.aides" />
  </section>
</template>

<script lang="ts" setup>
  import ActionAides from '@/components/custom/Action/composants/ActionAides.vue';
  import ActionIntroduction from '@/components/custom/Action/composants/ActionIntroduction.vue';
  import SimulationAction from '@/components/custom/KYC/SimulationAction.vue';
  import { ActionSimulateurViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ actionSimulateurViewModel: ActionSimulateurViewModel }>();
</script>
