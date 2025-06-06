<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-8">
      <h1 class="flex align-items--center gap--small">
        <slot>
          <span class="fr-h2">Une question sur la thématique</span>
          <ThematiqueTag :tag="{ ...quizViewModel.thematiqueTag, display: 'xl' }" />
        </slot>
      </h1>
      <div class="background--white border fr-p-2w border-radius--md">
        <QuizQuestion
          :question="quizViewModel.question.intitule"
          :questions="listeDesReponses"
          @quiz-termine="verifierLaReponse"
        />
        <QuizArticle
          v-if="isValide"
          :article-associe="articleAssocie"
          :est-enchainement-mission="estEnchainementMission"
          :on-click-continuer="onClickContinuer"
          :points="quizViewModel.nombreDePointsAGagner"
          :quiz-id="quizViewModel.articleAssocie?.id!"
          :reponse-correcte="estBienRepondu"
          :texte-explication-k-o="quizViewModel.question.texteExplicationKO"
          :texte-explication-o-k="quizViewModel.question.texteExplicationOK"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import QuizArticle from '@/components/custom/Quiz/QuizArticle.vue';
  import QuizQuestion from '@/components/custom/Quiz/QuizQuestion.vue';
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quiz.repository.axios';
  import { EnvoyerDonneesQuizInteractionUsecase } from '@/domaines/quiz/envoyerDonneesQuizInteraction.usecase';
  import { QuizViewModel } from '@/domaines/quiz/ports/chargementQuizz.presenter';
  import { ArticleDuQuiz } from '@/domaines/quiz/ports/quiz.repository';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';

  const props = defineProps<{
    quizViewModel: QuizViewModel;
    idUtilisateur: string;
    isModePrevisualisation: boolean;
    idQuiz: string;
    articleAssocie: ArticleDuQuiz | null;
    estEnchainementMission?: boolean;
    onClickContinuer?: () => void;
  }>();

  const isValide = ref<boolean>(false);
  const nombreDeBonnesReponses = ref<number>(0);
  const estBienRepondu = ref<boolean>(false);
  const listeDesReponses = ref(
    props.quizViewModel.question.reponsesPossibles.map(reponse => ({
      label: reponse,
      value: reponse,
    })),
  );

  const verifierLaReponse = async value => {
    isValide.value = true;
    estBienRepondu.value = props.quizViewModel.question.solution === value;

    if (value) nombreDeBonnesReponses.value++;

    listeDesReponses.value = props.quizViewModel.question.reponsesPossibles.map(reponse => ({
      label: reponse,
      value: reponse,
      disabled: true,
      customClass: buildCustomClass(props.quizViewModel.question.solution, value, reponse),
    }));

    if (!props.isModePrevisualisation) {
      await new EnvoyerDonneesQuizInteractionUsecase(
        new QuizRepositoryAxios(),
        ToDoListEventBusImpl.getInstance(),
      ).execute(props.idUtilisateur, props.idQuiz, estBienRepondu.value ? 100 : 0);
    }
  };

  const buildCustomClass = (reponseCorrecte: string, reponseDonnee: string, reponsePossible: string) => {
    if (reponsePossible === reponseCorrecte) return 'quiz-article-bien-repondu';
    if (reponseDonnee !== reponseCorrecte && reponsePossible === reponseDonnee) return 'quiz-article-erreur';
    if (reponsePossible !== reponseDonnee) return '';
  };
</script>
