<template>
  <div class="fr-checkbox-group fr-checkbox-group--sm" :class="erreur ? 'fr-checkbox-group--error' : ''">
    <input
      :name="id"
      :id="id"
      type="checkbox"
      :checked="modelValue"
      @input="updateValue"
      v-bind="erreur ? { 'aria-describedby': 'checkbox-error-messages' } : {}"
    />
    <label class="fr-label" :for="id">
      {{ label }}
      <span v-if="description" class="fr-hint-text">{{ description }}</span>
    </label>
    <div v-if="erreur" class="fr-messages-group" id="checkbox-error-messages" aria-live="assertive">
      <p class="fr-message fr-message--error" id="checkbox-error-message-error">{{ erreur }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    id: string;
    label: string;
    description?: string;
    modelValue: boolean;
    erreur?: string;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;

    emit('update:modelValue', inputElement.checked);
  };
</script>
