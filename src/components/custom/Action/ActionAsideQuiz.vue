<template>
  <template v-if="!actionBaseViewModel.realisee">
    <div class="flex flex-space-between align-items--center">
      <div>
        <h2 class="fr-h4">On se lance le défi ?</h2>
        <p class="fr-mb-0">Terminez votre quiz et gagnez</p>
      </div>

      <div class="border-radius--md fr-p-1w background--vert-points">
        <span class="flex align-items--center text--bold" aria-label="50 points">
          <img src="/ic_score.svg" alt="points" class="full-width full-height fr-mr-1v" /> 50
        </span>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="flex flex-space-between align-items--center">
      <div>
        <h3 class="fr-h4">Bravo ! 🎉</h3>
        <p class="fr-mb-0">Vous avez réalisé votre quizz</p>
      </div>

      <div class="border-radius--md background--vert-points grayscaled fr-p-1w">
        <span class="flex align-items--center text--bold" aria-label="Vous avez déjà obtenu 50 points">
          <img src="/ic_score.svg" alt="points" class="full-width full-height fr-mr-1v" /> 50
        </span>
      </div>
    </div>
  </template>

  <hr />

  <p>{{ actionBaseViewModel.nombreDeRealisations }} actions réalisées par la communauté</p>
</template>

<script lang="ts" setup>
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();
</script>

<style scoped>
  .background--vert-points {
    background: #f1f6ec;
  }

  .grayscaled {
    filter: grayscale(1);
  }
</style>
