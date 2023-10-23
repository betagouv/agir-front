<template>
  <h2 class="fr-h2">Qu’est-ce que le coach a pour vous ?</h2>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li v-for="(phrase, index) in phrases" :key="index" class="fr-col-md-6 fr-col-12">
      <p class="phrase background--white border-radius--lg fr-p-4w shadow">
        <span class="text--3xl">{{ phrase.icon }}</span>
        <span class="fr-text--xl fr-mb-0">{{ phrase.phrase }}</span>
      </p>
    </li>
  </ul>
</template>

<script setup lang="ts">
  defineProps<{
    phrases: {
      icon: string;
      phrase: string;
    }[];
  }>();
</script>

<style>
  .phrase {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    height: 100%;
  }
</style>
