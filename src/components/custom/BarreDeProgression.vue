<template>
  <div
    class="jauge-background"
    :aria-label="label"
    role="progressbar"
    :aria-valuenow="value"
    aria-valuemin="0"
    :aria-valuemax="valueMax"
  >
    <div class="jauge-remplissage" aria-hidden="true" :style="{ width: `${valeurToWidth()}%` }" />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    label: string;
    value: number;
    valueMax: number;
    couleur: string;
    minWidth: string;
  }>();

  const valeurToWidth = () => {
    return (props.value / props.valueMax) * 100;
  };
</script>

<style scoped>
  .jauge-background {
    --jauge-color: v-bind(props.couleur);

    background-color: #dddddd;
    width: 100%;
    height: 0.75rem;
    border-radius: 10px;
    overflow: hidden;
  }

  .jauge-remplissage {
    position: static;
    background-color: var(--jauge-color);
    height: 100%;
    border-radius: 10px;
    border: 2px solid #fff;
    min-width: v-bind(props.minWidth);
  }
</style>
