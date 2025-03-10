<template>
  <section class="background--white fr-p-2w fr-mb-3w shadow">
    <SimulationAction :kycs="actionSimulateurViewModel.kycs" :action-id="actionSimulateurViewModel.actionId" />

    <section v-if="actionSimulateurViewModel.aides?.length > 0" class="fr-p-2w fr-mt-2w">
      <h2>Aides et bons plans !</h2>
      <GrilleAidesDUneAction :aides="actionSimulateurViewModel.aides" />
    </section>
  </section>
</template>

<script lang="ts" setup>
  import GrilleAidesDUneAction from '@/components/custom/Aides/GrilleAidesDUneAction.vue';
  import SimulationAction from '@/components/custom/KYC/SimulationAction.vue';
  import { ActionSimulateurViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ actionSimulateurViewModel: ActionSimulateurViewModel }>();
</script>
