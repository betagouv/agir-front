<template>
  <div class="background--white border-radius--md shadow fr-p-1w fr-grid-row full-height">
    <div class="fr-col-3 border-radius--md background-image position--relative">
      <span
        v-if="suggestionsServiceViewModel.nombreMiseEnFavoris > 0"
        class="tag--favoris background--white border-radius--md fr-p-1v fr-text--sm fr-text--bold"
      >
        {{ suggestionsServiceViewModel.nombreMiseEnFavoris }}
        <span class="fr-icon-heart-fill fr-icon--sm" aria-hidden="true"></span>
      </span>
    </div>
    <div class="fr-col-9 fr-pl-1w fr-grid-row flex-column">
      <h3 class="fr-text--md fr-m-0">{{ suggestionsServiceViewModel.titre }}</h3>
      <p class="fr-text--sm text--gris">{{ suggestionsServiceViewModel.description }}</p>
      <div class="fr-mt-auto">
        <span
          v-if="suggestionsServiceViewModel.tag"
          :class="`fr-tag fr-text--xs fr-mr-2w ${suggestionsServiceViewModel.tag.style}`"
        >
          {{ suggestionsServiceViewModel.tag.label }}
        </span>
        <span class="fr-text--xs text--mention-grey">{{ suggestionsServiceViewModel.information }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    suggestionsServiceViewModel: {
      titre: string;
      img: string;
      description?: string;
      information?: string;
      nombreMiseEnFavoris: number;
      tag?: {
        label: string;
        style: string;
      };
    };
  }>();
  const backgroundImageUrl = `url(${props.suggestionsServiceViewModel.img})`;
</script>

<style scoped>
  .background-image {
    --backgroundImageUrl: v-bind(backgroundImageUrl);
    background-image: var(--backgroundImageUrl);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .tag--favoris {
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
  }

  .tag--favoris span {
    color: var(--red-marianne-main-472);
  }
</style>
