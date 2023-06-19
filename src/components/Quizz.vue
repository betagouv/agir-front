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
import { ChargementQuizzUsecase } from "@/quizz/chargementQuizz.usecase.ts";
import { QuizzRepositoryAxios } from "@/quizz/adapters/quizzRepository.axios.ts";
import { ChargementQuizzPresenterImpl, QuizzViewModel } from "@/quizz/adapters/chargementQuizz.presenter.impl.ts";
import { useRoute } from "vue-router";
import store from "@/store";
import { EvaluerQuizzUsecase } from "@/quizz/evaluerQuizz.usecase.ts";
import { EvaluerQuizzPresenterImpl, EvaluerQuizzViewModel } from "@/quizz/adapters/evaluerQuizz.presenter.impl.ts";
import router from "@/router";

export default defineComponent({
  name: "Quizz",
  setup() {
    const quizzViewModel = ref<QuizzViewModel>();
    const checkedResponses = new Map<string, string>();

    let idQuizz: number = -1;
    const route = useRoute();
    if (typeof route.params.id === 'string') {
      idQuizz = parseInt(route.params.id, 10);
    }

    function mapValuesQuizz(viewModel: QuizzViewModel) {
      quizzViewModel.value = viewModel;
    }

    function mapValuesEvaluer(viewModel: EvaluerQuizzViewModel) {
      if (viewModel.quizzGagne) {
        router.push({ name: "quizz-gagne" });
      } else {
        router.push({ name: "quizz-perdu", state: { quizzId: idQuizz } });
      }
    }

    function handleReponse(event:Event, idQuestion: string) {
      const reponse = (event.target as HTMLInputElement).value
      checkedResponses.set(idQuestion, reponse);
    }

    const quizzRepositoryAxios = new QuizzRepositoryAxios();

    const chargementQuizz = () => {
      const chargementQuizzUsecase = new ChargementQuizzUsecase(quizzRepositoryAxios);
      chargementQuizzUsecase.execute(idQuizz, new ChargementQuizzPresenterImpl(mapValuesQuizz));
    };

    onMounted(chargementQuizz);

    const evaluerQuizz = () => {
      const username = store.getters["utilisateur/getUtilisateur"];
      const evaluerQuizzUsecase = new EvaluerQuizzUsecase(quizzRepositoryAxios);
      evaluerQuizzUsecase.execute(username, idQuizz, checkedResponses, new EvaluerQuizzPresenterImpl(mapValuesEvaluer));
    };

    return {
      quizzViewModel,
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
