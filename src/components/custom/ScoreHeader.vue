<template>
  <div v-if="gamificationViewModel" class="flex">
    <router-link
      :aria-current="route.name === RouteClassementName.CLASSEMENT ? 'page' : null"
      :to="{ name: RouteClassementName.CLASSEMENT }"
      class="tag__progression tag__progression--score fr-text--bold"
    >
      {{ gamificationViewModel.points }} <img alt="points récoltés" src="/ic_score.svg" width="16" />
    </router-link>
    <router-link
      v-if="gamificationViewModel.nombreDeBadges > 0"
      :aria-current="route.name === RouteClassementName.CLASSEMENT ? 'page' : null"
      :to="{ name: RouteClassementName.CLASSEMENT }"
      class="tag__progression tag__progression--badge fr-text--bold fr-ml-2w"
    >
      {{ gamificationViewModel.nombreDeBadges }} <img alt="badge" src="/ic_badge.svg" width="16" />
    </router-link>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import {
    GamificationPresenterImpl,
    GamificationViewModel,
  } from '@/domaines/score/adapters/gamification.presenter.impl';
  import { ScoreRepositoryAxios } from '@/domaines/score/adapters/score.repository.axios';
  import { ChargementScoreUsecase } from '@/domaines/score/chargementScore.usecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { RouteClassementName } from '@/router/classement/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const route = useRoute();
  const subscriberName = 'ScoreHeader';
  const gamificationViewModel = ref<GamificationViewModel>();
  onMounted(() => {
    mettreAJourLeScore();

    ToDoListEventBusImpl.getInstance().subscribeToAllEvents(subscriberName, () => {
      mettreAJourLeScore();
    });

    ActionsEventBus.getInstance().subscribeToAllEvents(subscriberName, () => {
      mettreAJourLeScore();
    });
  });

  onUnmounted(() => {
    ToDoListEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
    ActionsEventBus.getInstance().unsubscribeToAllEvents(subscriberName);
  });

  const mettreAJourLeScore = () => {
    const chargerScoreUseCase = new ChargementScoreUsecase(new ScoreRepositoryAxios());
    chargerScoreUseCase.execute(
      utilisateurStore().utilisateur.id,
      new GamificationPresenterImpl((viewModel: GamificationViewModel) => {
        gamificationViewModel.value = viewModel;
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
  }

  .tag__progression--score {
    transition: background 0.3s ease;
    background: rgba(104, 165, 50, 0.1);
  }

  .tag__progression--score:hover {
    background: rgba(104, 165, 50, 0.25);
  }

  .tag__progression--badge {
    background: rgba(254, 236, 194, 0.6);
  }

  .tag__progression--badge:hover {
    background: rgba(254, 236, 194, 0.9);
  }
</style>
