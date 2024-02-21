<template>
  <div class="background--white border fr-p-2w border-radius--md">
    <form>
      <QuestionDuQuiz
        :article-associe="articleAssocie"
        :quiz-id="idQuiz"
        :question="quizViewModel.questions[0]"
        :points="quizViewModel.nombreDePointsAGagner"
        @quizTermine="verifierLaReponse"
      />
      <div></div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import QuestionDuQuiz from '@/components/custom/Quiz/QuestionDuQuiz.vue';
  import { QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import { EnvoyerDonneesQuizInteractionUsecase } from '@/quiz/envoyerDonneesQuizInteraction.usecase';
  import { QuizRepositoryAxios } from '@/quiz/adapters/quizRepository.axios';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';
  import { ArticleDuQuiz } from '@/quiz/ports/quizRepository';

  const props = defineProps<{
    quizViewModel: QuizViewModel;
    idUtilisateur: string;
    isModePrevisualisation: boolean;
    idQuiz: string;
    articleAssocie: ArticleDuQuiz | null;
  }>();

  const nombreDeBonnesReponses = ref<number>(0);

  const verifierLaReponse = async value => {
    if (value) nombreDeBonnesReponses.value++;

    if (props.quizViewModel.questions.length && !props.isModePrevisualisation) {
      await new EnvoyerDonneesQuizInteractionUsecase(
        new QuizRepositoryAxios(),
        ToDoListEventBusImpl.getInstance()
      ).execute(
        props.idUtilisateur,
        props.idQuiz,
        nombreDeBonnesReponses.value,
        props.quizViewModel.questions.length,
        props.articleAssocie ? props.articleAssocie.id : null
      );
    }
  };
</script>
