<template>
  <nav role="navigation" class="fr-breadcrumb fil-ariane fr-mb-0 fr-p-1v" aria-label="vous êtes ici :">
    <button class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb-2831">Voir le fil d’Ariane</button>
    <div class="fr-collapse" id="breadcrumb-2831">
      <ol class="fr-breadcrumb__list">
        <li>
          <a class="fr-breadcrumb__link" href="/coach">Coach</a>
        </li>
        <li>
          <a class="fr-breadcrumb__link" aria-current="page">Quiz</a>
        </li>
      </ol>
    </div>
  </nav>
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-5v">
    <div class="fr-col-12 fr-col-lg-8">
      <div class="dashboard-card-item">
        <div class="quiz-stepper-sub-container fr-pt-5v fr-pr-5v fr-pl-5v">
          <form @submit.prevent="evaluerQuizz">
            <h3 class="fr-mb-0">{{ getCategorie }}</h3>
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
                    :resultat-final-du-quiz="leQuizAEtePerdu"
                    @question-suivante="passerALaQuestionSuivante"
                  />
                </div>
                <div v-else-if="laReponseEstElleCorrecte">
                  <QuizReponseCorrecte
                    :etape-courante="questionCourante"
                    :etat-reponse-courante="getEtatDeLaReponseChoisie"
                    :get-score="getScore"
                    :quiz-view-model="quizViewModel!"
                    :resultat-final-du-quiz="leQuizAEtePerdu"
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
      <div class="fr-grid-row fr-grid-row--gutters card-item-list-container">
        <div class="fr-col-12">
          <BilanNosGestesClimat :get-impact-value="store.getters['utilisateur/getValeurBilanCarbone']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ChargementQuizUsecase } from "@/quiz/chargementQuiz.usecase";
import { QuizRepositoryAxios } from "@/quiz/adapters/quizRepositoryAxios";
import { ChargementQuizPresenterImpl, QuizViewModel } from "@/quiz/adapters/chargementQuiz.presenter.impl";
import { useRoute } from "vue-router";
import store from "@/store";
import { EvaluerQuizPresenterImpl, EvaluerQuizViewModel } from "@/quiz/adapters/evaluerQuiz.presenter.impl";
import router from "@/router";
import MesResultats from "@/components/MesResultats.vue";
import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
import CarteSkeleton from "@/components/CarteSkeleton.vue";
import QuizReponseCorrecte from "@/components/QuizReponseCorrecte.vue";
import QuizReponseIncorrecte from "@/components/QuizReponseIncorrecte.vue";
import QuestionDuQuiz from "@/components/QuestionDuQuiz.vue";
import { EtatDeLaResponse } from "@/components/etatDeLaReponse";
import { EvaluerQuizUsecase } from "@/quiz/evaluerQuiz.usecase";

export default defineComponent({
  name: "Quizz",
  computed: {
    store() {
      return store;
    },
    getScore(): string {
      return store.getters["utilisateur/getInteractionEnCours"].nombreDePointsAGagner;
    },
    getCategorie(): string {
      return store.getters["utilisateur/getInteractionEnCours"].categorie;
    },
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
    CarteSkeleton,
    BilanNosGestesClimat,
    MesResultats,
  },
  setup() {
    let etapeCourante = ref<number>(1);
    let questionCourante = ref<number>(1);
    const quizViewModel = ref<QuizViewModel>();
    let checkedResponses = new Map<string, string>();
    let etatDeLaReponseChoisie = ref<EtatDeLaResponse>(EtatDeLaResponse.INITIAL);
    let leQuizAEtePerdu = ref<boolean>(false);

    let idQuiz: string = "";
    const route = useRoute();
    if (typeof route.params.id === "string") {
      idQuiz = route.params.id;
    }

    function mapValuesQuiz(viewModel: QuizViewModel) {
      quizViewModel.value = viewModel;
    }

    function mapValuesEvaluer(viewModel: EvaluerQuizViewModel) {
      if (viewModel.quizGagne) {
        router.push({ name: "quiz-gagne" });
      } else {
        router.push({ name: "quiz-perdu", state: { quizId: idQuiz } });
      }
    }

    const quizzRepositoryAxios = new QuizRepositoryAxios();

    const chargementQuizz = () => {
      const chargementQuizzUsecase = new ChargementQuizUsecase(quizzRepositoryAxios);
      chargementQuizzUsecase.execute(idQuiz, new ChargementQuizPresenterImpl(mapValuesQuiz));
    };

    onMounted(chargementQuizz);

    const evaluerQuizz = () => {
      const utilisateurId = store.getters["utilisateur/getId"];
      const evaluerQuizzUsecase = new EvaluerQuizUsecase(quizzRepositoryAxios);
      evaluerQuizzUsecase.execute(utilisateurId, idQuiz, checkedResponses, new EvaluerQuizPresenterImpl(mapValuesEvaluer));
    };

    function handleReponse(listeDesReponses: Map<string, string>) {
      checkedResponses = listeDesReponses;
    }

    function verificationDelaReponse(responseDelaQuestion: string, questionId: string) {
      etapeCourante.value++;
      if (responseDelaQuestion != checkedResponses.get(questionId)) {
        etatDeLaReponseChoisie.value = EtatDeLaResponse.REPONSE_INCORRECT;
        leQuizAEtePerdu.value = true;
      } else {
        etatDeLaReponseChoisie.value = EtatDeLaResponse.REPONSE_CORRECT;
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
      leQuizAEtePerdu,
    };
  },
});
</script>

<style scoped>
.quiz-question-container {
  text-align: left;
  width: 100%;
  min-height: 13vh;
}

.stepper-actions span:hover {
  cursor: pointer;
}

.quiz-stepper-sub-container {
  text-align: left;
}

.container-of-quiz-steps {
  margin-bottom: 10px;
}
</style>
