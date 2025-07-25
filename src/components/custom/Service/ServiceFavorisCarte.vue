<template>
  <div class="background--white border-radius--md fr-p-1w shadow full-height">
    <div class="fr-grid-row flex-column full-height">
      <div class="position--relative">
        <img
          :src="servicesRechercheFavoris.img"
          alt=""
          class="img-object-fit-cover full-width border-radius--md fr-mb-1v"
        />
        <span class="tag--favoris background--white border-radius--md fr-p-1v fr-text--sm fr-text--bold">
          {{ servicesRechercheFavoris.nombreMiseEnFavoris }}
          <span class="fr-icon-heart-fill fr-icon--sm" aria-hidden="true"></span>
        </span>
      </div>
      <h3 class="fr-text--md">{{ servicesRechercheFavoris.titre }}</h3>
      <div class="fr-mt-auto">
        <span
          v-if="servicesRechercheFavoris.tag"
          :class="`fr-tag fr-text--xs fr-mr-2w ${servicesRechercheFavoris.tag.style}`"
        >
          {{ servicesRechercheFavoris.tag.label }}
        </span>
        <span class="fr-text--xs text--mention-grey">{{ servicesRechercheFavoris.information }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { SuggestionServiceViewModel } from '@/domaines/serviceRecherche/suggestionServiceViewModel';

  defineProps<{
    servicesRechercheFavoris: SuggestionServiceViewModel;
  }>();
</script>

<style scoped>
  img {
    height: 8rem;
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
