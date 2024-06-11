<template>
  <div class="todo background--white shadow fr-p-2w border">
    <span v-if="estRecommande" class="todo__badge fr-badge background--bleu-info-dark text--white text--transform-none">
      Recommandé pour vous !
    </span>
    <img :src="picto" alt="" />
    <div class="fr-col fr-col-md-9">
      <h4 class="fr-m-0">
        <router-link :to="{ path: url, hash: hash }" class="todo__link display-block text--normal fr-text--lg fr-mb-0">
          <div v-html="titre" />
        </router-link>
      </h4>
      <div class="fr-col-6" v-if="value !== undefined && value > 0 && valueMax !== undefined">
        <CoachCardTodoProgression
          :value="value"
          :value-max="valueMax"
          label="Barre de progression: tâche à faire"
          couleur="#000091"
        />
      </div>
    </div>
    <span class="fr-icon-arrow-right-line todo__picto text--bleu fr-ml-auto" aria-hidden="true"></span>
  </div>
</template>

<script setup lang="ts">
  import CoachCardTodoProgression from '@/components/custom/Coach/CoachCardTodoProgression.vue';

  defineProps<{
    titre: string;
    value?: number;
    valueMax?: number;
    url: string;
    hash?: string;
    picto: string;
    estRecommande?: boolean;
  }>();
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

  .todo__badge {
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
