<template>
  <div class="citation border-radius--md background--gris fr-p-3w">
    <span class="fr-icon-quote-line display-block text--bleu fr-mb-2w" aria-hidden="true"></span>
    <blockquote class="fr-text--xl" v-html="citation" />
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-auto">
        <img :src="image" alt="" width="48px" height="48px" />
      </div>
      <p class="fr-col-auto fr-mb-0">
        <span class="fr-text--bold">{{ autheur }}</span>
        <br />
        {{ activite }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    citation: string;
    image: string;
    autheur: string;
    activite: string;
  }>();
</script>

<style scoped>
  [class*='fr-icon-']::before {
    --icon-size: 4rem;
  }
</style>
