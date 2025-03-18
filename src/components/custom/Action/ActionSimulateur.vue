<template>
  <section class="background--white fr-p-2w fr-mb-3w shadow">
    <ActionIntroduction :introduction="actionSimulateurViewModel.introduction" />

    <div v-if="actionSimulateurViewModel.actionId === 'action_simulateur_voiture'">
      <SimulationAction :action-id="actionSimulateurViewModel.actionId" :kycs="actionSimulateurViewModel.kycs">
        <template v-slot:fin>
          <SimulationResultatVoiture v-if="actionSimulateurViewModel.actionId === 'action_simulateur_voiture'" />
        </template>
      </SimulationAction>
    </div>
    <div v-else>
      <iframe
        id="mesaidesreno"
        allow="clipboard-read; clipboard-write"
        src="https://mesaidesreno.beta.gouv.fr/"
        style="width: 100%"
      ></iframe>
    </div>

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

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data.kind === 'mesaidesreno-resize-height') {
      const iframe = document.getElementById('mesaidesreno') as HTMLIFrameElement;
      iframe.style.height = `${event.data.value}px`;
    }
  });
</script>
