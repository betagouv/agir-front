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
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { ChargementScorePresenterImpl } from '@/domaines/score/adapters/chargementScore.presenter.impl';
  import { ScoreRepositoryAxios } from '@/domaines/score/adapters/score.repository.axios';
  import { ChargementScoreUsecase } from '@/domaines/score/chargementScore.usecase';
  import { ScoreViewModel } from '@/domaines/score/ports/chargementScore.presenter';
  import { ThematiqueEvent, ThematiqueEventBusImpl } from '@/domaines/thematiques/thematiqueEventBusImpl';
  import { ToDoListEvent, ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
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

    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE, () => {
      mettreAJourLeScore();
    });
    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_ARTICLE_A_ETE_LU, () => {
      mettreAJourLeScore();
    });
    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_A_ETE_TERMINEE, () => {
      mettreAJourLeScore();
    });
    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_QUIZ_ETE_TERMINE, () => {
      mettreAJourLeScore();
    });
    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_KYC_A_ETE_REPONDU, () => {
      mettreAJourLeScore();
    });
    ToDoListEventBusImpl.getInstance().subscribe(
      subscriberName,
      ToDoListEvent.TODO_RECOMMANDATION_A_ETE_CLIQUEE,
      () => {
        mettreAJourLeScore();
      },
    );
    ToDoListEventBusImpl.getInstance().subscribe(subscriberName, ToDoListEvent.TODO_LINKY_A_ETE_CONSULTE, () => {
      mettreAJourLeScore();
    });
  });

  onUnmounted(() => {
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_POINTS_ONT_ETE_RECUPERE);
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_ARTICLE_A_ETE_LU);
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_A_ETE_TERMINEE);
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_QUIZ_ETE_TERMINE);
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_KYC_A_ETE_REPONDU);
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_RECOMMANDATION_A_ETE_CLIQUEE);
    ToDoListEventBusImpl.getInstance().unsubscribe(subscriberName, ToDoListEvent.TODO_LINKY_A_ETE_CONSULTE);
    ThematiqueEventBusImpl.getInstance().unsubscribe(
      subscriberName,
      ThematiqueEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE,
    );
  });

  const sauvegarderLeScoreEnLocal = (viewModel: ScoreViewModel) => {
    utilisateurStore().setScore(viewModel);
  };

  const mettreAJourLeScore = () => {
    const chargerScoreUseCase = new ChargementScoreUsecase(new ScoreRepositoryAxios(), new SessionRepositoryStore());
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
