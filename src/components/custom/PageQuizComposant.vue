<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane
      :page-courante="`Quiz ${quizViewModel.titre}`"
      :page-hierarchie="[
        {
          label: 'Coach',
          url: 'coach',
        },
      ]"
    />
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-lg-8">
        <span class="fr-h2">Quiz</span>
        <span class="fr-ml-1w fr-h3">{{ quizViewModel.thematique }} - {{ quizViewModel.difficulte }}</span>
        <Quiz
          class="fr-mt-4w"
          :quiz-view-model="quizViewModel"
          :id-utilisateur="idUtilisateur"
          :is-mode-previsualisation="isModePrevisualisation"
          :id-quiz="idQuiz"
        />
      </div>
      <div class="fr-col-12 fr-col-lg-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import Quiz from '@/components/custom/Quiz.vue';

  defineProps<{
    quizViewModel: QuizViewModel;
    nombreDePointsAGagner: string;
    idUtilisateur: string;
    isModePrevisualisation: boolean;
    idQuiz: string;
  }>();
</script>
