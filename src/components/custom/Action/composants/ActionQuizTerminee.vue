<template>
  <div class="conteneur-drapeaux fr-my-2w">
    <span aria-hidden="true" class="fr-icon-flag-fill text--bleu" />
    <span aria-hidden="true" class="fr-icon-flag-fill text--bleu big" />
    <span aria-hidden="true" class="fr-icon-flag-fill text--bleu" />
  </div>

  <h2 class="fr-mt-2w text--center">
    <span class="text--bold">Bravo !</span><br />
    <span class="text--bleu fr-text--lead text--normal">
      Vous avez terminé le quiz <br />"<span class="fr-text--bold" v-html="titre" />" !
    </span>
  </h2>

  <template v-if="scoreViewModel">
    <p
      :style="{
        '--couleur-background': scoreViewModel.scoreConfig.couleurBackground,
        '--couleur-border': scoreViewModel.scoreConfig.couleurBordure,
      }"
      class="bravo-score fr-mb-2w"
    >
      <span aria-hidden="true" class="fr-pr-1v">{{ scoreViewModel.scoreConfig.emoji }}</span>
      Vous avez obtenu un score de <span class="text--bold">{{ scoreViewModel.score }}</span>
    </p>
    <p class="bravo-encouragement">{{ felicitations ?? scoreViewModel.encouragement }}</p>

    <div class="flex flex-center align-items--center gap--small">
      <BoutonRetourAutomatique custom-class="fr-btn display-block fr-my-0" />

      <button class="fr-btn fr-btn--secondary" @click="recommencerQuiz">Recommencer le quiz</button>
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import BoutonRetourAutomatique from '@/components/custom/BoutonRetourAutomatique.vue';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { TerminerActionUsecase } from '@/domaines/actions/terminerAction.usecase';
  import { QuizRepositoryAxios } from '@/domaines/quiz/adapters/quiz.repository.axios';
  import { ScoreActionQuizPresenterImpl } from '@/domaines/quiz/adapters/scoreActionQuiz.presenter.impl';
  import { FinActionQuizUsecase } from '@/domaines/quiz/finActionQuizz.usecase';
  import { ScoreActionQuizViewModel } from '@/domaines/quiz/ports/scoreActionQuiz.presenter';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    titre: string;
    felicitations?: string;
  }>();
  const route = useRoute();

  const scoreViewModel = ref<ScoreActionQuizViewModel>();
  const terminerActionQuiz = new FinActionQuizUsecase(
    new QuizRepositoryAxios(),
    new TerminerActionUsecase(new ActionsRepositoryAxios(), ActionsEventBus.getInstance()),
  );

  onMounted(async () => {
    await terminerActionQuiz.execute(
      utilisateurStore().utilisateur.id,
      route.params.id.toString(),
      new ScoreActionQuizPresenterImpl(vm => (scoreViewModel.value = vm)),
    );
  });

  function recommencerQuiz() {
    window.location.reload();
  }
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
