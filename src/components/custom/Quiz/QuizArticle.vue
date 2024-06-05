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
  <router-link class="fr-btn fr-mt-3w" :to="boutonRetourUrl.url"> {{ boutonRetourUrl.label }} </router-link>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import Notation from '@/components/custom/Notation.vue';
  import QuizReponse from '@/components/custom/Quiz/QuizReponse.vue';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quizRepository.axios';
  import { EvaluerQuizUsecase } from '@/domaines/quiz/evaluerQuiz.usecase';
  import { ArticleDuQuiz } from '@/domaines/quiz/ports/quizRepository';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { RouteUniversName } from '@/router/univers/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    texteExplicationKO: string;
    texteExplicationOK: string;
    reponseCorrecte: boolean;
    articleAssocie: ArticleDuQuiz | null;
    points: string;
    quizId: string;
  }>();

  const noterLeQuiz = note => {
    const evaluerQuizUsecase = new EvaluerQuizUsecase(new QuizRepositoryAxios());
    evaluerQuizUsecase.execute(props.quizId, utilisateurStore().utilisateur.id, note);
  };

  const boutonRetourUrl = computed(() => {
    if (useRoute().params.universId && useRoute().params.thematiqueId) {
      return {
        label: 'Revenir à la thématique',
        url: {
          name: RouteUniversName.THEMATIQUE,
          params: { id: useRoute().params.universId, thematique: useRoute().params.thematiqueId },
        },
      };
    }
    return {
      url: {
        name: RouteCoachName.COACH,
      },
      label: "Revenir à l'accueil",
    };
  });
</script>
