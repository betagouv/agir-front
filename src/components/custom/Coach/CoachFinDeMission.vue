<template>
  <div class="card-fin-mission fr-grid-row fr-grid-row--middle flex-column fr-py-6w border-radius--lg">
    <div class="card-fin-mission--picto text--bleu fr-mb-3w">
      <span class="fr-icon-flag-fill" aria-hidden="true"></span>
      <span class="fr-icon-flag-fill" aria-hidden="true"></span>
      <span class="fr-icon-flag-fill" aria-hidden="true"></span>
    </div>
    <span class="text--bleu text--3xl">{{ titreDeMission }}</span>
    <span class="fr-display--xs fr-mt-1w text--uppercase fr-mb-2w">Accomplie !</span>
    <span class="fr-text--lead fr-text--bold">
      Votre bonus : +{{ nombreDePointsAGagner }} <img src="/ic_score.svg" alt="points" width="24" />
    </span>
    <button
      class="fr-btn fr-btn--lg fr-btn--primary fr-btn--icon-right fr-icon-arrow-right-line"
      @click="recupererPointsTodo"
    >
      Continuer
    </button>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    titreDeMission: string;
    nombreDePointsAGagner: number;
  }>();

  const emit = defineEmits(['recuperer-points-todo']);

  const recupererPointsTodo = () => {
    emit('recuperer-points-todo');
  };
</script>

<style scoped>
  .card-fin-mission {
    background-image: url('/bg_fin-de-mission.jpg');
    background-size: cover;
    background-position: center;
  }

  .card-fin-mission--picto {
    display: flex;
    align-items: end;
  }

  .card-fin-mission--picto span:nth-child(2)::before {
    --icon-size: 3rem;
  }
</style>
