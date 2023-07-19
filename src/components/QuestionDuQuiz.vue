<template>
  <h3 style="text-align: left; margin: 0 0 0.5em 0.5em">{{ item.intitule }}</h3>
  <div v-for="reponse in item.reponsesPossibles" class="fr-fieldset__element">
    <div class="fr-radio-group">
      <input
        @change="envoyerLaReponse($event, item.id, valeurDesReponses)"
        :value="`${reponse}`"
        type="radio"
        :id="`radio-${item.ordre}-disabled-${reponse}`"
        :name="`radio-disabled-${item.ordre}`"
      />
      <label class="fr-label" :for="`radio-${item.ordre}-disabled-${reponse}`">
        {{ reponse }}
      </label>
    </div>
  </div>
  <div class="fr-messages-group" :id="`radio-disabled-messages-${item.ordre}`" aria-live="assertive"></div>
  <div class="stepper-actions" v-if="quizViewModel">
    <button
      v-if="etapeCourante <= quizViewModel?.questions.length"
      @click="verifierLaReponse(item.solution, item.id)"
      class="fr-btn custom-button-next-quiz-question"
      title="Valider"
    >
      Valider
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import { QuestionViewModel, QuizViewModel } from "@/quiz/adapters/chargementQuiz.presenter.impl";

export default defineComponent({
  name: "QuestionDuQuiz",
  props: {
    etapeCourante: {
      type: Number,
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
    valeurDesReponses: {
      type: Object as () => Map<string, string>,
      required: true,
    },
  },
  emits: ["envoyer-reponse", "verifier-reponse"],

  setup() {
    const instance = getCurrentInstance();

    function envoyerLaReponse(event: Event, questionId: string, currentMap: Map<string, string>) {
      const reponse = (event.target as HTMLInputElement).value;
      currentMap.set(questionId, reponse);
      instance?.emit("envoyer-reponse", currentMap);
    }
    function verifierLaReponse(reponseChoisie: string, questionId: string) {
      instance?.emit("verifier-reponse", reponseChoisie, questionId);
    }

    return {
      envoyerLaReponse,
      verifierLaReponse,
    };
  },
});
</script>
<style scoped>
.stepper-actions span:hover {
  cursor: pointer;
}

.custom-button-next-quiz-question {
  margin: 0 0 0 0.5em;
}
</style>
