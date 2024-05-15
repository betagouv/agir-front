<template>
  <div v-if="isLoading">Chargement...</div>
  <div v-else-if="!quizViewModel">Une erreur est survenue</div>
  <PageQuizComposant
    v-else
    :quiz-view-model="quizViewModel"
    :id-utilisateur="store.utilisateur.id"
    :is-mode-previsualisation="false"
    :id-quiz="idQuiz"
    :article-associe="quizViewModel.articleAssocie"
  >
  </PageQuizComposant>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import PageQuizComposant from '@/components/custom/Quiz/PageQuizComposant.vue';
  import { ChargementQuizPresenterImpl, QuizViewModel } from '@/domaines/quiz/adapters/chargementQuiz.presenter.impl';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quizRepository.axios';
  import { ChargementQuizUsecase } from '@/domaines/quiz/chargementQuiz.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const quizViewModel = ref<QuizViewModel>();
  const store = utilisateurStore();
  const route = useRoute();
  const isLoading = ref<boolean>(false);
  const idQuiz = route.params.id.toString();

  const mapValuesQuiz = (viewModel: QuizViewModel) => {
    quizViewModel.value = viewModel;
  };

  const chargementQuizz = async () => {
    isLoading.value = true;
    const chargementQuizzUsecase = new ChargementQuizUsecase(new QuizRepositoryAxios());
    await chargementQuizzUsecase.execute(idQuiz, new ChargementQuizPresenterImpl(mapValuesQuiz));
    isLoading.value = false;
  };

  onMounted(chargementQuizz);
</script>
