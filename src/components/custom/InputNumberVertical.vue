<template>
  <div>
    <label class="fr-label" :for="name">
      {{ label }}
    </label>
    <div class="input-wrapper-suffixe">
      <input
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
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label: string;
    name: string;
    minValue: number;
    defaultValue?: number;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', Number(inputElement.value));
  };
</script>

<style scoped>
  .input-wrapper-suffixe {
    position: relative;
  }

  .input-wrapper-suffixe::after {
    content: '€';
    position: absolute;
    right: 3rem;
    top: 0.5rem;
  }

  input {
    max-width: 8rem;
  }
</style>
