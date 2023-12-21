<template>
  <div class="modalePassageDeNiveau text--center fr-p-3w">
    <div class="modalePassageDeNiveau--picto text--orange fr-mb-1w">
      <span class="fr-icon-star-fill" aria-hidden="true"></span>
      <span class="fr-icon-star-fill" aria-hidden="true"></span>
      <span class="fr-icon-star-fill" aria-hidden="true"></span>
    </div>
    <h1 :id="modaleId" class="fr-h2 fr-modal__title text--uppercase fr-mb-1w">Bien joué !</h1>
    <h2 class="fr-text--lead text--orange text--normal fr-mb-1w">Vous passez au niveau suivant !</h2>
    <p class="fr-grid-row flex-column text--uppercase text--bold text--gris-light">
      <span>Niveau</span>
      <span class="fr-h2 fr-mb-0">{{ niveau }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ modaleId: string; niveau: number }>();
</script>

<style scoped>
  .modalePassageDeNiveau {
    margin: 0 -2rem;
  }

  .modalePassageDeNiveau--picto {
    display: flex;
    justify-content: center;
    align-items: end;
  }

  .modalePassageDeNiveau--picto span:nth-child(2)::before {
    --icon-size: 3rem;
  }

  .modalePassageDeNiveau {
    background-image: url('/bg_passage-de-niveau.png');
    background-size: cover;
    background-position: center;
    background-color: rgba(255, 153, 0, 0.1);
  }
</style>
