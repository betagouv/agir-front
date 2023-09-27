<template>
  <div class="fr-input-group">
    <label class="fr-label" :for="name">
      {{ label }}
    </label>
    <input class="fr-input" type="text" :id="name" :name="name" :value="modelValue" @input="updateValue">
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    name: string,
    label: string,
    modelValue: string
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', inputElement.value);
  };
</script>