<template>
  <article class="bibliotheque-card background--white border-radius--md shadow">
    <img :src="image" class="bibliotheque-card__image" alt="" />
    <div class="fr-px-3w fr-py-2w">
      <span class="fr-text--xs fr-text--bold fr-m-0">{{ thematique }}</span>
      <h3 class="fr-h4 text--bleu fr-mt-1w fr-mb-2w">{{ titre }}</h3>
      <p class="fr-text--md text--gris-dark fr-mb-2w">{{ description }}</p>
      <!-- url à mettre dans presenter -->
      <router-link :to="`/article/${titre}/${contentId}`" class="fr-link fr-icon-arrow-right-line fr-link--icon-right">
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
    contentId: string;
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
