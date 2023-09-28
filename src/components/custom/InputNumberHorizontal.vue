<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-mx-0">
    <input
      class="fr-input fr-col-1"
      pattern="[0-9]*"
      inputmode="numeric"
      type="number"
      :id="name"
      :name="name"
      @input="updateValue"
      min="0"
      :value="defaultValue"
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
    defaultValue?: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', inputElement.value);
  };
</script>
