<template>
  <form @submit.prevent="validerLaReponse">
    <BoutonRadio
      :options="listeDesReponses"
      :legende="question.intitule"
      legende-size="l"
      col=""
      orientation="vertical"
      name="questionDuQuiz"
      v-model="valueInput"
      :defaultValue="valueInput"
    />
    <button v-if="!isValide" class="fr-btn fr-btn--lg" title="Valider" type="submit" :disabled="valueInput === ''">
      Valider
    </button>
  </form>
  <div v-if="isValide">
    <QuizReponse
      :question="question.intitule"
      :solution="question.solution"
      :texte-explication-o-k="question.texteExplicationOK"
      :texte-explication-k-o="question.texteExplicationKO"
      :reponse-correcte="reponseCorrecte"
      :reponse="valueInput"
      :article-associe="articleAssocie"
      :points="points"
    />
    <div class="fr-grid-row fr-grid-row--middle flex-space-between border border-radius--md fr-p-2w">
      <span class="fr-m-0 fr-text--bold fr-text--md">Comment avez-vous trouvé ce quiz ?</span>
      <Notation @rated="noterLeQuiz" />
    </div>
    <router-link class="fr-btn fr-mt-3w" :to="{ name: RouteCoachName.COACH }"> Revenir à l'accueil </router-link>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { QuestionViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import QuizReponse from '@/components/custom/Quiz/QuizReponse.vue';
  import Notation from '@/components/custom/Notation.vue';
  import { EvaluerQuizUsecase } from '@/quiz/evaluerQuiz.usecase';
  import { QuizRepositoryAxios } from '@/quiz/adapters/quizRepository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ArticleDuQuiz } from '@/quiz/ports/quizRepository';
  import { RouteCoachName } from '@/router/coach/routeCoachName';

  const props = defineProps<{
    points: string;
    question: QuestionViewModel;
    quizId: string;
    articleAssocie: ArticleDuQuiz | null;
  }>();

  const valueInput = ref<string>('');
  const isValide = ref<boolean>(false);
  const reponseCorrecte = ref<boolean>(false);

  const listeDesReponses = ref(
    props.question.reponsesPossibles.map(reponse => ({
      label: reponse,
      value: reponse,
    }))
  );

  watch(
    () => props.question,
    () => {
      isValide.value = false;
      valueInput.value = '';
      listeDesReponses.value = props.question.reponsesPossibles.map(reponse => ({
        label: reponse,
        value: reponse,
      }));
    }
  );

  const emit = defineEmits(['quizTermine']);
  const validerLaReponse = () => {
    isValide.value = true;
    reponseCorrecte.value = valueInput.value === props.question.solution;
    listeDesReponses.value = props.question.reponsesPossibles.map(reponse => ({
      label: reponse,
      value: reponse,
      disabled: true,
      customClass: buildCustomClass(props.question.solution, valueInput.value, reponse),
    }));

    emit('quizTermine', reponseCorrecte.value);
  };

  const noterLeQuiz = note => {
    const evaluerQuizUsecase = new EvaluerQuizUsecase(new QuizRepositoryAxios());
    evaluerQuizUsecase.execute(props.quizId, utilisateurStore().utilisateur.id, note);
  };

  const buildCustomClass = (reponseCorrect: string, reponseDonnee: string, reponsePossible: string) => {
    if (reponsePossible === reponseCorrect) return 'quiz-article-bien-repondu';
    if (reponseDonnee !== reponseCorrecte && reponsePossible === reponseDonnee) return 'quiz-article-erreur';
    if (reponsePossible !== reponseDonnee) return '';
  };
</script>
