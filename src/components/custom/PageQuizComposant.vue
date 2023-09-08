<template>
  <FilDAriane
    :page-courante="`Quiz ${quizViewModel.titre}`"
    :page-hierarchie="[{
      label: 'Coach',
      url: '/coach',
    }]"
  />
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-8">
      <Quiz
        :nombre-de-points-a-gagner="nombreDePointsAGagner"
        :quiz-view-model="quizViewModel"
        :id-interaction="idInteraction"
        :id-utilisateur="idUtilisateur"
      />
    </div>
    <div class="fr-col-12 fr-col-lg-4">
      <BilanNosGestesClimat :get-impact-value="valeurBilanCarbone" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import { EmpreinteViewModel } from '@/bilan/adapters/chargementEmpreinte.presenter.impl';
  import BilanNosGestesClimat from '@/components/BilanNosGestesClimat.vue'
  import FilDAriane from "@/components/dsfr/FilDAriane.vue";
  import Quiz from '@/components/custom/Quiz.vue';

  defineProps<{
    quizViewModel: QuizViewModel
    nombreDePointsAGagner: string,
    valeurBilanCarbone: EmpreinteViewModel,
    idUtilisateur: string,
    idInteraction: string
  }>();
</script>
