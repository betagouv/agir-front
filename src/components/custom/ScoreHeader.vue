<template>
  <router-link
    :to="{ name: RouteClassementName.CLASSEMENT }"
    :aria-current="route.name === RouteClassementName.CLASSEMENT ? 'page' : null"
    class="tag__progression tag__progression--score fr-text--bold"
  >
    {{ score.points }} <img width="16" src="/ic_score.svg" alt="score" />
  </router-link>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { MissionEvent, MissionEventBusImpl } from '@/domaines/missions/missionEventBus.impl';
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

    MissionEventBusImpl.getInstance().subscribe(
      subscriberName,
      MissionEvent.OBJECTIF_MISSION_POINTS_ONT_ETE_RECUPERE,
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
    MissionEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
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
