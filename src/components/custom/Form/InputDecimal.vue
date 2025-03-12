<template>
  <label :class="`fr-label ${label.cssModifier}`" :for="id">
    {{ label.wording }}
    <span class="fr-hint-text">Nombre uniquement (décimales autorisées)</span>
  </label>
  <input class="fr-input" type="number" v-model="internalValue" :id="id" :name="id" inputmode="decimal" step="0.01" />
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  const props = defineProps<{
    id: string;
    label: { wording: string; cssModifier?: string };
    defaultValue?: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const internalValue = ref(props.defaultValue || '');

  watch(internalValue, newValue => {
    emit('update:modelValue', newValue);
  });
</script>
