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
          @change="emitChange(segment.value)"
        />
        <label class="fr-label" :for="`${segment.value}-id`">{{ segment.libelle }}</label>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/segmented/segmented.min.css';

  defineProps<{
    legende: string;
    name: string;
    segments: {
      libelle: string;
      value: string;
      checked?: boolean;
    }[];
  }>();

  const emit = defineEmits(['update:value']);

  const emitChange = (value: string) => {
    emit('update:value', value);
  };
</script>
