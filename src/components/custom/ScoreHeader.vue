<template>
  <router-link
    :aria-current="route.name === RouteClassementName.CLASSEMENT ? 'page' : null"
    :to="{ name: RouteClassementName.CLASSEMENT }"
    class="tag__progression tag__progression--score fr-text--bold"
  >
    {{ score.points }} <img alt="score" src="/ic_score.svg" width="16" />
  </router-link>
</template>

<script lang="ts" setup>
  import { computed, onMounted, onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { ScoreRepositoryAxios } from '@/domaines/score/adapters/score.repository.axios';
  import { ChargementScoreUsecase } from '@/domaines/score/chargementScore.usecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { RouteClassementName } from '@/router/classement/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const route = useRoute();
  const score = computed(() => utilisateurStore().score);
  const subscriberName = 'ScoreHeader';

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
    const chargerScoreUseCase = new ChargementScoreUsecase(new ScoreRepositoryAxios(), new SessionRepositoryStore());
    chargerScoreUseCase.execute(utilisateurStore().utilisateur.id);
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
    transition: background 0.3s ease;
    background: rgba(104, 165, 50, 0.1);
  }

  .tag__progression--score:hover {
    background: rgba(104, 165, 50, 0.25);
  }

  .tag__progression--niveau {
    background: rgba(237, 142, 0, 0.1);
  }
</style>
