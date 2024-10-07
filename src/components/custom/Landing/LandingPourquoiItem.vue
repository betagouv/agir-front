<template>
  <div class="border--beige fr-p-1v fr-mr-2w border-radius--l">
    <span :class="`${picto} fr-p-1w background--white display-block border-radius--l text--beige`" aria-hidden="true" />
  </div>
  <div class="fr-col">
    <h3 class="fr-h6 fr-mb-0">{{ titre }}</h3>
    <p class="">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ picto: string; titre: string; description: string }>();
</script>

<style scoped>
  [class*='fr-icon-']::before {
    --icon-size: 1.25rem;
  }
</style>
