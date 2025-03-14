<template>
  <div class="flex flex-space-between align-items--center">
    <div>
      <h2 class="fr-h4 fr-mb-1w" v-text="titre" />
      <p class="fr-mb-0" v-text="sousTitre" />
    </div>

    <div class="border-radius--md background--vert-points grayscaled fr-p-1w">
      <span class="flex align-items--center text--bold" :aria-label="`Vous avez déjà obtenu ${points} points`">
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
      titre: 'Bravo ! 🎉',
      sousTitre: 'Vous avez réalisé cette action',
    },
  );
</script>

<style scoped>
  .background--vert-points {
    background: #f1f6ec;
  }

  .grayscaled {
    filter: grayscale(1);
  }
</style>
