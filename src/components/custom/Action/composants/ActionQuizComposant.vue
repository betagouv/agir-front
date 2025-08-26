<template>
  <ActionQuizQuestion
    v-if="!reponseDonneeLabel"
    :question="question.intitule"
    :questions="props.question.reponsesPossibles"
    @quiz-termine="afficherArticle"
  />

  <div v-if="reponseDonneeLabel">
    <h2 class="fr-h4">{{ question.intitule }}</h2>

    <p
      class="text--black"
      ref="reponsePElement"
      tabindex="-1"
      :class="estBienRepondu ? 'action__quiz-reponseBonne' : 'action__quiz-reponseFausse'"
    >
      <span aria-hidden="true" class="fr-pr-1w">{{ estBienRepondu ? '✅' : '❌' }}</span>
      {{ estBienRepondu ? 'Bien joué ! La réponse était' : 'Pas tout à fait... Vous avez répondu' }}&nbsp;:
      <span class="text--bold">{{ reponseDonneeLabel }}</span>
    </p>

    <ActionQuizExplication
      :article-associe="article ?? null"
      :on-click-continuer="passerQuestionSuivante"
      :reponse-correcte="estBienRepondu"
      :texte-explication-k-o="question.texteExplicationKO"
      :texte-explication-o-k="question.texteExplicationOK"
      :bouton-suivant-libelle="estDerniereQuestion ? 'Voir le résultat' : 'Question suivante'"
    />
  </div>
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue';
  import ActionQuizExplication from '@/components/custom/Action/composants/ActionQuizExplication.vue';
  import ActionQuizQuestion from '@/components/custom/Action/composants/ActionQuizQuestion.vue';
  import { ActionQuizQuestionViewModel } from '@/domaines/actions/ports/action.presenter';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quiz.repository.axios';
  import { EnvoyerDonneesQuizInteractionUsecase } from '@/domaines/quiz/envoyerDonneesQuizInteraction.usecase';
  import { ArticleDuQuiz } from '@/domaines/quiz/ports/quiz.repository';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    quizId: string;
    question: ActionQuizQuestionViewModel;
    article?: ArticleDuQuiz;
    onClickContinuer: () => void;
    estDerniereQuestion: boolean;
  }>();

  const idUtilisateur = utilisateurStore().utilisateur.id;
  const reponseDonneeLabel = ref<string>('');
  const estBienRepondu = ref<boolean>(false);
  const reponsePElement = ref<HTMLParagraphElement>();

  const passerQuestionSuivante = () => {
    props.onClickContinuer();
    reponseDonneeLabel.value = '';
    estBienRepondu.value = false;
  };

  const afficherArticle = async reponse => {
    reponseDonneeLabel.value =
      props.question.reponsesPossibles.find(reponsePossible => reponsePossible.value === reponse)?.label ?? reponse;
    estBienRepondu.value = props.question.solution === reponse;

    await new EnvoyerDonneesQuizInteractionUsecase(
      new QuizRepositoryAxios(),
      ToDoListEventBusImpl.getInstance(),
    ).execute(idUtilisateur, props.quizId, estBienRepondu.value ? 100 : 0);

    await nextTick();
    reponsePElement.value?.focus();
  };
</script>

<style scoped>
  .action__quiz-reponseBonne {
    background-color: #fafced;
    border: 1px solid #cbe1aa;
    padding: 1rem;
  }

  .action__quiz-reponseFausse {
    background-color: #fef7f7;
    border: 1px solid #ffcaca;
    padding: 1rem;
  }
</style>
