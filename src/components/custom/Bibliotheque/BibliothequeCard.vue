<template>
  <article class="bibliotheque-card background--white border-radius--md shadow">
    <img :src="image" class="bibliotheque-card__image" alt="" />
    <div class="fr-px-3w fr-py-2w">
      <div class="fr-grid-row flex-space-between">
        <span class="fr-text--xs fr-text--bold fr-m-0">{{ thematique }}</span>
        <div v-if="favoris">
          <span class="fr-text--xs fr-text--bold fr-m-0">Favoris</span>
          <span
            class="fr-icon-heart-fill fr-text-label--red-marianne fr-text--xs fr-text--bold fr-ml-2v fr-m-0"
            aria-hidden="true"
          ></span>
        </div>
      </div>
      <h3 class="fr-h4 text--bleu fr-mt-1w fr-mb-2w">{{ titre }}</h3>
      <p class="fr-text--md text--gris-dark fr-mb-2w">{{ description }}</p>
      <router-link :to="url" class="fr-link fr-icon-arrow-right-line fr-link--icon-right" :title="titre">
        Continuer la lecture
      </router-link>
    </div>
  </article>
</template>

<script setup lang="ts">
  defineProps<{
    image: string;
    thematique: string;
    titre: string;
    description: string;
    url: string;
    favoris: boolean;
  }>();
</script>

<style scoped>
  .bibliotheque-card {
    overflow: hidden;
  }

  .bibliotheque-card__image {
    height: 8rem;
    display: block;
    object-fit: cover;
    width: 100%;
  }
</style>
