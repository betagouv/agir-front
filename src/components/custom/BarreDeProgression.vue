<template>
  <div
    class="jauge-background full-width overflow--hidden"
    :aria-label="label"
    role="progressbar"
    :aria-valuenow="value"
    aria-valuemin="0"
    :aria-valuemax="valueMax"
  >
    <div class="jauge-remplissage full-height" aria-hidden="true" :style="{ width: `${valeurToWidth()}%` }" />
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      label: string;
      value: number;
      valueMax: number;
      couleur: string;
      minWidth?: string;
    }>(),
    { minWidth: '8%' },
  );

  const valeurToWidth = () => {
    return (props.value / props.valueMax) * 100;
  };
</script>

<style scoped>
  .jauge-background {
    --jauge-color: v-bind(props.couleur);

    background-color: #dddddd;
    height: 0.75rem;
    border-radius: 10px;
  }

  .jauge-remplissage {
    position: static;
    background-color: var(--jauge-color);
    border-radius: 10px;
    border: 2px solid #fff;
    min-width: v-bind(props.minWidth);
  }
</style>
