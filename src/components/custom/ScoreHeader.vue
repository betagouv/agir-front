<template>
  <div class="tag__progression niveau fr-text--bold">
    {{ score.niveau }} <img width="16" src="/ic_star.svg" alt="niveau" />
  </div>
  <div class="tag__progression score fr-text--bold">
    {{ score.points }} <img width="16" src="/ic_score.svg" alt="score" />
  </div>

  <Teleport to="body">
    <Modale titre="Passage de niveau" label="Modale de passage de niveau" id="passageDeNiveau">
      <CarteScore :value="utilisateurStore().score.niveau" type="niveau" class="fr-mb-2w" />
      <div class="text--center">
        <button class="fr-btn fr-btn--icon-right fr-icon-arrow-right-line" aria-controls="passageDeNiveau">
          Continuer
        </button>
      </div>
    </Modale>
    <button class="fr-btn fr-hidden" data-fr-opened="false" aria-controls="passageDeNiveau">
      Modale avec zone d'action
    </button>
  </Teleport>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ScoreViewModel } from '@/score/ports/chargementScore.presenter';
  import { ChargementScoreUsecase } from '@/score/chargementScore.usecase';
  import { ScoreRepositoryAxios } from '@/score/adapters/score.repository.axios';
  import { ChargementScorePresenterImpl } from '@/score/adapters/chargementScore.presenter.impl';
  import { ToDoListEvent, ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';
  import Modale from '@/components/custom/Modale/Modale.vue';
  import CarteScore from '@/components/custom/Progression/CarteScore.vue';
  import ModaleActions from '@/components/custom/Modale/ModaleActions';
  import { ValiderCelebrationUsecase } from '@/celebration/validerCelebration.usecase';
  import { CelebrationRepositoryAxios } from '@/celebration/adapters/celebration.repository.axios';

  const score = computed(() => utilisateurStore().score);

  onMounted(() => {
    mettreAJourLeScore();

    function sauvegarderLeScoreEnLocal(viewModel: ScoreViewModel) {
      utilisateurStore().setScore(viewModel);
    }

    function declencherCelebration(celebrationId: string) {
      new ModaleActions('passageDeNiveau').open();

      new ValiderCelebrationUsecase(new CelebrationRepositoryAxios()).execute(
        utilisateurStore().utilisateur.id,
        celebrationId
      );
    }

    function mettreAJourLeScore() {
      const chargerScoreUseCase = new ChargementScoreUsecase(new ScoreRepositoryAxios());
      chargerScoreUseCase.execute(
        utilisateurStore().utilisateur.id,
        new ChargementScorePresenterImpl(async viewModel => {
          sauvegarderLeScoreEnLocal(viewModel);

          if (viewModel.celebration) {
            declencherCelebration(viewModel.celebration.id);
          }
        })
      );
    }

    ToDoListEventBusImpl.getInstance().subscribe(ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE, () => {
      mettreAJourLeScore();
    });
    ToDoListEventBusImpl.getInstance().subscribe(ToDoListEvent.TODO_ARTICLE_A_ETE_LU, () => {
      mettreAJourLeScore();
    });
    ToDoListEventBusImpl.getInstance().subscribe(ToDoListEvent.TODO_A_ETE_TERMINEE, () => {
      mettreAJourLeScore();
    });
    ToDoListEventBusImpl.getInstance().subscribe(ToDoListEvent.TODO_QUIZ_ETE_TERMINE, () => {
      mettreAJourLeScore();
    });
  });

  onUnmounted(() => {
    ToDoListEventBusImpl.getInstance().unsubscribe(ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE);
    ToDoListEventBusImpl.getInstance().unsubscribe(ToDoListEvent.TODO_ARTICLE_A_ETE_LU);
    ToDoListEventBusImpl.getInstance().unsubscribe(ToDoListEvent.TODO_A_ETE_TERMINEE);
    ToDoListEventBusImpl.getInstance().unsubscribe(ToDoListEvent.TODO_QUIZ_ETE_TERMINE);
  });
</script>

<style scoped>
  .tag__progression {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    border-radius: 8px;
  }

  .tag__progression.score {
    background: rgba(104, 165, 50, 0.1);
  }

  .tag__progression.niveau {
    background: rgba(237, 142, 0, 0.1);
  }
</style>
