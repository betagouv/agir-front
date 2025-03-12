<template>
  <div class="flex flex-space-between align-items--center">
    <div>
      <h2 class="fr-h4 fr-mb-1w">{{ titre }}</h2>
      <p class="fr-mb-0">{{ sousTitre }}</p>
    </div>

    <div class="border-radius--md fr-p-1w background--vert-points">
      <span class="flex align-items--center text--bold" :aria-label="`${points} points`">
        <img src="/ic_score.svg" alt="points" class="full-width full-height fr-mr-1v" /> {{ points }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      points: number;
      titre?: string;
      sousTitre?: string;
    }>(),
    {
      titre: 'On se lance le défi ?',
      sousTitre: 'Terminez votre quiz et gagnez',
    },
  );
</script>

<style scoped>
  .background--vert-points {
    background: #f1f6ec;
  }
</style>
