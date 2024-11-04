<template>
  <div class="todo background--white fr-p-2w shadow">
    <span class="fr-icon-checkbox-circle-line todo__picto text--success" aria-hidden="true"></span>
    <div class="fr-col fr-col-md-7">
      <h3 class="fr-text--bold fr-text--lg text--success fr-mb-0 display-block">
        <router-link :to="{ path: mission.url }" class="background--none fr-mb-0">
          <span v-html="mission.titre" />
        </router-link>
      </h3>
    </div>
    <div class="todo__boutonContainer fr-ml-auto">
      <span v-if="!mission.pointAEteRecolte" class="text--uppercase fr-mb-0 fr-text--xs text--gris-dark fr-text--bold">
        Objectif réalisé
      </span>
      <button
        class="fr-btn fr-btn--secondary fr-text--md todo__bouton"
        @click="onRecolterPoints(mission.id)"
        :disabled="mission.pointAEteRecolte"
      >
        <span class="fr-hidden fr-unhidden-md"> Récolter vos </span> &nbsp;{{ mission.points }}
        <img src="/ic_score.svg" alt="points" width="16" class="fr-ml-1v" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { MissionBaseViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';
  import { MissionsRepositoryAxios } from '@/domaines/missions/adapters/missions.repository.axios';
  import { MissionEventBusImpl } from '@/domaines/missions/missionEventBus.impl';
  import { RecupererPointsMissionUsecase } from '@/domaines/missions/recupererPointsMission.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{ mission: MissionBaseViewModel }>();

  const onRecolterPoints = (missionId: string) => {
    const utilisateurId: string = utilisateurStore().utilisateur.id;
    new RecupererPointsMissionUsecase(new MissionsRepositoryAxios(), MissionEventBusImpl.getInstance()).execute(
      utilisateurId,
      missionId,
    );
  };
</script>

<style scoped>
  .todo {
    position: relative;
    display: flex;
    gap: 1rem;
    align-items: center;
    border-radius: 8px;
  }

  .todo__picto::before {
    --icon-size: 2rem;
  }

  .todo__boutonContainer {
    display: grid;
    text-align: center;
  }

  .todo__bouton:not([disabled]) {
    animation: shake 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite both;
  }

  @keyframes shake {
    0%,
    60% {
      transform: rotate(0deg);
      transform-origin: 50% 100%;
    }
    5% {
      transform: rotate(1deg);
    }
    10%,
    20%,
    30% {
      transform: rotate(-2deg);
    }
    15%,
    25%,
    35% {
      transform: rotate(2deg);
    }
    50% {
      transform: rotate(-2deg);
    }
    60% {
      transform: rotate(1deg);
    }
  }
</style>
