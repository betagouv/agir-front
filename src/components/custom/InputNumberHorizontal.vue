<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-mx-0">
    <input
      class="fr-input fr-col-1"
      pattern="[0-9]*"
      inputmode="numeric"
      type="number"
      :id="name"
      :name="name"
      :value="value"
      min="0"
    />
    <label class="fr-label fr-col-11" :for="name">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label: string;
    name: string;
    value: string;
  }>();
</script>
