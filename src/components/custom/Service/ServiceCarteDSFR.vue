<template>
  <div
    class="fr-card fr-card--sm fr-enlarge-link fr-card--horizontal fr-card--horizontal-cinquieme"
    :class="styleCarte"
  >
    <div class="fr-card__body full-width">
      <div class="fr-card__content">
        <h3 class="fr-card__title full-width">
          <router-link
            v-if="suggestionsServiceViewModel.to"
            :to="suggestionsServiceViewModel.to"
            class="service-card__link fr-text--lg"
          >
            <span class="ellipsis">
              {{ suggestionsServiceViewModel.titre }}
            </span>
          </router-link>
        </h3>

        <p class="fr-card__desc flex flex-column flex-end">
          <span class="ellipsis fr-mb-1v" v-if="suggestionsServiceViewModel?.categories?.length > 0">
            <span class="fr-sr-only">Catégories:</span>
            <span
              class="text--lh-0 fr-text--sm text--bold"
              v-for="(categorie, index) in suggestionsServiceViewModel.categories"
              :key="categorie"
            >
              {{ categorie }}{{ index < suggestionsServiceViewModel?.categories?.length - 1 ? ', ' : '' }} </span
            ><br />
          </span>

          <span>
            <span class="fr-sr-only">Adresse:</span>
            <span
              class="ellipsis"
              :class="{ 'ellipsis-test--two-lines': !suggestionsServiceViewModel.categories?.length }"
            >
              {{ suggestionsServiceViewModel.description }}
            </span>
          </span>
        </p>

        <div class="fr-card__end fr-mt-0">
          <p class="fr-tag fr-m-0 fr-tag--custom-bleu">{{ suggestionsServiceViewModel.tag?.label }}</p>
        </div>
      </div>
    </div>
    <div class="fr-card__header min-height-img" aria-hidden="true">
      <div class="fr-card__img full-height">
        <span class="full-height full-width flex flex-center align-items--center text--3xl">🛠️</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { SuggestionServiceViewModel } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.presenter.impl';

  defineProps<{
    suggestionsServiceViewModel: SuggestionServiceViewModel;
    styleCarte?: string;
    options?: {
      descriptionDesactive: boolean;
    };
  }>();
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

  .ellipsis {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  .ellipsis-test--two-lines {
    -webkit-line-clamp: 2;
  }

  .fr-tag--custom-bleu {
    background-color: #e2eafb;
    color: #000091;
  }

  .fr-card__header {
    background-color: #eff9f9;
  }

  .min-height-img {
    min-height: 4rem;
  }

  .fr-card--horizontal-cinquieme > .fr-card__header {
    @media (min-width: 48em) {
      flex: 0 0 20%;
      width: 20%;
    }
  }
</style>
