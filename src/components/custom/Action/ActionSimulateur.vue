<template>
  <section class="background--white fr-p-2w fr-mb-3w shadow">
    <ActionIntroduction
      :introduction="actionSimulateurViewModel.introduction"
      :sources="actionSimulateurViewModel.sources"
    />

    <KyCsAction
      :action-id="actionSimulateurViewModel.actionId"
      :idEnchainementKycs="actionSimulateurViewModel.idEnchainementKYCs"
      :type-action="TypeAction.SIMULATEUR"
      class="fr-px-2w"
    >
      <template v-slot:fin>
        <SimulationResultatVoiture v-if="actionSimulateurViewModel.actionId === 'action_simulateur_voiture'" />
      </template>
    </KyCsAction>

    <ActionAides :aides="actionSimulateurViewModel.aides" />
  </section>
</template>

<script lang="ts" setup>
  import ActionAides from '@/components/custom/Action/composants/ActionAides.vue';
  import ActionIntroduction from '@/components/custom/Action/composants/ActionIntroduction.vue';
  import SimulationResultatVoiture from '@/components/custom/Action/SimulationResultatVoiture.vue';
  import KyCsAction from '@/components/custom/KYC/KYCsAction.vue';
  import { ActionSimulateurViewModel } from '@/domaines/actions/ports/action.presenter';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';

  defineProps<{ actionSimulateurViewModel: ActionSimulateurViewModel }>();
</script>
