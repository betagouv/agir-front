<template>
  <ActionAsideAFaire
    v-if="!estRealise"
    sous-titre="Terminez votre simulateur et gagnez"
    :points="actionBaseViewModel.points"
  />
  <ActionAsideRealisee v-else sous-titre="Vous avez réalisé votre simulateur" :points="actionBaseViewModel.points" />

  <template v-if="nombreActionRealise > 0">
    <hr />

    <p class="fr-mb-1w">
      <span class="text--bold">
        {{ nombreActionRealise }}
        {{ gererPluriel(nombreActionRealise, 'simulation terminée', 'simulations terminées') }}
      </span>
      par la communauté
    </p>
  </template>
</template>

<script lang="ts" setup>
  import { onUnmounted, ref } from 'vue';
  import ActionAsideAFaire from '@/components/custom/Action/Aside/ActionAsideAFaire.vue';
  import ActionAsideRealisee from '@/components/custom/Action/Aside/ActionAsideRealisee.vue';
  import { ActionsEvent, ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';
  import { gererPluriel } from '@/shell/pluriel';

  const props = defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();

  const estRealise = ref<boolean>(props.actionBaseViewModel.realisee);
  const nombreActionRealise = ref<number>(props.actionBaseViewModel.nombreDeRealisations);

  ActionsEventBus.getInstance().subscribe('ActionAsideSimulateur', ActionsEvent.A_ETE_REALISEE, () => {
    estRealise.value = true;
    nombreActionRealise.value = nombreActionRealise.value + 1;
  });

  onUnmounted(() => {
    ActionsEventBus.getInstance().unsubscribeToAllEvents('ActionAsideSimulateur');
  });
</script>
