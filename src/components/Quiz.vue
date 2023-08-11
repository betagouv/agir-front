<template>
  <FilDAriane
    page-courante="Quiz"
    :page-hierarchie="[
      {
        label: 'Coach',
        url: '/coach',
      },
    ]"
  />
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-5v">
    <div class="fr-col-12 fr-col-lg-8">
      <div class="dashboard-card-item">
        <div class="quiz-stepper-sub-container fr-pt-5v fr-pr-5v fr-pl-5v">
          <form @submit.prevent="evaluerQuizz">
            <h3 class="fr-mb-0">{{ store.interactionEnCours!.categorie }}</h3>
            <div
              v-if="etapeCourante"
              class="fr-stepper__steps"
              :data-fr-current-step="`${etapeCourante.toString()}`"
              :data-fr-steps="`${quizViewModel?.steps}`"
            ></div>
            <fieldset
              v-for="item in quizViewModel?.questions"
              :key="item.ordre"
              class="fr-fieldset"
              :id="`radio-disabled-${item.ordre}`"
              :aria-labelledby="`radio-${item.ordre}-legend radio-disabled-messages-${item}`"
            >
              <div v-if="questionCourante.toString() == item.ordre" class="quiz-question-container fr-mt-5v">
                <div v-if="laReponseEstElleIncorrecte">
                  <QuizReponseIncorrecte
                    :etape-courante="questionCourante"
                    :item="item"
                    :quiz-view-model="quizViewModel!"
                    :le-quiz-contient-au-moins-une-reponse-incorrecte="leQuizContientAuMoinsUneReponseIncorrecte"
                    @question-suivante="passerALaQuestionSuivante"
                  />
                </div>
                <div v-else-if="laReponseEstElleCorrecte">
                  <QuizReponseCorrecte
                    :etape-courante="questionCourante"
                    :etat-reponse-courante="getEtatDeLaReponseChoisie"
                    :get-score="store.interactionEnCours!.nombreDePointsAGagner"
                    :quiz-view-model="quizViewModel!"
                    :le-quiz-contient-au-moins-une-reponse-incorrecte="leQuizContientAuMoinsUneReponseIncorrecte"
                    @question-suivante="passerALaQuestionSuivante"
                  />
                </div>
                <div v-else>
                  <QuestionDuQuiz
                    @envoyer-reponse="handleReponse"
                    @verifier-reponse="verificationDelaReponse"
                    :item="item"
                    :quiz-view-model="quizViewModel!"
                    :etape-courante="questionCourante"
                    :valeur-des-reponses="checkedResponses"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
    <div class="fr-col-12 fr-col-lg-4">
      <BilanNosGestesClimat :get-impact-value="store.valeurBilanCarbone" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ChargementQuizUsecase } from "@/quiz/chargementQuiz.usecase";
import { QuizRepositoryAxios } from "@/quiz/adapters/quizRepositoryAxios";
import { ChargementQuizPresenterImpl, QuizViewModel } from "@/quiz/adapters/chargementQuiz.presenter.impl";
import { useRoute } from "vue-router";
import { EvaluerQuizPresenterImpl } from "@/quiz/adapters/evaluerQuiz.presenter.impl";
import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
import QuizReponseCorrecte from "@/components/QuizReponseCorrecte.vue";
import QuizReponseIncorrecte from "@/components/QuizReponseIncorrecte.vue";
import QuestionDuQuiz from "@/components/QuestionDuQuiz.vue";
import { EtatDeLaResponse } from "@/components/etatDeLaReponse";
import { EvaluerQuizUsecase } from "@/quiz/evaluerQuiz.usecase";
import { InteractionsRepositoryAxios } from "@/interactions/adapters/interactionsRepository.axios";
import FilDAriane from "./dsfr/FilDAriane.vue";
import { utilisateurStore } from "@/store/utilisateur";

