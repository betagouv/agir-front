<template>
  <h2 class="fr-h4 fr-mb-1w">{{ defi.libelle }}</h2>
  <span v-if="defi.description" class="fr-text--xs text--mention-grey">{{ defi.description }}</span>

  <div class="defi-accepete--message-success border-radius--md fr-p-3w fr-my-2w">
    <h3 class="fr-h4">👍 Défi accepté</h3>
    <p class="fr-mb-0 text--gris fr-text--lg fr-text--bold">
      Nous reviendrons vers vous pour savoir où vous en êtes dans 1 semaine !
    </p>
  </div>
  <div class="defi-accepte fr-mb-2w">
    <span class="fr-text--bold"> Bien joué ! </span>
    Vous récoltez <span class="fr-text--bold">+{{ defi.points }}</span>
    <img width="32" src="/ic_score.svg" alt="points" />
  </div>
  <router-link class="fr-btn fr-btn--icon-left fr-icon-arrow-left-line" :to="{ name: RouteCoachName.COACH }">
    Revenir à l'accueil
  </router-link>
</template>

<script setup lang="ts">
  import { DefiViewModel } from '@/defi/adapters/defi.presenter.impl';
  import { RouteCoachName } from '@/router/coach/routeCoachName';

  defineProps<{ defi: DefiViewModel }>();
</script>

<style scoped>
  .defi-accepte {
    display: flex;
    width: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    gap: 0.5rem;
    background-image: url('/article-quiz-gagne.png');
    background-size: contain;
    background-position: center;
  }

  .defi-accepete--message-success {
    background-color: #e1edd6;
  }
</style>
