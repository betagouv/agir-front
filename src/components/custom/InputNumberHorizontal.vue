<template>
  <div class="fr-grid-row fr-grid-row--middle fr-mx-0">
    <input
      :class="inputSize()"
      class="fr-input fr-mr-1w"
      pattern="[0-9]*"
      inputmode="numeric"
      type="number"
      :id="name"
      :name="name"
      @input="updateValue"
      :min="minValue"
      :value="defaultValue"
    />
    <label :class="inputSize()" class="fr-label" :for="name">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    label: string;
    name: string;
    minValue: number;
    defaultValue?: number;
    size?: 'sm' | 'md';
  }>();

  const inputSize = () => {
    switch (props.size) {
      case 'sm':
        return 'fr-col';
      case 'md':
        return 'fr-col-6';
      default:
        return 'fr-col';
    }
  };

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', Number(inputElement.value));
  };
</script>

<style scoped>
  input {
    max-width: 8rem;
  }
</style>
