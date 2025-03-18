<template>
  <section class="background--white fr-p-2w fr-mb-3w shadow">
    <ActionIntroduction
      :introduction="actionSimulateurViewModel.introduction"
      :sources="actionSimulateurViewModel.sources"
    />

    <KyCsAction
      v-if="actionSimulateurViewModel.actionId === SimulateursSupportes.VOITURE"
      :action-id="actionSimulateurViewModel.actionId"
      :idEnchainementKycs="actionSimulateurViewModel.idEnchainementKYCs"
      :type-action="TypeAction.SIMULATEUR"
      class="fr-px-2w"
    >
      <template v-slot:fin>
        <SimulationResultatVoiture v-if="actionSimulateurViewModel.actionId === SimulateursSupportes.VOITURE" />
      </template>
    </KyCsAction>

    <SimulationMaif v-else-if="actionSimulateurViewModel.actionId === SimulateursSupportes.MAIF" />

    <ActionAides :aides="actionSimulateurViewModel.aides" />
  </section>
</template>

<script lang="ts" setup>
  import ActionAides from '@/components/custom/Action/composants/ActionAides.vue';
  import ActionIntroduction from '@/components/custom/Action/composants/ActionIntroduction.vue';
  import SimulationMaif from '@/components/custom/Action/SimulationMaif.vue';
  import SimulationResultatVoiture from '@/components/custom/Action/SimulationResultatVoiture.vue';
  import KyCsAction from '@/components/custom/KYC/KYCsAction.vue';
  import { ActionSimulateurViewModel } from '@/domaines/actions/ports/action.presenter';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { SimulateursSupportes } from '@/shell/simulateursSupportes';

  defineProps<{ actionSimulateurViewModel: ActionSimulateurViewModel }>();

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data.kind === 'mesaidesreno-resize-height') {
      const iframe = document.getElementById('mesaidesreno') as HTMLIFrameElement;
      iframe.style.height = `${event.data.value}px`;
    }
  });
</script>
