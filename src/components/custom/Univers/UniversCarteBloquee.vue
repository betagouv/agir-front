<template lang="">
  <div class="fr-p-1w fr-pb-3w border-radius--md shadow background--white">
    <div class="univers-carte__image">
      <img
        class="full-width img-object-fit-cover border-radius--xs"
        height="150"
        :src="universViewModel.urlImage"
        alt=""
      />
      <span
        class="fr-icon-lock-fill text--bleu background--white border-radius--full fr-p-1w"
        aria-hidden="true"
      ></span>
    </div>
    <p class="fr-text--lg text--semi-bold text--black fr-mb-0">
      {{ universViewModel.nom }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { UniversViewModel } from '@/domaines/univers/adapters/listeUnivers.presenter.impl';

  defineProps<{ universViewModel: UniversViewModel }>();
</script>

<style scoped>
  .univers-carte__image {
    position: relative;
  }

  .univers-carte__image img {
    filter: grayscale(100%);
  }

  .univers-carte__image span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
