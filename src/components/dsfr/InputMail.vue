<template>
  <div class="fr-input-group" :class="{ 'fr-input-group--error': messageErreur }">
    <label class="fr-label" :class="classLabel" :for="name">
      {{ label }}
      <span class="text--normal fr-hint-text" v-if="hasHint">Format attendu : nom@domaine.fr</span>
    </label>
    <input
      :id="name"
      :value="modelValue"
      @input="updateValue"
      class="fr-input"
      :name="name"
      autocomplete="email"
      type="email"
      :disabled="disable"
      required
      v-bind="messageErreur ? { 'aria-describedby': `${name}-messages` } : {}"
    />
    <div class="fr-messages-group" :id="`${name}-messages`" aria-live="polite" v-if="messageErreur">
      <p class="fr-message fr-message--error fr-mt-1w" :id="`${name}-message-error`" v-text="messageErreur" />
    </div>
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      name: string;
      label: string;
      messageErreur?: string;
      modelValue: string;
      classLabel?: string;
      disable?: boolean;
      hasHint?: boolean;
    }>(),
    {
      hasHint: true,
    },
  );

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', inputElement.value);
  };
</script>

<style scoped>
  .fr-input-group--error::before {
    content: none;
  }

  .label-blanc.fr-input-group--error label,
  .label-blanc.fr-input-group--error .fr-message--error {
    color: white;
  }
</style>
