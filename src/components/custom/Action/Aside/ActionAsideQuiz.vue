<template>
  <ActionAsideAFaire v-if="!estRealise" :points="actionBaseViewModel.points" sous-titre="Obtenez 4 bonnes réponses" />
  <ActionAsideRealisee v-else :points="actionBaseViewModel.points" sous-titre="Vous avez réalisé votre quiz" />

  <template v-if="nombreActionRealise > 1">
    <hr />

    <p class="fr-mb-1w">
      <span class="text--bold"> {{ nombreActionRealise }} quiz terminés </span>
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

  const props = defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();

  const estRealise = ref<boolean>(props.actionBaseViewModel.realisee);
  const nombreActionRealise = ref<number>(props.actionBaseViewModel.nombreDeRealisations);

  ActionsEventBus.getInstance().subscribe('ActionAsideQuiz', ActionsEvent.A_ETE_REALISEE, () => {
    if (estRealise.value) return;

    estRealise.value = true;
    nombreActionRealise.value = nombreActionRealise.value + 1;
  });

  onUnmounted(() => {
    ActionsEventBus.getInstance().unsubscribeToAllEvents('ActionAsideQuiz');
  });
</script>
