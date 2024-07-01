<template>
  <div class="background--white border-radius--md fr-p-1w shadow full-height">
    <div class="fr-grid-row flex-column full-height">
      <img
        :src="carouselServiceViewModel.img"
        alt=""
        class="img-object-fit-cover full-width border-radius--md fr-mb-1v"
      />
      <h3 class="fr-text--md">{{ carouselServiceViewModel.titre }}</h3>
      <div class="fr-mt-auto">
        <span class="fr-tag fr-text--xs fr-mr-2w">{{ carouselServiceViewModel.tag.label }}</span>
        <span class="fr-text--xs text--mention-grey">{{ carouselServiceViewModel.information }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CarouselServiceViewModel } from '@/domaines/serviceRecherche/adapters/serviceRecherche.presenter.impl';

  defineProps<{ carouselServiceViewModel: CarouselServiceViewModel }>();
</script>

<style scoped>
  img {
    height: 8rem;
  }
</style>
