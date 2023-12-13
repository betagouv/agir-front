<template>
  <div v-if="isLoading">Chargement...</div>
  <div v-else-if="!quizViewModel || !interactionEnCours">Une erreur est survenue</div>
  <PageQuizComposant
    v-else
    :quiz-view-model="quizViewModel"
    :nombreDePointsAGagner="interactionEnCours ? interactionEnCours.nombreDePointsAGagner : '0'"
    :id-utilisateur="store.utilisateur.id"
    :id-interaction="interactionEnCours ? interactionEnCours.id : ''"
    :is-mode-previsualisation="false"
  >
  </PageQuizComposant>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { ChargementQuizUsecase } from '@/quiz/chargementQuiz.usecase';
  import { ChargementQuizPresenterImpl, QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import { utilisateurStore } from '@/store/utilisateur';
  import { interactionEnCoursStore } from '@/store/interaction';
  import PageQuizComposant from '@/components/custom/PageQuizComposant.vue';
  import { QuizRepositoryAxios } from '@/quiz/adapters/quizRepository.axios';

  const quizViewModel = ref<QuizViewModel>();
  const store = utilisateurStore();
  const interactionEnCours = interactionEnCoursStore().interactionEnCours;
  const route = useRoute();
  const isLoading = ref<boolean>(false);

  const mapValuesQuiz = (viewModel: QuizViewModel) => {
    quizViewModel.value = viewModel;
  };

  const chargementQuizz = async () => {
    isLoading.value = true;
    const idQuiz = route.params.id
      ? route.params.id.toString()
      : interactionEnCoursStore().interactionEnCours!.idDuContenu;
    const chargementQuizzUsecase = new ChargementQuizUsecase(new QuizRepositoryAxios());
    await chargementQuizzUsecase.execute(idQuiz, new ChargementQuizPresenterImpl(mapValuesQuiz));
    isLoading.value = false;
  };

  onMounted(chargementQuizz);
</script>
