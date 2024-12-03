<template>
  <div v-if="reponseCorrecte" class="quiz-reponse__gagne fr-text--xl">
    <p class="fr-mb-0">
      <span class="fr-text--bold"> Bien joué ! </span> Vous récoltez <span class="fr-text--bold">+{{ points }}</span>
    </p>
    <img width="32" src="/ic_score.svg" alt="points" />
  </div>
  <h2 class="fr-h4 fr-mb-2w">Pourquoi ?</h2>
  <div class="cms__content" v-html="texteExplication" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { ArticleDuQuiz } from '@/domaines/quiz/ports/quizRepository';

  const props = defineProps<{
    texteExplicationKO: string | null;
    texteExplicationOK: string | null;
    reponseCorrecte: boolean;
    articleAssocie: ArticleDuQuiz | null;
    points: string;
  }>();

  const texteExplication = computed(() => {
    if (props.reponseCorrecte) {
      return props.articleAssocie ? props.articleAssocie.contenu : props.texteExplicationOK;
    } else {
      return props.articleAssocie ? props.articleAssocie.contenu : props.texteExplicationKO;
    }
  });
</script>

<style scoped>
  .quiz-reponse__gagne {
    width: 100%;
    margin: 0 auto;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  @media (min-width: 32rem) {
    .quiz-reponse__gagne {
      background-image: url('/article-quiz-gagne.webp');
      background-size: contain;
      background-position: center;
    }
  }
</style>
