<template>
  <div class="background--white border-radius--md shadow fr-p-1w fr-grid-row full-height">
    <div class="position--relative fr-p-1w fr-grid-row flex-column">
      <img class="service-card__img border-radius--md fr-mb-1w" :src="suggestionsServiceViewModel.img" alt="" />

      <p class="fr-text--lg text--semi-bold text--black fr-mb-1w">
        <router-link
          v-if="suggestionsServiceViewModel.to"
          :to="suggestionsServiceViewModel.to"
          class="service-card__link"
        >
          {{ suggestionsServiceViewModel.titre }}
        </router-link>
        <span v-else> {{ suggestionsServiceViewModel.titre }} </span>
      </p>

      <div class="flex align-items--center fr-text--xs text--mention-grey fr-mb-0">
        <span
          v-if="suggestionsServiceViewModel.tag"
          :class="`fr-tag fr-text--xs fr-mr-2w ${suggestionsServiceViewModel.tag.style}`"
        >
          {{ suggestionsServiceViewModel.tag.label }}
        </span>
        <div>
          <span class="fr-icon--sm fr-icon-timer-line" aria-hidden="true"></span>
          <span class="fr-ml-1v" v-html="suggestionsServiceViewModel.information"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { SuggestionServiceViewModel } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.presenter.impl';

  defineProps<{
    suggestionsServiceViewModel: SuggestionServiceViewModel;
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

  .service-card__img {
    height: 7rem;
  }
</style>
