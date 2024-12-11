<template>
  <div class="background--white border-radius--md shadow fr-p-1w fr-grid-row full-height">
    <div class="fr-col-9 position--relative fr-pl-1w fr-grid-row flex-column">
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
      <div v-if="suggestionsServiceViewModel.categories" class="fr-grid-row fr-mb-2w">
        <span
          v-for="categorie in suggestionsServiceViewModel.categories"
          :key="categorie"
          class="fr-tag jagis-background--bleu-light jagis--text--bleu-dark text--semi-bold fr-mr-1w"
        >
          {{ categorie }}
        </span>
      </div>
      <p v-if="suggestionsServiceViewModel.description" class="fr-text--sm text--gris">
        {{ suggestionsServiceViewModel.description }}
      </p>
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
</style>
