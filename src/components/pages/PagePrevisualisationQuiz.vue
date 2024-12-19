<template>
  <div class="fr-container fr-my-3w">
    <div v-if="isLoading">Chargement...</div>
    <PageQuizComposant
      v-if="quizViewModel"
      :quiz-view-model="quizViewModel"
      nombreDePointsAGagner="0"
      id-utilisateur="1"
      id-interaction="0"
      :is-mode-previsualisation="true"
      id-quiz="0"
      :article-associe="null"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import PageQuizComposant from '@/components/custom/Quiz/PageQuizComposant.vue';
  import { ChargementQuizPresenterImpl, QuizViewModel } from '@/domaines/quiz/adapters/chargementQuiz.presenter.impl';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quizRepository.axios';
  import { PrevisualiserQuizUsecase } from '@/domaines/quiz/previsualiserQuiz.usecase';

  const quizViewModel = ref<QuizViewModel>();
  const isLoading = ref<boolean>(false);

  const mapValuesQuiz = (viewModel: QuizViewModel) => {
    quizViewModel.value = viewModel;
  };

  const chargementQuizz = async () => {
    const route = useRoute();
    isLoading.value = true;
    const idQuiz = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const previsualiserQuizUsecase = new PrevisualiserQuizUsecase(new QuizRepositoryAxios());
    await previsualiserQuizUsecase.execute(idQuiz, new ChargementQuizPresenterImpl(mapValuesQuiz));
    isLoading.value = false;
  };

  onMounted(chargementQuizz);
</script>
