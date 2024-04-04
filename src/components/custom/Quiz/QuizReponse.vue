<template>
  <div v-if="reponseCorrecte" class="quiz-reponse__gagne fr-text--xl">
    <span class="fr-text--bold"> Bien joué ! </span> Vous récoltez <span class="fr-text--bold">+{{ points }}</span>
    <img width="32" src="/ic_score.svg" alt="points" />
  </div>
  <h2 class="fr-h4 fr-mb-2w">Pourquoi ?</h2>
  <div class="cms__content" v-html="texteExplication" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { ArticleDuQuiz } from '@/quiz/ports/quizRepository';

  const props = defineProps<{
    texteExplicationKO: string;
    texteExplicationOK: string;
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
    display: flex;
    width: 100%;
    margin: 0 auto;
    align-items: middle;
    justify-content: center;
    padding: 1rem 0;
    gap: 0.5rem;
    background-image: url('/article-quiz-gagne.png');
    background-size: contain;
    background-position: center;
  }
</style>
