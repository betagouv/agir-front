<template>
  <div class="card-recommandation-highlight shadow fr-mb-3w background--white fr-p-3w">
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-4">
        <div
          class="card-recommandation-highlight__image"
          :style="`background-image: url('${image}')`"
          aria-hidden="true"
        ></div>
      </div>
      <div class="fr-col-8">
        <span class="fr-text--bold">L'article à lire !</span>
        <h3 class="fr-h4 text--gris-dark">{{ titre }}</h3>
        <p>{{ description }}</p>
        <a :href="url" class="fr-link fr-icon-arrow-right-line fr-link--icon-right"> Continuer la lecture </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    titre: string;
    description: string;
    image: string;
    url: string;
  }>();
</script>

<style scoped>
  .card-recommandation-highlight {
    border-radius: 8px;
    background: #fff;
  }

  .card-recommandation-highlight__image {
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 8px;
  }
</style>
