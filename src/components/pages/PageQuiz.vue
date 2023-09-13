<template>
  <div v-if="isLoading">Chargement...</div>
  <div v-else-if="!quizViewModel || !store.interactionEnCours">Une erreur est survenue</div>
  <PageQuizComposant
    v-else
    :quiz-view-model="quizViewModel"
    :nombreDePointsAGagner="store.interactionEnCours ? store.interactionEnCours.nombreDePointsAGagner : '0'"
    :valeurBilanCarbone="store.valeurBilanCarbone"
    :id-utilisateur="store.id"
    :id-interaction="store.interactionEnCours.id"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ChargementQuizUsecase } from "@/quiz/chargementQuiz.usecase";
import { ChargementQuizPresenterImpl, QuizViewModel } from "@/quiz/adapters/chargementQuiz.presenter.impl";
import { utilisateurStore } from "@/store/utilisateur";
import PageQuizComposant from "@/components/custom/PageQuizComposant.vue";
import { QuizRepositoryCMSAxios } from "@/quiz/adapters/quizRepositoryCMSAxios";

const quizViewModel = ref<QuizViewModel>();
const store = utilisateurStore();
const route = useRoute();
const isLoading = ref<boolean>(false);

const mapValuesQuiz = (viewModel: QuizViewModel) => {
  quizViewModel.value = viewModel;
  console.log(quizViewModel.value);
};

const chargementQuizz = async () => {
  isLoading.value = true;
  const idQuiz = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  const chargementQuizzUsecase = new ChargementQuizUsecase(new QuizRepositoryCMSAxios());
  await chargementQuizzUsecase.execute(idQuiz, new ChargementQuizPresenterImpl(mapValuesQuiz));
  isLoading.value = false;
};

onMounted(chargementQuizz);
</script>
