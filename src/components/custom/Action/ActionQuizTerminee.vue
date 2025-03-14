<template>
  <div class="conteneur-drapeaux fr-my-2w">
    <span class="fr-icon-flag-fill text--bleu" aria-hidden="true" />
    <span class="fr-icon-flag-fill text--bleu big" aria-hidden="true" />
    <span class="fr-icon-flag-fill text--bleu" aria-hidden="true" />
  </div>

  <h2 class="fr-mt-2w text--center">
    <span class="text--bold">Bravo !</span><br />
    <span class="text--bleu fr-text--lead text--normal">
      Vous avez terminé le quiz <br />"<span class="fr-text--bold" v-html="titre" />" !
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

    <div class="flex flex-center align-items--center gap--small">
      <router-link :to="{ path: dernierePageStore.path }" class="fr-btn display-block fr-my-0">
        Revenir {{ labelBouton }}
      </router-link>

      <button class="fr-btn fr-btn--secondary" @click="recommencerQuiz">Recommencer le quiz</button>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quiz.repository.axios';
  import { ScoreActionQuizPresenterImpl } from '@/domaines/quiz/adapters/scoreActionQuiz.presenter.impl';
  import { ScoreActionQuizViewModel } from '@/domaines/quiz/ports/scoreActionQuiz.presenter';
  import { RecupererScoreActionQuizUsecase } from '@/domaines/quiz/recupererScoreActionQuiz.usecase';
  import { RouteActionsName } from '@/router/actions/routes';
  import { RouteThematiquesName } from '@/router/thematiques/routes';
  import { useNavigationStore } from '@/store/navigationStore';
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

  function recommencerQuiz() {
    window.location.reload();
  }

  const dernierePageStore = useNavigationStore().pagePrecedente;
  const labelBouton =
    dernierePageStore.name === RouteActionsName.CATALOGUE_ACTION
      ? 'au catalogue'
      : dernierePageStore.name === RouteThematiquesName.THEMATIQUE_V2
        ? 'à la thématique'
        : "à l'accueil";
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
  }

  .bravo-encouragement {
    background-color: rgba(0, 0, 145, 0.03);
    border: 1px solid rgba(229, 229, 248, 1);
    padding: 1rem;
  }
</style>
