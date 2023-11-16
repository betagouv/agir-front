<template>
  <h2 class="fr-h2">Qu’est-ce que le coach a pour vous ?</h2>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li v-for="(phrase, index) in phrases" :key="index" class="fr-col-md-6 fr-col-12">
      <p class="fr-grid-row fr-grid-row--middle fr-p-4w background--white border-radius--lg shadow full-height">
        <span class="text--3xl fr-mr-3w">{{ phrase.icon }}</span>
        <span class="fr-text--lg fr-mb-0 fr-col" v-html="phrase.phrase" />
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
