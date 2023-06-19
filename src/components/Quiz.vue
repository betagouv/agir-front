<template>
  <h3>📒 {{ quizzViewModel?.titre }}</h3>
  <div class="quiz-stepper-container">
    <div class="quiz-stepper-sub-container">
      <form @submit.prevent="evaluerQuizz">
        <div
          v-if="currentStep"
          class="fr-stepper__steps"
          :data-fr-current-step="`${currentStep.toString()}`"
          :data-fr-steps="`${quizzViewModel?.questions.length.toString()}`"
        ></div>
        <br />
        <fieldset
          v-for="item in quizzViewModel?.questions"
          :key="item.id"
          class="fr-fieldset"
          :id="`radio-disabled-${item.id}`"
          :aria-labelledby="`radio-${item.id}-legend radio-disabled-messages-${item}`"
        >
          <div v-if="currentStep.toString() == item.id" class="quiz-question-container">
            <h3 style="text-align: left">{{ item.intitule }}</h3>
            <div v-for="reponse in item.reponsesPossibles" class="fr-fieldset__element">
              <div class="fr-radio-group fr-radio-rich">
                <input
                  @change="handleReponse($event, item.id.toString())"
                  :value="`${reponse}`"
                  type="radio"
                  :id="`radio-${item.id}-disabled-${reponse}`"
                  :name="`radio-disabled-${item.id}`"
                />
                <label class="fr-label" :for="`radio-${item.id}-disabled-${reponse}`">
                  {{ reponse }}
                </label>
              </div>
            </div>
            <div class="fr-messages-group" :id="`radio-disabled-messages-${item.id}`" aria-live="assertive"></div>
            <div class="stepper-actions">
              <button
                v-if="currentStep < quizzViewModel?.questions.length"
                @click="questionSuivante"
                class="fr-btn stepper-actions-next-question valid-responses-button"
                title="Valider"
              >
                Suivant
              </button>
              <span
                @click="skipQuestion(item.id)"
                v-if="currentStep < quizzViewModel?.questions.length"
                class="fr-btn stepper-actions-ignore-question"
                title="Passer la question"
              >
                Passer la question
              </span>
              <button v-if="item.id == quizzViewModel?.questions.length" class="fr-btn valid-responses-button" id="button-2864" title="Envoyer le formulaire">
                Valider mes réponses
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ChargementQuizUsecase } from "@/quiz/chargementQuiz.usecase.ts";
import { QuizRepositoryAxios } from "@/quiz/adapters/quizRepositoryAxios.ts";
import { ChargementQuizPresenterImpl, QuizViewModel } from "@/quiz/adapters/chargementQuiz.presenter.impl.ts";
import { useRoute } from "vue-router";
import store from "@/store";
import { EvaluerQuizUsecase } from "@/quiz/evaluerQuiz.usecase.ts";
import { EvaluerQuizPresenterImpl, EvaluerQuizViewModel } from "@/quiz/adapters/evaluerQuiz.presenter.impl.ts";
import router from "@/router";

export default defineComponent({
  name: "Quizz",
  setup() {
    const currentStep = ref<number>(1);
    const quizViewModel = ref<QuizViewModel>();
    const checkedResponses = new Map<string, string>();

    let idQuiz: number = -1;
    const route = useRoute();
    if (typeof route.params.id === "string") {
      idQuiz = parseInt(route.params.id, 10);
    }

    function mapValuesQuiz(viewModel: QuizViewModel) {
      quizViewModel.value = viewModel;
    }

    function mapValuesEvaluer(viewModel: EvaluerQuizViewModel) {
      if (viewModel.quizGagne) {
        router.push({ name: "quiz-gagne" });
      } else {
        router.push({ name: "quiz-perdu", state: { quizId: idQuiz } });
      }
    }

    function handleReponse(event: Event, idQuestion: string) {
      const reponse = (event.target as HTMLInputElement).value;
      checkedResponses.set(idQuestion, reponse);
    }

    const quizzRepositoryAxios = new QuizRepositoryAxios();

    const chargementQuizz = () => {
      const chargementQuizzUsecase = new ChargementQuizUsecase(quizzRepositoryAxios);
      chargementQuizzUsecase.execute(idQuiz, new ChargementQuizPresenterImpl(mapValuesQuiz));
    };

    onMounted(chargementQuizz);

    const evaluerQuizz = () => {
      const username = store.getters["utilisateur/getUtilisateur"];
      const evaluerQuizzUsecase = new EvaluerQuizUsecase(quizzRepositoryAxios);
      evaluerQuizzUsecase.execute(username, idQuiz, checkedResponses, new EvaluerQuizPresenterImpl(mapValuesEvaluer));
    };

    function questionSuivante() {
      this.currentStep = this.currentStep + 1;
    }

    function skipQuestion(idQuestion) {
      this.currentStep = this.currentStep + 1;
      checkedResponses.set(idQuestion, "");
    }

    return {
      quizzViewModel: quizViewModel,
      evaluerQuizz,
      handleReponse,
      skipQuestion,
      questionSuivante,
      currentStep,
    };
  },
});
</script>

<style scoped>
.quiz-question-container {
  width: 100%;
}

.stepper-actions span:hover {
  cursor: pointer;
}

.stepper-actions-next-question {
  margin: 10px;
  border-radius: 3px;
  background-color: black;
}

.stepper-actions-ignore-question {
  margin: 10px;
  border-radius: 3px;
  background-color: white;
  color: black;
  border: 1px solid black;
}

.valid-responses-button {
  border-radius: 3px;
  background-color: black;
}

.valid-responses-button:hover {
  background-color: white;
  color: black;
  border-color: black;
}

.quiz-stepper-container {
  margin: 10px;
  border: 1px solid darkgrey;
  border-radius: 3px;
}

.quiz-stepper-sub-container {
  margin: 3em 3em 0 3em;
}
</style>
