<template>
  <MissionEtapeSkeleton :is-loading="isLoading" :view-model-existe="quizViewModel !== undefined">
    <PageQuizComposant
      :article-associe="quizViewModel!.articleAssocie"
      :est-enchainement-mission="true"
      :id-quiz="quizId"
      :id-utilisateur="utilisateurStore().utilisateur.id"
      :is-mode-previsualisation="false"
      :on-click-continuer="onClickContinuer"
      :quiz-view-model="quizViewModel!"
    >
      {{ titreExamen }}
    </PageQuizComposant>
  </MissionEtapeSkeleton>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import MissionEtapeSkeleton from '@/components/custom/Mission/MissionEtapeSkeleton.vue';
  import PageQuizComposant from '@/components/custom/Quiz/PageQuizComposant.vue';
  import { ChargementQuizPresenterImpl, QuizViewModel } from '@/domaines/quiz/adapters/chargementQuiz.presenter.impl';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quizRepository.axios';
  import { ChargementQuizUsecase } from '@/domaines/quiz/chargementQuiz.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const quizViewModel = ref<QuizViewModel>();
  const isLoading = ref<boolean>(true);
  const props = defineProps<{
    quizId: string;
    estEnchainementMission?: boolean;
    onClickContinuer: () => void;
    titreExamen: string;
  }>();

  const mapValuesQuiz = (viewModel: QuizViewModel) => {
    quizViewModel.value = viewModel;
  };

  const chargementQuizz = async () => {
    const chargementQuizzUsecase = new ChargementQuizUsecase(new QuizRepositoryAxios());
    await chargementQuizzUsecase.execute(props.quizId, new ChargementQuizPresenterImpl(mapValuesQuiz));
    isLoading.value = false;
  };

  onMounted(chargementQuizz);
</script>
