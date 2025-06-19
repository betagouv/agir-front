<template>
  <span class="cercle-progression">
    <svg viewBox="0 0 100 100" class="cercle" aria-hidden="true">
      <circle cx="50" cy="50" r="45" class="background" />

      <circle cx="50" cy="50" r="45" class="progression" :style="progressionStyle" />
    </svg>
    <span class="pourcentage fr-text--sm fr-mb-0">
      {{ pourcentage }}<span class="pourcent">%</span><span class="fr-sr-only">de complétion pour</span>
    </span>
  </span>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    pourcentage: number;
  }>();

  const progressionStyle = computed(() => {
    const circonference = 2 * Math.PI * 45;
    const minPourcentage = Math.max(props.pourcentage, 3);
    const offset = circonference * (1 - minPourcentage / 100);
    return {
      strokeDasharray: `${circonference}`,
      strokeDashoffset: `${offset}`,
    };
  });
</script>

<style scoped>
  .cercle-progression {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cercle {
    transform: rotate(-90deg);
  }

  .background {
    fill: none;
    stroke: #d1c9b4;
    stroke-width: 5;
  }

  .progression {
    fill: none;
    stroke: #9c8653;
    stroke-width: 5;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.6s ease-in-out;
  }

  .pourcentage {
    position: absolute;
    font-weight: bold;
  }

  .pourcent {
    font-size: 1rem;
  }
</style>
