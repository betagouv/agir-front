<template>
  <div class="fr-grid-row flex-column border-radius--md shadow background--white">
    <img class="border-radius--md-top" :src="thematique.urlImage" />
    <div class="fr-px-2w">
      <h3 class="fr-h6 fr-my-1w">{{ thematique.titre }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ThematiqueViewModel } from '@/thematiques/adapters/thematiques.presenter.impl';

  defineProps<{
    thematique: ThematiqueViewModel;
  }>();
</script>

<style scoped>
  .thematique__link {
    background-image: none;
    outline-width: 0;
  }

  .thematique__link::before {
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
