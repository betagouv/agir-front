<template>
  <div class="tag__progression tag__progression--niveau fr-text--bold">
    {{ score.niveau }} <img width="16" src="/ic_star.svg" alt="niveau" />
  </div>
  <div class="tag__progression tag__progression--score fr-text--bold">
    {{ score.points }} <img width="16" src="/ic_score.svg" alt="score" />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue';
  import { ChargementScorePresenterImpl } from '@/domaines/score/adapters/chargementScore.presenter.impl';
  import { ScoreRepositoryAxios } from '@/domaines/score/adapters/score.repository.axios';
  import { ChargementScoreUsecase } from '@/domaines/score/chargementScore.usecase';
  import { ScoreViewModel } from '@/domaines/score/ports/chargementScore.presenter';
  import { ThematiqueEvent, ThematiqueEventBusImpl } from '@/domaines/thematiques/thematiqueEventBusImpl';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const score = computed(() => utilisateurStore().score);
  const subscriberName = 'ScoreHeader';

  onMounted(() => {
    mettreAJourLeScore();

    ThematiqueEventBusImpl.getInstance().subscribe(
      subscriberName,
      ThematiqueEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE,
      () => {
        mettreAJourLeScore();
      },
    );

    ToDoListEventBusImpl.getInstance().subscribeToAllEvents(subscriberName, () => {
      mettreAJourLeScore();
    });
  });

  onUnmounted(() => {
    ToDoListEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
    ThematiqueEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
  });

  const sauvegarderLeScoreEnLocal = (viewModel: ScoreViewModel) => {
    utilisateurStore().setScore(viewModel);
  };

  const mettreAJourLeScore = () => {
    const chargerScoreUseCase = new ChargementScoreUsecase(new ScoreRepositoryAxios());
    chargerScoreUseCase.execute(
      utilisateurStore().utilisateur.id,
      new ChargementScorePresenterImpl(async viewModel => {
        sauvegarderLeScoreEnLocal(viewModel);
      }),
    );
  };
</script>

<style scoped>
  .tag__progression {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    border-radius: 8px;
  }

  .tag__progression--score {
    background: rgba(104, 165, 50, 0.1);
  }

  .tag__progression--niveau {
    background: rgba(237, 142, 0, 0.1);
  }
</style>
