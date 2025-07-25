<template>
  <div class="fr-card fr-card--sm fr-enlarge-link fr-card--horizontal fr-card--horizontal-cinquieme">
    <div class="fr-card__body full-width">
      <div class="fr-card__content">
        <h3 class="fr-card__title full-width">
          <router-link
            v-if="suggestionsServiceViewModel.to"
            :to="suggestionsServiceViewModel.to"
            class="service-card__link fr-text--lg"
          >
            <span class="ellipsis" v-text="suggestionsServiceViewModel.titre" />
          </router-link>
        </h3>

        <p class="fr-card__desc flex flex-column flex-end">
          <span
            class="ellipsis fr-mb-1v"
            v-if="suggestionsServiceViewModel.categories && suggestionsServiceViewModel.categories?.length > 0"
          >
            <span class="fr-sr-only">Vous pourrez:</span>
            <span class="text--lh-0 fr-text--sm text--bold" v-text="suggestionsServiceViewModel.categories" /><br />
          </span>

          <span>
            <span class="fr-sr-only">Adresse:</span>
            <span
              class="ellipsis"
              :class="{ 'ellipsis-test--two-lines': !suggestionsServiceViewModel.categories?.length }"
              v-text="suggestionsServiceViewModel.description"
            />
          </span>
        </p>

        <div class="fr-card__end fr-mt-0">
          <p
            class="fr-tag fr-m-0"
            :class="suggestionsServiceViewModel.tag?.style"
            v-text="suggestionsServiceViewModel.tag?.label"
          />
        </div>
      </div>
    </div>
    <div class="fr-card__header min-height-img" aria-hidden="true">
      <div class="fr-card__img full-height">
        <span
          class="full-height full-width flex flex-center align-items--center text--3xl"
          v-text="suggestionsServiceViewModel?.headerAlternatif?.emoji"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { SuggestionServiceViewModel } from '@/domaines/serviceRecherche/suggestionServiceViewModel';

  defineProps<{
    suggestionsServiceViewModel: SuggestionServiceViewModel;
  }>();
</script>

<style scoped>
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

  .min-height-img {
    min-height: 4rem;
  }

  .fr-card--horizontal-cinquieme > .fr-card__header {
    @media (min-width: 48em) {
      flex: 0 0 20%;
      width: 20%;
    }
  }

  .fr-card__header {
    background-color: v-bind(suggestionsServiceViewModel.headerAlternatif.backgroundColor);
  }
</style>
