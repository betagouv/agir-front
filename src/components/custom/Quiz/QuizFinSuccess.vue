<template>
  <div class="quiz-fin--success fr-grid-row fr-grid-row--middle flex-column fr-py-8w">
    <span class="fr-display--xs fr-mb-2w">Bien joué !</span>
    <span class="text--bleu text--3xl fr-mb-2w">Toutes les réponses sont correctes</span>
    <span class="fr-text--lead fr-text--bold">
      Récoltez + {{ nombreDePointsAGagner }}
      <img src="/ic_score.svg" width="24" alt="points" />
    </span>
    <router-link
      class="fr-btn fr-btn--lg fr-btn--primary fr-btn--icon-right fr-icon-arrow-right-line"
      :to="{ name: RouteCoachName.COACH }"
    >
      Continuer
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import { RouteCoachName } from '@/router/coach/routeCoachName';

  defineProps<{ nombreDePointsAGagner: string }>();
</script>

<style scoped>
  .quiz-fin--success {
    background-image: url('/bg_quiz-success.jpg');
    background-position: center;
    background-size: cover;
  }
</style>
