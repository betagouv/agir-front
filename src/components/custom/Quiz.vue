<template>
  <div class="background--white border fr-p-2w border-radius--md">
    <IndicateurDEtape
      :titre-etape="getTitreEtape(quizViewModel.questions.length)"
      :titre-etape-suivante="getTitreEtapeSuivante(quizViewModel.questions.length)"
      :etape-courante="etapeCourante"
      :etape-total="quizViewModel.questions.length + 1"
    />
    <form>
      <QuestionDuQuiz
        v-if="etapeCourante <= quizViewModel.questions.length"
        :item="quizViewModel.questions[etapeCourante - 1]"
        @etapeSuivante="verifierLaReponse"
      />
      <div v-else>
        <QuizFinSuccess
          v-if="nombreDeBonnesReponses === quizViewModel.questions.length"
          :nombre-de-points-a-gagner="nombreDePointsAGagner"
        />
        <QuizFinError v-else />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import IndicateurDEtape from '@/components/dsfr/IndicateurDEtapes.vue';
  import QuestionDuQuiz from '@/components/custom/QuestionDuQuiz.vue';
  import QuizFinError from '@/components/custom/Quiz/QuizFinError.vue';
  import QuizFinSuccess from '@/components/custom/Quiz/QuizFinSuccess.vue';
  import { QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import { EnvoyerDonneesQuizInteractionUsecase } from '@/quiz/envoyerDonneesQuizInteraction.usecase';
  import { QuizRepositoryAxios } from '@/quiz/adapters/quizRepository.axios';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';

  const props = defineProps<{
    quizViewModel: QuizViewModel;
    nombreDePointsAGagner: string;
    idUtilisateur: string;
    idInteraction: string;
    isModePrevisualisation: boolean;
  }>();

  const nombreDeBonnesReponses = ref<number>(0);
  const etapeCourante = ref<number>(1);

  const getTitreEtape = (nombreEtape: number) => {
    if (etapeCourante.value > nombreEtape) return 'Fin du quizz';

    return `Question ${etapeCourante.value} sur ${nombreEtape}`;
  };

  const getTitreEtapeSuivante = (nombreEtape: number) => {
    if (etapeCourante.value + 1 > nombreEtape) return 'Fin du quizz';

    return `Question ${etapeCourante.value + 1} sur ${nombreEtape}`;
  };

  const verifierLaReponse = async value => {
    etapeCourante.value++;

    if (value) nombreDeBonnesReponses.value++;

    if (etapeCourante.value > props.quizViewModel.questions.length && !props.isModePrevisualisation) {
      await new EnvoyerDonneesQuizInteractionUsecase(
        new QuizRepositoryAxios(),
        ToDoListEventBusImpl.getInstance()
      ).execute(
        props.idUtilisateur,
        props.idInteraction,
        nombreDeBonnesReponses.value,
        props.quizViewModel.questions.length
      );
    }
  };
</script>
