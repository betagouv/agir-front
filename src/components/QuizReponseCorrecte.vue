<template>
  <div>
    <strong style="font-size: 20px">Bien joué !</strong>
  </div>
  <div style="margin-top: 10px">
    <strong>Vous avez trouvé la bonne réponse.</strong>
  </div>
  <div v-if="etapeCourante == quizViewModel?.questions.length">
    <div class="fr-mt-2v">
      <strong>Vous avez gagné</strong>
      <div style="display: flex; margin-top: 5px">
        <img src="/leaf.svg" alt="leaf-logo" />
        <strong>+ {{ getScore }} points</strong>
      </div>
    </div>
    <br />
    <router-link class="fr-link" v-if="etapeCourante == quizViewModel?.questions.length" :to="{ name: 'coach' }"> Revenir au coach </router-link>
  </div>
  <div v-else>
    <br />
    <button @click="versLaQuestionSuivante" class="fr-btn" title="Continuer">Continuer</button>
  </div>
</template>
<script lang="ts">
import { QuizViewModel } from "@/quiz/adapters/chargementQuiz.presenter.impl";
import { defineComponent, getCurrentInstance } from "vue";
import { EtatDeLaResponse } from "@/components/etatDeLaReponse";

export default defineComponent({
  name: "QuizReponseCorrecte",
  props: {
    etapeCourante: {
      type: Number,
      required: true,
    },
    getScore: {
      type: String,
      required: true,
    },
    quizViewModel: {
      type: Object as () => QuizViewModel,
      required: true,
    },
    etatReponseCourante: {
      type: String,
      required: true,
    },
  },
  emits: ["question-suivante"],
  setup(props) {
    console.log(props);
    const instance = getCurrentInstance();
    function versLaQuestionSuivante() {
      const majetape = props.etapeCourante + 1;
      const majetat = EtatDeLaResponse.INITIAL;
      instance?.emit("question-suivante", majetape, majetat);
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
