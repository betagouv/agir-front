<template>
  <div class="background--white border-radius--md shadow fr-p-1w fr-grid-row full-height">
    <div class="fr-col-md-2 border-radius--md background-image position--relative">
      <span
        v-if="suggestionsServiceViewModel.nombreMiseEnFavoris > 0"
        class="tag--favoris background--white border-radius--md fr-p-1v fr-text--sm fr-text--bold"
      >
        {{ suggestionsServiceViewModel.nombreMiseEnFavoris }}
        <span aria-hidden="true" class="fr-icon-heart-fill fr-icon--sm"></span>
      </span>
    </div>

    <div class="fr-col-9 position--relative fr-pl-2w fr-grid-row flex-column">
      <p class="fr-text--lg text--semi-bold text--black fr-mb-0">
        <router-link
          v-if="suggestionsServiceViewModel.to"
          :to="suggestionsServiceViewModel.to"
          class="service-card__link"
        >
          {{ suggestionsServiceViewModel.titre }}
        </router-link>
        <span v-else> {{ suggestionsServiceViewModel.titre }} </span>
      </p>

      <p v-if="suggestionsServiceViewModel.description" class="fr-text--sm text--gris fr-mb-2w">
        {{ suggestionsServiceViewModel.description }}
      </p>

      <div class="fr-mt-auto">
        <span
          v-if="suggestionsServiceViewModel.tag"
          :class="`fr-tag fr-text--xs fr-mr-2w ${suggestionsServiceViewModel.tag.style}`"
        >
          {{ suggestionsServiceViewModel.tag.label }}
        </span>
        <span class="fr-text--xs text--mention-grey" v-html="suggestionsServiceViewModel.information" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { SuggestionServiceViewModel } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.presenter.impl';

  const props = defineProps<{
    suggestionsServiceViewModel: SuggestionServiceViewModel;
  }>();

  const backgroundImageUrl = `url(${props.suggestionsServiceViewModel.img})`;
</script>

<style scoped>
  .service-card__link {
    background-image: none;
    outline-width: 0;
  }

  .service-card__link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    outline-color: inherit;
    outline-offset: 2px;
    outline-style: inherit;
    border-radius: 0.5rem;
  }

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

  .service-card__link {
    background-image: none;
    outline-width: 0;
  }
</style>
