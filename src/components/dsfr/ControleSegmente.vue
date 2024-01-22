<template>
  <fieldset class="fr-segmented fr-segmented--no-legend">
    <legend class="fr-segmented__legend">{{ legende }}</legend>
    <div class="fr-segmented__elements">
      <div v-for="(segment, index) in segments" :key="index" class="fr-segmented__element">
        <input
          :value="segment.value"
          type="radio"
          :id="`${segment.value}-id`"
          :name="name"
          :checked="segment.checked"
        />
        <label class="fr-label" :for="`${segment.value}-id`">{{ segment.libelle }}</label>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  defineProps<{
    legende: string;
    name: string;
    segments: {
      libelle: string;
      value: string;
      checked?: boolean;
    }[];
  }>();
</script>