export default defineComponent({
  name: "Quizz",
  computed: {
    getEtatDeLaReponseChoisie(): EtatDeLaResponse {
      return this.etatDeLaReponseChoisie;
    },
    laReponseEstElleCorrecte(): boolean {
      return this.etatDeLaReponseChoisie === EtatDeLaResponse.REPONSE_CORRECT;
    },
    laReponseEstElleIncorrecte(): boolean {
      return this.etatDeLaReponseChoisie === EtatDeLaResponse.REPONSE_INCORRECT;
    },
  },
  components: {
    QuestionDuQuiz,
    QuizReponseIncorrecte,
    QuizReponseCorrecte,
    BilanNosGestesClimat,
    FilDAriane,
  },
  setup() {
    let etapeCourante = ref<number>(1);
    let questionCourante = ref<number>(1);
    const quizViewModel = ref<QuizViewModel>();
    let checkedResponses = new Map<string, string>();
    let etatDeLaReponseChoisie = ref<EtatDeLaResponse>(EtatDeLaResponse.INITIAL);
    let leQuizContientAuMoinsUneReponseIncorrecte = ref<boolean>(false);
    const store = utilisateurStore();
    let idQuiz: string = "";
    const route = useRoute();
    if (typeof route.params.id === "string") {
      idQuiz = route.params.id;
    }

    function mapValuesQuiz(viewModel: QuizViewModel) {
      quizViewModel.value = viewModel;
    }

    const quizzRepositoryAxios = new QuizRepositoryAxios();
    const interactionsRepositoryAxios = new InteractionsRepositoryAxios();

    const chargementQuizz = () => {
      const chargementQuizzUsecase = new ChargementQuizUsecase(quizzRepositoryAxios);
      chargementQuizzUsecase.execute(idQuiz, new ChargementQuizPresenterImpl(mapValuesQuiz));
    };

    onMounted(chargementQuizz);

    const evaluerQuizz = () => {
      const utilisateurId = store.id;
      const interactionId = store.interactionEnCours!.id;
      const evaluerQuizzUsecase = new EvaluerQuizUsecase(quizzRepositoryAxios, interactionsRepositoryAxios);
      evaluerQuizzUsecase.execute(interactionId, utilisateurId, idQuiz, checkedResponses, new EvaluerQuizPresenterImpl(() => {}));
    };

    function handleReponse(listeDesReponses: Map<string, string>) {
      checkedResponses = listeDesReponses;
    }

    function verificationDelaReponse(responseDelaQuestion: string, questionId: string) {
      etapeCourante.value++;
      if (responseDelaQuestion != checkedResponses.get(questionId)) {
        etatDeLaReponseChoisie.value = EtatDeLaResponse.REPONSE_INCORRECT;
        leQuizContientAuMoinsUneReponseIncorrecte.value = true;
      } else {
        etatDeLaReponseChoisie.value = EtatDeLaResponse.REPONSE_CORRECT;
      }
      if (questionCourante.value === quizViewModel.value?.questions.length) {
        evaluerQuizz();
      }
    }

    function passerALaQuestionSuivante(nouvelleEtapeCourante: number, nouvelEtatDeLaReponseChoisie: EtatDeLaResponse) {
      questionCourante.value = nouvelleEtapeCourante;
      etatDeLaReponseChoisie.value = nouvelEtatDeLaReponseChoisie;
      etapeCourante.value++;
    }

    return {
      quizViewModel,
      evaluerQuizz,
      handleReponse,
      verificationDelaReponse,
      etapeCourante,
      questionCourante,
      passerALaQuestionSuivante,
      etatDeLaReponseChoisie,
      checkedResponses,
      leQuizContientAuMoinsUneReponseIncorrecte,
      store,
    };
  },
});
</script>

<style scoped>
.quiz-question-container {
  text-align: left;
  width: 100%;
}

.stepper-actions span:hover {
  cursor: pointer;
}

.quiz-stepper-sub-container {
  text-align: left;
}
</style>
