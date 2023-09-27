<template>
  <div class="fr-fieldset__element">
    <div class="fr-input-group">
      <label class="fr-label" :for="id">
        {{ label }}
        <span class="fr-hint-text">Format attendu : nom@domaine.fr</span>
      </label>
      <input
        :id="id"
        :value="modelValue"
        @input="updateValue"
        class="fr-input"
        name="email"
        autocomplete="on"
        type="email"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    id: string,
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
