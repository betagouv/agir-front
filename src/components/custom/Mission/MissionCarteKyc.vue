<template>
  <div class="todo background--white shadow fr-p-3w border">
    <img :src="mission.picto" alt="" />
    <div class="fr-col fr-col-md-9">
      <h3 class="fr-m-0">
        <router-link :to="{ path: mission.url }" class="todo__link display-block text--normal fr-text--lg fr-mb-0">
          <div v-html="mission.titre" />
        </router-link>
      </h3>
      <div
        class="fr-col-6"
        v-if="
          mission.progression.etapeCourante !== undefined &&
          mission.progression.etapeCourante > 0 &&
          mission.progression.etapeTotal !== undefined
        "
      >
        <CoachCardTodoProgression
          :value="mission.progression.etapeCourante"
          :value-max="mission.progression.etapeTotal"
          label="Barre de progression: tâche à faire"
          couleur="#000091"
        />
      </div>
    </div>
    <div class="fr-ml-auto">
      <span v-if="mission.points" class="background--white fr-text--bold fr-p-1w fr-mr-2w">
        {{ mission.points }}
        <img width="16" src="/ic_score.svg" alt="point" />
      </span>
      <span class="fr-icon-arrow-right-line todo__picto text--bleu" aria-hidden="true"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CoachCardTodoProgression from '@/components/custom/Coach/CoachCardTodoProgression.vue';
  import { MissionKycViewModel } from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';

  defineProps<{ mission: MissionKycViewModel }>();
</script>

<style scoped>
  .todo {
    position: relative;
    display: flex;
    gap: 1rem;
    align-items: center;
    border-radius: 8px;
    transition: box-shadow 0.3s ease;
  }

  .item__badge {
    position: absolute;
    top: 0;
    left: 3rem;
    transform: translateY(-50%);
  }

  .todo:hover {
    box-shadow: 0 10px 30px 0 rgba(0, 0, 18, 0.3);
  }

  .todo__link {
    background: none;
  }

  .todo:hover .fr-icon-arrow-right-line::before {
    animation: slide1 1s ease-in-out infinite;
  }

  .todo__link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }

  .todo__picto::before {
    --icon-size: 2rem;
  }

  @keyframes slide1 {
    0%,
    100% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(10px, 0);
    }
  }
</style>
