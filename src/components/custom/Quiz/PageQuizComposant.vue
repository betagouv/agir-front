<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane :page-courante="`Quiz ${quizViewModel.titre}`" />
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-lg-8">
        <p>
          <span class="fr-h2">Quiz</span>
          <span class="fr-h3">{{ quizViewModel.thematique }}</span>
        </p>
        <div class="background--white border fr-p-2w border-radius--md">
          <QuizQuestion
            :questions="listeDesReponses"
            :question="quizViewModel.questions[0].intitule"
            @quiz-termine="verifierLaReponse"
          />
          <QuizArticle
            v-if="isValide"
            :texte-explication-o-k="quizViewModel.questions[0].texteExplicationOK"
            :texte-explication-k-o="quizViewModel.questions[0].texteExplicationKO"
            :reponse-correcte="estBienRepondu"
            :article-associe="articleAssocie"
            :points="quizViewModel.nombreDePointsAGagner"
            :quiz-id="quizViewModel.articleAssocie?.id!"
          />
        </div>
      </div>
      <div class="fr-col-12 fr-col-lg-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { QuizViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { ArticleDuQuiz } from '@/quiz/ports/quizRepository';
  import QuizArticle from '@/components/custom/Quiz/QuizArticle.vue';
  import QuizQuestion from '@/components/custom/Quiz/QuizQuestion.vue';
  import { EnvoyerDonneesQuizInteractionUsecase } from '@/quiz/envoyerDonneesQuizInteraction.usecase';
  import { QuizRepositoryAxios } from '@/quiz/adapters/quizRepository.axios';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';

  const props = defineProps<{
    quizViewModel: QuizViewModel;
    idUtilisateur: string;
    isModePrevisualisation: boolean;
    idQuiz: string;
    articleAssocie: ArticleDuQuiz | null;
  }>();

  const isValide = ref<boolean>(false);
  const nombreDeBonnesReponses = ref<number>(0);
  const estBienRepondu = ref<boolean>(false);
  const listeDesReponses = ref(
    props.quizViewModel.questions[0].reponsesPossibles.map(reponse => ({
      label: reponse,
      value: reponse,
    }))
  );

  const verifierLaReponse = async value => {
    isValide.value = true;
    estBienRepondu.value = props.quizViewModel.questions[0].solution === value;

    if (value) nombreDeBonnesReponses.value++;

    listeDesReponses.value = props.quizViewModel.questions[0].reponsesPossibles.map(reponse => ({
      label: reponse,
      value: reponse,
      disabled: true,
      customClass: buildCustomClass(props.quizViewModel.questions[0].solution, value, reponse),
    }));

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

  const buildCustomClass = (reponseCorrecte: string, reponseDonnee: string, reponsePossible: string) => {
    if (reponsePossible === reponseCorrecte) return 'quiz-article-bien-repondu';
    if (reponseDonnee !== reponseCorrecte && reponsePossible === reponseDonnee) return 'quiz-article-erreur';
    if (reponsePossible !== reponseDonnee) return '';
  };
</script>
