<template>
  <FilDAriane
    :page-courante="`Quiz ${quizViewModel?.titre}`"
    :page-hierarchie="[{
        label: 'Coach',
        url: '/coach',
      }]"
  />
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-lg-8">
        <div class="background--white border fr-p-2w border-radius--md">
          <IndicateurDEtape
            :titre-etape="getTitreEtape(quizViewModel.questions.length)"
            :titre-etape-suivante="getTitreEtapeSuivante(quizViewModel.questions.length)"
            :etape-courante="etapeCourante"
            :etape-total="quizViewModel.questions.length+1"  
          />
          <form @submit.prevent="evaluerQuizz">
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
      </div>
      <div class="fr-col-12 fr-col-lg-4">
        <BilanNosGestesClimat :get-impact-value="valeurBilanCarbone" />
      </div>
    </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import { EmpreinteViewModel } from '@/bilan/adapters/chargementEmpreinte.presenter.impl';
  import IndicateurDEtape from '@/components/dsfr/IndicateurDEtapes.vue'
  import QuestionDuQuiz from "@/components/custom/QuestionDuQuiz.vue";
  import FilDAriane from "@/components/dsfr/FilDAriane.vue";
  import BilanNosGestesClimat from '@/components/BilanNosGestesClimat.vue'

  defineProps<{
    quizViewModel: QuizViewModel
    nombreDePointsAGagner: string,
    valeurBilanCarbone: EmpreinteViewModel
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
  
  const evaluerQuizz = () => {
    // create usecase avec nombreDeBonnesReponses
    return;
  };

  const verifierLaReponse = (value) => {
    etapeCourante.value++;

    if (value) nombreDeBonnesReponses.value++;
  }
</script>