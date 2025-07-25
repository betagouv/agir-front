<template>
  <div class="fr-card fr-card--sm fr-enlarge-link" :class="styleCarte">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h3 class="fr-card__title">
          <router-link
            v-if="suggestionsServiceViewModel.to"
            :to="suggestionsServiceViewModel.to"
            class="service-card__link"
          >
            {{ suggestionsServiceViewModel.titre }}
          </router-link>
        </h3>
        <p class="fr-card__desc" v-if="!options?.descriptionDesactive">{{ suggestionsServiceViewModel.description }}</p>
        <div class="fr-card__end">
          <ul
            class="fr-tags-group"
            v-if="
              suggestionsServiceViewModel.tag ||
              (suggestionsServiceViewModel.categories && suggestionsServiceViewModel.categories?.length > 0)
            "
          >
            <li class="text--lh-0" v-if="suggestionsServiceViewModel.tag">
              <p class="fr-tag fr-m-0">{{ suggestionsServiceViewModel.tag.label }}</p>
            </li>
            <li class="text--lh-0" v-for="categorie in suggestionsServiceViewModel.categories" :key="categorie">
              <p class="fr-tag fr-m-0">{{ categorie }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fr-card__header">
      <div class="fr-card__img">
        <img class="fr-responsive-img" :src="imageSrc" @error="gererImageEnErreur" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  import { SuggestionServiceViewModel } from '@/domaines/serviceRecherche/suggestionServiceViewModel';

  const props = defineProps<{
    suggestionsServiceViewModel: SuggestionServiceViewModel;
    styleCarte?: string;
    options?: {
      descriptionDesactive: boolean;
    };
  }>();

  const imageSrc = ref<string>(props.suggestionsServiceViewModel?.img ?? '/ic_services.svg');

  function gererImageEnErreur() {
    imageSrc.value = '/ic_services.svg';
  }
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

  .fr-responsive-img {
    max-width: 100%;
  }
</style>
