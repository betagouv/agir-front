<template>
  <div class="fr-input-group">
    <label class="fr-label" :for="name">
      {{ label }}
      <span class="fr-hint-text">Format attendu : nom@domaine.fr</span>
    </label>
    <input
      :id="name"
      :value="modelValue"
      @input="updateValue"
      class="fr-input"
      :name="name"
      autocomplete="on"
      type="email"
    />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    name: string;
    label: string;
    modelValue: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', inputElement.value);
  };
</script>
