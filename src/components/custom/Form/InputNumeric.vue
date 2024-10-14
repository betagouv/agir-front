<template>
  <label :class="`fr-label ${label.cssModifier}`" :for="id">
    {{ label.wording }}
    <span class="fr-hint-text">Nombre uniquement</span>
  </label>
  <input
    class="fr-input"
    type="text"
    v-model="internalValue"
    :id="id"
    :name="id"
    inputmode="numeric"
    pattern="[0-9]*"
  />
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
