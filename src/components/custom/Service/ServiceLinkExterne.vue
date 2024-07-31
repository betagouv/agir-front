<template>
  <a
    class="serviceLinkExterne flex-space-between fr-grid-row flex-column position--relative full-height background--none text--bleu background--bleu-info border--bleu fr-p-2w border-radius--md"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
  >
    <h3 class="fr-h6 fr-text--bold fr-mb-1v">{{ titre }}</h3>
    <span class="fr-mb-0 fr-pr-3w">{{ sousTitre }}</span>
  </a>
</template>

<script setup lang="ts">
  defineProps<{ url: string; titre: string; sousTitre: string }>();
</script>

<style scoped>
  .serviceLinkExterne::after {
    --icon-size: 1.5rem;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
</style>
