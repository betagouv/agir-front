<template>
  <div class="background--white shadow fr-p-2w border-radius--md">
    <div class="fr-grid-row align-items--center fr-mb-3v">
      <span class="fr-text--bold text--4xl fr-col-auto fr-mr-1w impactTonne">{{ impactTonneAnnuel }}</span>
      <span class="fr-col-auto text--lh-1-3">
        <span class="fr-text--bold">tonnes</span><br />
        de CO<sub>₂</sub>e par an
      </span>
    </div>
    <div class="progress-bar-container overflow--hidden fr-mb-3v">
      <div class="progress-bar-content" :style="progressBarStyle" />
    </div>
    <p class="fr-mb-0 text--lh-1-3">
      A titre de comparaison, la moyenne française est de <span class="fr-text--bold">9,4 tonnes</span> en&nbsp;2023
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{ impactTonneAnnuel: string; pourcentageProgressBar: number }>();

  const progressBarStyle = computed(() => {
    const percentage = 100 - props.pourcentageProgressBar;
    return {
      'clip-path': `inset(0 ${percentage}% 0 0 round 0 25px 25px 0)`,
    };
  });
</script>

<style scoped>
  .impactTonne {
    color: #df1451;
  }

  .progress-bar-container {
    --progess-bar-height: 1rem;
    --gradient-progress-faible: #a6dd00;
    --gradient-progress-moyen: #ff9d00;
    --gradient-progress-fort: #ff6200;
    --gradient-progress-tres-fort: #df1451;

    background-color: #c2c2c280;
    border-radius: var(--progess-bar-height);
    overflow: hidden;
  }

  .progress-bar-content {
    height: var(--progess-bar-height);
    background: linear-gradient(
      to right,
      var(--gradient-progress-faible) 25%,
      var(--gradient-progress-moyen) 50%,
      var(--gradient-progress-tres-fort) 75%,
      var(--gradient-progress-tres-fort)
    );
    clip-path: inset(0 20% 0 0 round 0 25px 25px 0);
  }
</style>
