<template>
  <div class="fr-ml-2v" v-html="item.texteExplication" />
  <div v-if="etapeCourante == quizViewModel?.questions.length && leQuizContientAuMoinsUneReponseIncorrecte">
    <div class="fr-mt-2v fr-ml-2v fr-text--bold">Désolé, Vous avez perdu !</div>
    <router-link class="fr-btn link-as-btn fr-ml-2v fr-mt-5v" v-if="etapeCourante == quizViewModel?.questions.length" :to="{ name: 'coach' }">
      Revenir au coach
    </router-link>
  </div>
  <div v-else>
    <button @click="versLaQuestionSuivante" class="fr-btn fr-ml-2v fr-mt-2v" title="Continuer">Continuer</button>
  </div>
</template>
<script lang="ts">
import { QuestionViewModel, QuizViewModel } from "@/quiz/adapters/chargementQuiz.presenter.impl";
import { defineComponent, getCurrentInstance } from "vue";
import { EtatDeLaResponse } from "@/components/etatDeLaReponse";

export default defineComponent({
  name: "QuizReponseIncorrecte",
  props: {
    etapeCourante: {
      type: Number,
      required: true,
    },
    leQuizContientAuMoinsUneReponseIncorrecte: {
      type: Boolean,
      required: true,
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
  emits: ["question-suivante"],
  setup(props) {
    const instance = getCurrentInstance();
    function versLaQuestionSuivante() {
      const miseAJourDeLetapeCourante = props.etapeCourante + 1;
      const miseAJourDeLetatDeLaReponseCourante = EtatDeLaResponse.INITIAL;
      instance?.emit("question-suivante", miseAJourDeLetapeCourante, miseAJourDeLetatDeLaReponseCourante);
    }

    return {
      versLaQuestionSuivante,
    };
  },
});
</script>
<style scoped>
.stepper-actions span:hover {
  cursor: pointer;
}
</style>
