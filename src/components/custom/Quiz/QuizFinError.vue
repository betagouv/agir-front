<template>
  <div class="quiz-fin--erreur fr-grid-row fr-grid-row--middle flex-column fr-py-8w">
    <span class="fr-display--xs fr-mb-2w">Dommage !</span>
    <span class="text--rouge-erreur text--3xl fr-mb-2w">Au moins 1 mauvaise réponse</span>
    <span class="fr-text--lead fr-text--bold">Vous pourrez tenter à nouveau !</span>
    <router-link
      class="fr-btn fr-btn--lg fr-btn--primary fr-btn--icon-right fr-icon-arrow-right-line"
      :to="{ name: RouteCoachName.COACH }"
    >
      Continuer
    </router-link>
  </div>
</template>

<style scoped>
  .quiz-fin--erreur {
    background-image: url('/bg_quiz-erreur.jpg');
    background-position: center;
    background-size: cover;
  }
</style>
<script setup>
  import { RouteCoachName } from '@/router/coach/routes.js';
</script>
