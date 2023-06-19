<template>
  <h3>📒 {{ quizzViewModel?.titre }}</h3>
  <form @submit.prevent="evaluerQuizz">
    <fieldset
      v-for="item in quizzViewModel?.questions"
      :key="item.id"
      class="fr-fieldset"
      :id="`radio-disabled-${item.id}`"
      :aria-labelledby="`radio-${item.id}-legend radio-disabled-messages-${item}`"
    >
      <div class="quiz-question-container">
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
      </div>
    </fieldset>
    <button class="fr-btn" id="button-2864" title="Envoyer le formulaire">Valider mes réponse</button>
  </form>
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

    return {
      quizzViewModel: quizViewModel,
      evaluerQuizz,
      handleReponse,
    };
  },
});
</script>

<style scoped>
.quiz-question-container {
  width: 100%;
}
</style>
