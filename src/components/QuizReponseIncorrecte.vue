<template>
  <div style="margin: 10px" v-html="item.texteExplication" />
  <br />
  <router-link v-if="etapeCourante == quizViewModel?.questions.length" :to="{ name: 'coach' }" class="fr-btn fr-btn-not-rounded redirect-coach-link">
    Revenir au coach
  </router-link>
</template>
<script lang="ts">
import { QuestionViewModel, QuizViewModel } from "@/quiz/adapters/chargementQuiz.presenter.impl";

export default {
  name: "QuizReponseIncorrecte",
  props: {
    etapeCourante: {
      type: Number,
    },
    item: {
      type: Object as () => QuestionViewModel,
      required: true,
    },
    quizViewModel: {
      type: Object as () => QuizViewModel,
      required: true,
    },
  },
};
</script>
<style scoped>
.stepper-actions span:hover {
  cursor: pointer;
}
</style>
