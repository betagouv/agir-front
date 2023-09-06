<template>
  <div class="background--white border fr-p-2w border-radius--md">
    <IndicateurDEtape
      :titre-etape="getTitreEtape(quizViewModel.questions.length)"
      :titre-etape-suivante="getTitreEtapeSuivante(quizViewModel.questions.length)"
      :etape-courante="etapeCourante"
      :etape-total="quizViewModel.questions.length+1"  
    />
    <form>
      <QuestionDuQuiz v-if="etapeCourante <= quizViewModel.questions.length"
        :item="quizViewModel.questions[etapeCourante-1]"
        @etapeSuivante="verifierLaReponse"
      />
      <div v-else>
        <div v-if="nombreDeBonnesReponses === quizViewModel.questions.length" class="fr-text--bold">
          Bravo, vous avez réussi le quiz !<br>
          <img src="/leaf.svg" alt="leaf-logo" class="fr-mr-2v" />Vous avez gagné {{ nombreDePointsAGagner }} points
        </div>
        <div v-else class="fr-text--bold">Désolé, Vous avez perdu !</div>
        <router-link class="fr-btn fr-mt-5v" :to="{ name: 'coach' }">
          Revenir au coach
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import IndicateurDEtape from '@/components/dsfr/IndicateurDEtapes.vue'
  import QuestionDuQuiz from "@/components/custom/QuestionDuQuiz.vue";
  import { QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import { EnvoyerDonneesInteractionUsecase } from '@/interactions/envoyerDonneesInteraction.usecase';
  import { InteractionsRepositoryAxios } from '@/interactions/adapters/interactionsRepository.axios';

  const props = defineProps<{
    quizViewModel: QuizViewModel
    nombreDePointsAGagner: string,
    idUtilisateur: string,
    idInteraction: string
  }>();

  const nombreDeBonnesReponses = ref<number>(0);
  const etapeCourante = ref<number>(1);

  const getTitreEtape = (nombreEtape: number) => {
    if (etapeCourante.value > nombreEtape) return 'Fin du quizz';

    return `Question ${etapeCourante.value} sur ${nombreEtape}`;
  }

  const getTitreEtapeSuivante = (nombreEtape: number) => {
    if (etapeCourante.value+1 > nombreEtape) return 'Fin du quizz';

    return `Question ${etapeCourante.value+1} sur ${nombreEtape}`
  }
  
  const verifierLaReponse = async (value) => {
    etapeCourante.value++;

    if (value) nombreDeBonnesReponses.value++;
    
    if(etapeCourante.value > props.quizViewModel.questions.length) {
      const pourcentageDeReussite = nombreDeBonnesReponses.value / props.quizViewModel.questions.length * 100;
      await new EnvoyerDonneesInteractionUsecase(new InteractionsRepositoryAxios()).execute(props.idUtilisateur, props.idInteraction, pourcentageDeReussite);      
    }
  }
</script>
