<template>
  <FilDAriane
    :page-courante="`Quiz ${quizViewModel?.titre}`"
    :page-hierarchie="[{
        label: 'Coach',
        url: '/coach',
      }]"
  />
  <div v-if="quizViewModel" class="fr-grid-row fr-grid-row--gutters">
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
              <img src="/leaf.svg" alt="leaf-logo" class="fr-mr-2v" />Vous avez gagné {{ store.interactionEnCours?.nombreDePointsAGagner }} points
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
      <BilanNosGestesClimat :get-impact-value="store.valeurBilanCarbone" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { ChargementQuizUsecase } from "@/quiz/chargementQuiz.usecase";
  import { QuizRepositoryAxios } from "@/quiz/adapters/quizRepositoryAxios";
  import { ChargementQuizPresenterImpl, QuizViewModel } from "@/quiz/adapters/chargementQuiz.presenter.impl";
  import { useRoute } from "vue-router";
  import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
  import IndicateurDEtape from '@/components/dsfr/IndicateurDEtapes.vue'
  import QuestionDuQuiz from "@/components/custom/QuestionDuQuiz.vue";
  import FilDAriane from "./dsfr/FilDAriane.vue";
  import { utilisateurStore } from "@/store/utilisateur";

  const nombreDeBonnesReponses = ref<number>(0);
  const etapeCourante = ref<number>(1);
  const quizViewModel = ref<QuizViewModel>();
  const store = utilisateurStore();
  const route = useRoute();

  const idQuiz = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  const quizzRepositoryAxios = new QuizRepositoryAxios();

  const mapValuesQuiz = (viewModel: QuizViewModel) => {
    quizViewModel.value = viewModel;
  }

  const chargementQuizz = () => {
    const chargementQuizzUsecase = new ChargementQuizUsecase(quizzRepositoryAxios);
    chargementQuizzUsecase.execute(idQuiz, new ChargementQuizPresenterImpl(mapValuesQuiz));
  };

  const getTitreEtape = (nombreEtape: number) => {
    if (etapeCourante.value > nombreEtape) return 'Fin du quizz';

    return `Question ${etapeCourante.value} sur ${nombreEtape}`;
  }

  const getTitreEtapeSuivante = (nombreEtape: number) => {
    if (etapeCourante.value+1 > nombreEtape) return 'Fin du quizz';

    return `Question ${etapeCourante.value+1} sur ${nombreEtape}`
  }
  
  onMounted(chargementQuizz);
  
  const evaluerQuizz = () => {
    // create usecase avec nombreDeBonnesReponses
    return;
  };

  const verifierLaReponse = (value) => {
    etapeCourante.value++;

    if (value) nombreDeBonnesReponses.value++;
  }
</script>