<template>
  <p class="card-fin-mission fr-grid-row fr-grid-row--middle flex-column fr-py-3w fr-px-2w">
    <span class="fr-text--bold text--3xl text--black">Bravo !</span>
    <span class="text--bleu text--3xl text--lh-1-3 text--center"
      >Vous avez accompli la <br />
      {{ titreDeMission }}</span
    >
    <span class="fr-text--lg text--bold">
      Votre bonus : {{ nombreDePointsAGagner }} <img src="/ic_score.svg" alt="points" width="16" />
    </span>
  </p>
  <div class="fr-grid-row fr-grid-row--middle flex-column text--center fr-py-2w">
    <span class="text--uppercase fr-text--xs text--bold text--gris-light fr-mb-0">Section débloquée !</span>
    <span class="fr-text--bold text--3xl text--black text--lh-1-3">{{ titreFeatureDebloquee }}</span>
    <p>{{ descriptionFeatureDebloquee }}</p>
    <button
      class="fr-btn fr-btn--lg fr-btn--primary fr-btn--icon-right fr-icon-arrow-right-line"
      aria-controls="finDesMissions"
      @click="recupererPointsTodo"
    >
      Découvrir
    </button>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    titreDeMission: string;
    nombreDePointsAGagner: number;
    titreFeatureDebloquee: string | undefined;
    descriptionFeatureDebloquee: string | undefined;
  }>();

  const emit = defineEmits(['recuperer-points-todo']);

  const recupererPointsTodo = () => emit('recuperer-points-todo');
</script>

<style scoped>
  .card-fin-mission {
    background-image: url('/bg_fin-de-mission.jpg');
    background-size: cover;
    background-position: center;
    gap: 1rem;
  }
</style>
