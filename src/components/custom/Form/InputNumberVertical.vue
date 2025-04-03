<template>
  <div>
    <label class="fr-label" :for="name">
      {{ label }}
    </label>
    <div class="fr-input-wrap">
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
  input {
    max-width: 8rem;
  }
</style>
