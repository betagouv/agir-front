<template>
  <QuizReponse
    :texte-explication-o-k="texteExplicationOK"
    :texte-explication-k-o="texteExplicationKO"
    :reponse-correcte="reponseCorrecte"
    :article-associe="articleAssocie"
    :points="points"
  />
  <div class="fr-grid-row fr-grid-row--middle flex-space-between border border-radius--md fr-p-2w">
    <span class="fr-m-0 fr-text--bold fr-text--md">Comment avez-vous trouvé ce quiz ?</span>
    <Notation @rated="noterLeQuiz" />
  </div>
  <button v-if="estEnchainementMission" class="fr-btn fr-btn--lg fr-mt-3w" @click="onClickContinuer">Continuer</button>

  <BoutonRetourAutomatique v-else />
</template>

<script setup lang="ts">
  import BoutonRetourAutomatique from '@/components/custom/BoutonRetourAutomatique.vue';
  import Notation from '@/components/custom/Notation.vue';
  import QuizReponse from '@/components/custom/Quiz/QuizReponse.vue';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quiz.repository.axios';
  import { EvaluerQuizUsecase } from '@/domaines/quiz/evaluerQuiz.usecase';
  import { ArticleDuQuiz } from '@/domaines/quiz/ports/quiz.repository';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    texteExplicationKO: string | null;
    texteExplicationOK: string | null;
    reponseCorrecte: boolean;
    articleAssocie: ArticleDuQuiz | null;
    points: string;
    quizId: string;
    estEnchainementMission?: boolean;
    onClickContinuer?: () => void;
  }>();

  const noterLeQuiz = note => {
    const evaluerQuizUsecase = new EvaluerQuizUsecase(new QuizRepositoryAxios());
    evaluerQuizUsecase.execute(props.quizId, utilisateurStore().utilisateur.id, note);
  };
</script>
