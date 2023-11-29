<template>
  <div class="tag__progression niveau fr-text--bold">1 <img width="16" src="/ic_star.svg" alt="niveau" /></div>
  <div class="tag__progression score fr-text--bold">
    {{ score.points }} <img width="16" src="/ic_score.svg" alt="score" />
  </div>
</template>
<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ScoreViewModel } from '@/score/ports/chargementScore.presenter';
  import { ChargementScoreUsecase } from '@/score/chargementScore.usecase';
  import { ScoreRepositoryAxios } from '@/score/adapters/score.repository.axios';
  import { ChargementScorePresenterImpl } from '@/score/adapters/chargementScore.presenter.impl';
  import { ToDoListEvent, ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';

  const score = computed(() => utilisateurStore().score);

  onMounted(() => {
    mettreAJourLeScore();

    function sauvegarderLeScoreEnLocal(viewModel: ScoreViewModel) {
      console.log(viewModel);
      utilisateurStore().setScore(viewModel);
    }

    function mettreAJourLeScore() {
      const chargerScoreUseCase = new ChargementScoreUsecase(new ScoreRepositoryAxios());
      chargerScoreUseCase.execute(
        utilisateurStore().utilisateur.id,
        new ChargementScorePresenterImpl(sauvegarderLeScoreEnLocal)
      );
    }

    ToDoListEventBusImpl.getInstance().subscribe(ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE, () => {
      mettreAJourLeScore();
    });
    ToDoListEventBusImpl.getInstance().subscribe(ToDoListEvent.TODO_ARTICLE_A_ETE_LU, () => {
      mettreAJourLeScore();
    });
  });

  onUnmounted(() => {
    console.log('onUnmounted');
    ToDoListEventBusImpl.getInstance().unsubscribe(ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE);
    ToDoListEventBusImpl.getInstance().unsubscribe(ToDoListEvent.TODO_ARTICLE_A_ETE_LU);
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

  @media (min-width: 62em) {
  }
</style>
