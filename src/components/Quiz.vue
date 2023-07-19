<template>
  <div style="margin: 10px">
    <nav style="text-align: left; margin: 0 0 -20px 30px" role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
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
  </div>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-8">
      <div class="dashboard-card-item container-of-quiz-steps">
        <div class="quiz-stepper-sub-container">
          <form @submit.prevent="evaluerQuizz">
            <h3>📒 {{ quizzViewModel?.titre }}</h3>
            <div
              v-if="currentStep"
              class="fr-stepper__steps"
              style="margin: -20px 0 0 0"
              :data-fr-current-step="`${currentStep.toString()}`"
              :data-fr-steps="`${quizzViewModel?.questions.length.toString()}`"
            ></div>
            <br />
            <fieldset
              v-for="item in quizzViewModel?.questions"
              :key="item.ordre"
              class="fr-fieldset"
              :id="`radio-disabled-${item.ordre}`"
              :aria-labelledby="`radio-${item.ordre}-legend radio-disabled-messages-${item}`"
            >
              <div v-if="currentStep.toString() == item.ordre" class="quiz-question-container">
                <h3 style="text-align: left; margin: 0 0 0.5em 0.5em">{{ item.intitule }}</h3>
                <div v-for="reponse in item.reponsesPossibles" class="fr-fieldset__element">
                  <div class="fr-radio-group">
                    <input
                      @change="handleReponse($event, item.id.toString())"
                      :value="`${reponse}`"
                      type="radio"
                      :id="`radio-${item.ordre}-disabled-${reponse}`"
                      :name="`radio-disabled-${item.ordre}`"
                    />
                    <label class="fr-label" :for="`radio-${item.ordre}-disabled-${reponse}`">
                      {{ reponse }}
                    </label>
                  </div>
                </div>
                <div class="fr-messages-group" :id="`radio-disabled-messages-${item.ordre}`" aria-live="assertive"></div>
                <div class="stepper-actions" v-if="quizzViewModel">
                  <button
                    v-if="currentStep < quizzViewModel?.questions.length"
                    @click="questionSuivante"
                    class="fr-btn custom-button-next-quiz-question"
                    title="Valider"
                  >
                    Suivant
                  </button>
                  <span
                    @click="skipQuestion(item.id)"
                    v-if="currentStep < quizzViewModel?.questions?.length"
                    class="fr-btn stepper-actions-ignore-question"
                    title="Passer la question"
                  >
                    Passer la question
                  </span>
                  <button
                    v-if="parseInt(item.ordre) == quizzViewModel?.questions?.length"
                    class="fr-btn custom-button-next-quiz-question"
                    id="button-2864"
                    title="Envoyer le formulaire"
                  >
                    Valider mes réponses
                  </button>
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
import { EvaluerQuizViewModel } from "@/quiz/adapters/evaluerQuiz.presenter.impl";
import router from "@/router";
import { InteractionsRepositoryAxios } from "@/interactions/adapters/interactionsRepository.axios";
import MesResultats from "@/components/MesResultats.vue";
import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
import CarteSkeleton from "@/components/CarteSkeleton.vue";
import QuizReponseCorrecte from "@/components/QuizReponseCorrecte.vue";
import QuizReponseIncorrecte from "@/components/QuizReponseIncorrecte.vue";

export enum EtatDeLaResponse {
  INITIAL = "ETAT_INITIAL",
  REPONSE_CORRECT = "REPONSE_CORRECTE",
  REPONSE_INCORRECT = "REPONSE_INCORRECT",
}
export default defineComponent({
  name: "Quizz",
  computed: {
    store() {
      return store;
    },
    getScore(): string {
      return store.getters["utilisateur/getInteractionEnCours"].nombreDePointsAGagner;
    },
    laReponseEstElleCorrecte(): boolean {
      return this.etatDeLaReponseChoisie === EtatDeLaResponse.REPONSE_CORRECT;
    },
    laReponseEstElleIncorrecte(): boolean {
      return this.etatDeLaReponseChoisie === EtatDeLaResponse.REPONSE_INCORRECT;
    },
  },
  components: {
    QuizReponseIncorrecte,
    QuizReponseCorrecte,
    CarteSkeleton,
    BilanNosGestesClimat,
    MesResultats,
  },
  setup() {
    let etapeCourante = ref<number>(1);
    const quizViewModel = ref<QuizViewModel>();
    const checkedResponses = new Map<string, string>();
    let etatDeLaReponseChoisie = ref<EtatDeLaResponse>(EtatDeLaResponse.INITIAL);

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

    function handleReponse(event: Event, idQuestion: string) {
      const reponse = (event.target as HTMLInputElement).value;
      checkedResponses.set(idQuestion, reponse);
    }

    const quizzRepositoryAxios = new QuizRepositoryAxios();
    const interactionsRepositoryAxios = new InteractionsRepositoryAxios();

    const chargementQuizz = () => {
      const chargementQuizzUsecase = new ChargementQuizUsecase(quizzRepositoryAxios);
      chargementQuizzUsecase.execute(idQuiz, new ChargementQuizPresenterImpl(mapValuesQuiz));
    };

    onMounted(chargementQuizz);

    const evaluerQuizz = () => {
      const utilisateurId = store.getters["utilisateur/getId"];
      const interactionId = store.getters["utilisateur/getInteractionEnCours"];
      const evaluerQuizzUsecase = new EvaluerQuizUsecase(quizzRepositoryAxios, interactionsRepositoryAxios);
      evaluerQuizzUsecase.execute(interactionId, utilisateurId, idQuiz, checkedResponses, new EvaluerQuizPresenterImpl(mapValuesEvaluer));
    };

    function verificationDelaReponse(responseDelaQuestion: string, questionId: string) {
      if (responseDelaQuestion != checkedResponses.get(questionId)) {
        etatDeLaReponseChoisie.value = EtatDeLaResponse.REPONSE_INCORRECT;
      } else {
        etatDeLaReponseChoisie.value = EtatDeLaResponse.REPONSE_CORRECT;
      }
    }

    function passerALaQuestionSuivante() {
      etatDeLaReponseChoisie.value = EtatDeLaResponse.INITIAL;
      etapeCourante.value = etapeCourante.value + 1;
    }

    return {
      quizViewModel,
      evaluerQuizz,
      handleReponse,
      verificationDelaReponse,
      etapeCourante,
      passerALaQuestionSuivante,
      etatDeLaReponseChoisie,
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

.stepper-actions-ignore-question {
  margin: 10px;
  background-color: #f6f6f6;
  color: #000091;
}

.quiz-stepper-container {
  margin: 10px;
  border: 1px solid darkgrey;
  border-radius: 3px;
}

.quiz-stepper-sub-container {
  margin: 3em 3em 0 3em;
}

#app > div > div > div > div > form > div {
  border-radius: 5px;
  background-color: #000091;
}

.container-of-quiz-steps {
  margin-bottom: 10px;
}
.custom-button-next-quiz-question {
  margin: 0 0 0 0.5em;
}
</style>
