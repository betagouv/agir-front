<template>
  <div class="fr-text--regular fr-text--bold fr-ml-2v">
    <h4 class="fr-mb-0 fr-pb-3v">Bien joué !</h4>
    Vous avez donné la bonne réponse.
  </div>
  <div v-if="etapeCourante == quizViewModel?.questions.length && !leQuizContientAuMoinsUneReponseIncorrecte">
    <div class="fr-mt-6v fr-ml-2v">
      <h6 class="fr-mb-0">Vous avez gagné</h6>
      <div class="fr-mt-2v fr-text--sm fr-text--bold fr-mb-0" style="display: flex">
        <img src="/leaf.svg" alt="leaf-logo" class="fr-mr-2v" />
        + {{ getScore }} points
      </div>
    </div>
    <br />
    <router-link class="fr-btn link-as-btn fr-ml-2v" v-if="etapeCourante == quizViewModel?.questions.length" :to="{ name: 'coach' }">
      Revenir au coach
    </router-link>
  </div>
  <div class="fr-ml-2v" v-else-if="etapeCourante == quizViewModel?.questions.length && leQuizContientAuMoinsUneReponseIncorrecte">
    <div class="fr-mt-2v">
      <strong>Désolé, Vous avez perdu !</strong>
    </div>
    <router-link class="fr-btn link-as-btn fr-mt-5v" v-if="etapeCourante == quizViewModel?.questions.length" :to="{ name: 'coach' }">
      Revenir au coach
    </router-link>
  </div>
  <div v-else>
    <button @click="versLaQuestionSuivante" class="fr-btn fr-mt-5v fr-ml-2v" title="Continuer">Continuer</button>
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
    leQuizContientAuMoinsUneReponseIncorrecte: {
      type: Boolean,
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
