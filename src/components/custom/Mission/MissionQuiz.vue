<template>
  <MissionEtapeSkeleton :view-model-existe="quizViewModel !== undefined" :is-loading="isLoading">
    <PageQuizComposant
      :quiz-view-model="quizViewModel!"
      :id-utilisateur="utilisateurStore().utilisateur.id"
      :is-mode-previsualisation="false"
      :id-quiz="quizId"
      :article-associe="quizViewModel!.articleAssocie"
      :est-enchainement-mission="true"
      :on-click-continuer="onClickContinuer"
    />
  </MissionEtapeSkeleton>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import MissionEtapeSkeleton from '@/components/custom/Mission/MissionEtapeSkeleton.vue';
  import PageQuizComposant from '@/components/custom/Quiz/PageQuizComposant.vue';
  import { ChargementQuizPresenterImpl } from '@/domaines/quiz/adapters/chargementQuiz.presenter.impl';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quiz.repository.axios';
  import { ChargementQuizUsecase } from '@/domaines/quiz/chargementQuiz.usecase';
  import { QuizViewModel } from '@/domaines/quiz/ports/chargementQuizz.presenter';
  import { utilisateurStore } from '@/store/utilisateur';

  const quizViewModel = ref<QuizViewModel>();
  const isLoading = ref<boolean>(true);
  const props = defineProps<{ quizId: string; estEnchainementMission?: boolean; onClickContinuer: () => void }>();

  const mapValuesQuiz = (viewModel: QuizViewModel) => {
    quizViewModel.value = viewModel;
  };

  const chargementQuizz = async () => {
    const { id: utilisateurId } = utilisateurStore().utilisateur;
    const chargementQuizzUsecase = new ChargementQuizUsecase(new QuizRepositoryAxios());
    await chargementQuizzUsecase.execute(props.quizId, utilisateurId, new ChargementQuizPresenterImpl(mapValuesQuiz));
    isLoading.value = false;
  };

  onMounted(chargementQuizz);
</script>
