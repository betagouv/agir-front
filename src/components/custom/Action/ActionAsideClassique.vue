<template>
  <template v-if="!actionBaseViewModel.realisee">
    <h2 class="fr-h4">On se lance le défi ?</h2>
    <p>Réalisez cette action dans les prochaines semaines et partagez vos retours</p>
    <button class="fr-btn full-width flex flex-center align-items--center gap--small" @click="terminerAction">
      J'ai relevé le défi !
      <span class="text--bold flex align-items--center">
        +50&nbsp;<img src="/ic_score.svg" alt="points" class="full-width full-height" />
      </span>
    </button>
  </template>

  <template v-else>
    <div class="flex flex-space-between align-items--center">
      <div>
        <h2 class="fr-h4">Bravo ! 🎉</h2>
        <p class="fr-mb-0">Vous avez réalisé cette action</p>
      </div>

      <div class="border-radius--md background--vert-points grayscaled fr-p-1w">
        <span class="flex align-items--center text--bold" aria-label="Vous avez déjà obtenu 50 points">
          <img src="/ic_score.svg" alt="points" class="full-width full-height fr-mr-1v" /> 50
        </span>
      </div>
    </div>
  </template>

  <hr />

  <p>{{ actionBaseViewModel.nombreDeRealisations }} actions réalisées par la communauté</p>
</template>

<script lang="ts" setup>
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { TerminerActionUsecase } from '@/domaines/actions/terminerAction.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();

  const terminerAction = async () => {
    const usecase = new TerminerActionUsecase(new ActionsRepositoryAxios(), ActionsEventBus.getInstance());
    await usecase.execute(utilisateurStore().utilisateur.id, actionBaseViewModel.id, TypeAction.QUIZZ);
  };
</script>

<style scoped>
  .background--vert-points {
    background: #f1f6ec;
  }

  .grayscaled {
    filter: grayscale(1);
  }
</style>
