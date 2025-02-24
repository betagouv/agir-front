<template>
  <div class="conteneur-drapeaux fr-my-2w">
    <span class="fr-icon-flag-fill text--bleu" aria-hidden="true" />
    <span class="fr-icon-flag-fill text--bleu big" aria-hidden="true" />
    <span class="fr-icon-flag-fill text--bleu" aria-hidden="true" />
  </div>

  <h2 class="fr-mt-2w text--center">
    <span class="text--bold">Bravo !</span><br />
    <span class="text--bleu fr-text--lead text--normal">
      Vous avez terminé le quiz "<span class="fr-text--bold" v-html="titre" />" !
    </span>
  </h2>

  <template v-if="scoreViewModel">
    <p
      class="bravo-score fr-mb-2w"
      :style="{
        '--couleur-background': scoreViewModel.scoreConfig.couleurBackground,
        '--couleur-border': scoreViewModel.scoreConfig.couleurBordure,
      }"
    >
      <span aria-hidden="true" class="fr-pr-1v">{{ scoreViewModel.scoreConfig.emoji }}</span>
      Vous avez obtenu un score de <span class="text--bold">{{ scoreViewModel.score }}</span>
    </p>
    <p class="bravo-encouragement">{{ felicitations ?? scoreViewModel.encouragement }}</p>

    <router-link :to="{ name: RouteActionsName.CATALOGUE_ACTION }" class="fr-btn display-block fr-my-0 fr-mx-auto"
      >Revenir au catalogue</router-link
    >
  </template>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quizRepository.axios';
  import { ScoreActionQuizPresenterImpl } from '@/domaines/quiz/adapters/scoreActionQuiz.presenter.impl';
  import { ScoreActionQuizViewModel } from '@/domaines/quiz/ports/scoreActionQuiz.presenter';
  import { RecupererScoreActionQuizUsecase } from '@/domaines/quiz/recupererScoreActionQuiz.usecase';
  import { RouteActionsName } from '@/router/actions/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    titre: string;
    felicitations?: string;
  }>();
  const route = useRoute();

  const scoreViewModel = ref<ScoreActionQuizViewModel>();
  const recupererScoreActionQuiz = new RecupererScoreActionQuizUsecase(new QuizRepositoryAxios());

  onMounted(async () => {
    await recupererScoreActionQuiz.execute(
      utilisateurStore().utilisateur.id,
      route.params.id.toString(),
      new ScoreActionQuizPresenterImpl(vm => (scoreViewModel.value = vm)),
    );
  });
</script>

<style scoped>
  .conteneur-drapeaux {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .fr-icon-flag-fill::before {
    --icon-size: 1.5rem;
  }

  .big::before {
    --icon-size: 3.5rem;
  }

  .bravo-score {
    background-color: var(--couleur-background);
    border: 1px solid var(--couleur-border);
    padding: 1rem;
    border-radius: 8px;
  }

  .bravo-encouragement {
    background-color: rgba(0, 0, 145, 0.03);
    border: 1px solid rgba(229, 229, 248, 1);
    border-radius: 8px;
    padding: 1rem;
  }
</style>
