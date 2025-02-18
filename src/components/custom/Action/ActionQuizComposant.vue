<template>
  <QuizQuestion :question="question.intitule" :questions="listeDesReponses" @quiz-termine="afficherArticle" />
  <QuizArticle
    v-if="article && aEteRepondu"
    :article-associe="article"
    :est-enchainement-mission="true"
    :on-click-continuer="passerQuestionSuivante"
    :quiz-id="article.id"
    :reponse-correcte="estBienRepondu"
    :texte-explication-k-o="question.texteExplicationKO"
    :texte-explication-o-k="question.texteExplicationOK"
    points=""
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import QuizArticle from '@/components/custom/Quiz/QuizArticle.vue';
  import QuizQuestion from '@/components/custom/Quiz/QuizQuestion.vue';
  import { ActionQuizQuestionViewModel } from '@/domaines/actions/ports/action.presenter';
  import { ArticleDuQuiz } from '@/domaines/quiz/ports/quizRepository';

  const props = defineProps<{
    question: ActionQuizQuestionViewModel;
    article?: ArticleDuQuiz;
    onClickContinuer: () => void;
  }>();

  const aEteRepondu = ref<boolean>(false);
  const estBienRepondu = ref<boolean>(false);
  const listeDesReponses = ref(
    props.question.reponsesPossibles.map(reponse => ({
      label: reponse,
      value: reponse,
    })),
  );

  const passerQuestionSuivante = () => {
    props.onClickContinuer();
    aEteRepondu.value = false;
    estBienRepondu.value = false;
  };

  const afficherArticle = reponse => {
    aEteRepondu.value = true;
    estBienRepondu.value = props.question.solution === reponse;

    listeDesReponses.value = props.question.reponsesPossibles.map(possibilite => ({
      label: possibilite,
      value: possibilite,
      disabled: true,
      customClass: buildCustomClass(props.question.solution, reponse, possibilite),
    }));
  };

  const buildCustomClass = (reponseCorrecte: string, reponseDonnee: string, reponsePossible: string) => {
    if (reponsePossible === reponseCorrecte) return 'quiz-article-bien-repondu';
    if (reponseDonnee !== reponseCorrecte && reponsePossible === reponseDonnee) return 'quiz-article-erreur';
    if (reponsePossible !== reponseDonnee) return '';
  };
</script>
