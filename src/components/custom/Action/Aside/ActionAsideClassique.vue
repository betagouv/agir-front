<template>
  <template v-if="!estRealise">
    <h2 class="fr-h4">On se lance le défi ?</h2>
    <p>{{ actionBaseViewModel.consigne }}</p>
    <button class="fr-btn full-width flex flex-center align-items--center gap--small" @click="terminerAction">
      J'ai relevé le défi !
      <span class="text--bold flex align-items--center">
        +{{ actionBaseViewModel.points }}&nbsp;<img alt="points" class="full-width full-height" src="/ic_score.svg" />
      </span>
    </button>
  </template>

  <ActionAsideRealisee v-else :points="actionBaseViewModel.points" />

  <template v-if="nombreActionRealise > 1">
    <hr />

    <p v-html="actionBaseViewModel.labelCompteur"></p>
  </template>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ActionAsideRealisee from '@/components/custom/Action/Aside/ActionAsideRealisee.vue';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { TerminerActionUsecase } from '@/domaines/actions/terminerAction.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();

  const estRealise = ref<boolean>(props.actionBaseViewModel.realisee);
  const nombreActionRealise = ref<number>(props.actionBaseViewModel.nombreDeRealisations);

  const terminerAction = async () => {
    const usecase = new TerminerActionUsecase(new ActionsRepositoryAxios(), ActionsEventBus.getInstance());
    await usecase.execute(utilisateurStore().utilisateur.id, props.actionBaseViewModel.actionId, TypeAction.CLASSIQUE);
    nombreActionRealise.value = nombreActionRealise.value + 1;
    estRealise.value = true;
  };
</script>
