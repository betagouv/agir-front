<template>
  <QuizQuestion
    v-if="!reponseDonnee"
    :question="question.intitule"
    :questions="listeDesReponses"
    @quiz-termine="afficherArticle"
  />

  <div v-if="reponseDonnee">
    <h2 class="fr-h4">{{ question.intitule }}</h2>
    <p
      :aria-label="estBienRepondu ? 'Bonne réponse' : 'Mauvaise réponse'"
      class="text--black"
      :class="estBienRepondu ? 'action__quiz-reponseBonne' : 'action__quiz-reponseFausse'"
    >
      <span aria-hidden="true" class="fr-pr-1w">{{ estBienRepondu ? '✅' : '❌' }}</span>
      Votre réponse&nbsp;: <span class="text--bold">{{ reponseDonnee }}</span>
    </p>

    <ActionQuizExplication
      :article-associe="article ?? null"
      :on-click-continuer="passerQuestionSuivante"
      :quiz-id="article?.id!"
      :reponse-correcte="estBienRepondu"
      :texte-explication-k-o="question.texteExplicationKO"
      :texte-explication-o-k="question.texteExplicationOK"
      bouton-suivant-libelle="Question suivante"
      points="5"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import ActionQuizExplication from '@/components/custom/Quiz/ActionQuizExplication.vue';
  import QuizQuestion from '@/components/custom/Quiz/QuizQuestion.vue';
  import { ActionQuizQuestionViewModel } from '@/domaines/actions/ports/action.presenter';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quizRepository.axios';
  import { EnvoyerDonneesQuizInteractionUsecase } from '@/domaines/quiz/envoyerDonneesQuizInteraction.usecase';
  import { ArticleDuQuiz } from '@/domaines/quiz/ports/quizRepository';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    quizId: string;
    question: ActionQuizQuestionViewModel;
    article?: ArticleDuQuiz;
    onClickContinuer: () => void;
  }>();

  const idUtilisateur = utilisateurStore().utilisateur.id;
  const reponseDonnee = ref<string>('');
  const estBienRepondu = ref<boolean>(false);
  const listeDesReponses = ref(
    props.question.reponsesPossibles.map(reponse => ({
      label: reponse,
      value: reponse,
    })),
  );

  const passerQuestionSuivante = () => {
    props.onClickContinuer();
    reponseDonnee.value = '';
    estBienRepondu.value = false;
  };

  const afficherArticle = async reponse => {
    reponseDonnee.value = reponse;
    estBienRepondu.value = props.question.solution === reponse;

    listeDesReponses.value = props.question.reponsesPossibles.map(possibilite => ({
      label: possibilite,
      value: possibilite,
      disabled: true,
      customClass: buildCustomClass(props.question.solution, reponse, possibilite),
    }));

    await new EnvoyerDonneesQuizInteractionUsecase(
      new QuizRepositoryAxios(),
      ToDoListEventBusImpl.getInstance(),
    ).execute(idUtilisateur, props.quizId, estBienRepondu.value ? 100 : 0);
  };

  const buildCustomClass = (reponseCorrecte: string, reponseDonnee: string, reponsePossible: string) => {
    if (reponsePossible === reponseCorrecte) return 'quiz-article-bien-repondu';
    if (reponseDonnee !== reponseCorrecte && reponsePossible === reponseDonnee) return 'quiz-article-erreur';
    if (reponsePossible !== reponseDonnee) return '';
  };
</script>

<style scoped>
  .action__quiz-reponseBonne {
    background-color: #fafced;
    border: 1px solid #cbe1aa;
    border-radius: 8px;
    padding: 1rem;
  }

  .action__quiz-reponseFausse {
    background-color: #fef7f7;
    border: 1px solid #ffcaca;
    border-radius: 8px;
    padding: 1rem;
  }
</style>
