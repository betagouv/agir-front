<template>
  <h3>📒 {{ quizzViewModel?.titre }}</h3>
  <form>
    <fieldset v-for="item in quizzViewModel?.questions" :key="item.id" class="fr-fieldset" :id="`radio-disabled-${item.id}`" :aria-labelledby="`radio-${item.id}-legend radio-disabled-messages-${item}`">
      <div class="quiz-question-container">
        <h3 style="text-align: left">{{item.intitule}}</h3>
        <div v-for="reponse in item.reponsesPossibles" class="fr-fieldset__element">
          <div class="fr-radio-group fr-radio-rich">
            <input :value="`${reponse}`" type="radio" :id="`radio-${item.id}-disabled-${reponse}`" :name="`radio-disabled-${item.id}`">
            <label class="fr-label" :for="`radio-${item.id}-disabled-${reponse}`">
              {{ reponse }}
            </label>
          </div>
        </div>
        <div class="fr-messages-group" :id="`radio-disabled-messages-${item.id}`" aria-live="assertive">
        </div>
      </div>
    </fieldset>
  </form>
  <button class="fr-btn" id="button-2864" title="Envoyer le formulaire" type="submit">
    Valider mes réponse
  </button>
  <br>
  <br>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ChargementQuizzUsecase } from "@/quizz/chargementQuizz.usecase.ts";
import { QuizzRepositoryAxios } from "@/quizz/adapters/quizzRepository.axios.ts";
import { ChargementQuizzPresenterImpl, QuizzViewModel } from "@/quizz/adapters/chargementQuizz.presenter.impl.ts";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "Quizz",
  setup() {

    const quizzViewModel = ref<QuizzViewModel>()

    function mapValues(viewModel: QuizzViewModel) {
      quizzViewModel.value = viewModel
    }

    const chargementQuizz = () => {
      const chargementQuizzUsecase = new ChargementQuizzUsecase(new QuizzRepositoryAxios())
      chargementQuizzUsecase.execute(useRoute().params.id as number, new ChargementQuizzPresenterImpl(mapValues))
    }
    onMounted(chargementQuizz);
    return {
      quizzViewModel
    }
  },

})
</script>

<style scoped>
.quiz-question-container {
  width: 100%;
}

</style>