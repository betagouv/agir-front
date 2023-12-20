<template>
  <div class="modalePassageDeNiveau text--center">
    <div class="modalePassageDeNiveau--picto fr-mb-1w">
      <span class="fr-icon-star-fill" aria-hidden="true"></span>
      <span class="fr-icon-star-fill" aria-hidden="true"></span>
      <span class="fr-icon-star-fill" aria-hidden="true"></span>
    </div>
    <h1>Bien joué !</h1>
    <h2>Vous passez au niveau suivant !</h2>
    <p>
      <span>Niveau</span>
      <span>{{ niveau }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ niveau: number }>();
</script>

<style scoped>
  .modalePassageDeNiveau {
    margin: 0 -2rem;
  }

  .modalePassageDeNiveau--picto {
    display: flex;
    justify-content: center;
    align-items: end;
    color: #ed8e00;
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
