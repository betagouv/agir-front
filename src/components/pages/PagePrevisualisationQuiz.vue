<template>
  <div v-if="isLoading">Chargement...</div>
  <PageQuizComposant
    v-if="quizViewModel"
    :quiz-view-model="quizViewModel"
    nombreDePointsAGagner="0"
    id-utilisateur="1"
    id-interaction="0"
    :is-mode-previsualisation="true"
    id-quiz="0"
  >
  </PageQuizComposant>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { ChargementQuizUsecase } from '@/quiz/chargementQuiz.usecase';
  import { ChargementQuizPresenterImpl, QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import PageQuizComposant from '@/components/custom/Quiz/PageQuizComposant.vue';
  import { QuizRepositoryAxios } from '@/quiz/adapters/quizRepository.axios';

  const quizViewModel = ref<QuizViewModel>();
  const isLoading = ref<boolean>(false);

  const mapValuesQuiz = (viewModel: QuizViewModel) => {
    quizViewModel.value = viewModel;
  };

  const chargementQuizz = async () => {
    const route = useRoute();
    isLoading.value = true;
    const idQuiz = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const chargementQuizzUsecase = new ChargementQuizUsecase(new QuizRepositoryAxios());
    await chargementQuizzUsecase.execute(idQuiz, new ChargementQuizPresenterImpl(mapValuesQuiz));
    isLoading.value = false;
  };

  onMounted(chargementQuizz);
</script>
