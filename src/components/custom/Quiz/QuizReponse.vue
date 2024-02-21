<template>
  <p class="fr-h4 fr-mb-2w">Pourquoi ?</p>
  <div v-if="reponseCorrecte"><span> Bien joué ! </span> Vous récoltez + {{ points }}</div>
  <div v-html="texteExplication" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { ArticleDuQuiz } from '@/quiz/ports/quizRepository';

  const props = defineProps<{
    question: string;
    solution: string;
    texteExplicationKO: string;
    texteExplicationOK: string;
    reponseCorrecte: boolean;
    reponse: string;
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
