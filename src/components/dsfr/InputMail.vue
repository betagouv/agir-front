<template>
  <div class="fr-input-group">
    <label class="fr-label" :class="classLabel" :for="name">
      {{ label }}
      <span class="text--normal fr-hint-text">Format attendu : nom@domaine.fr</span>
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
    />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    name: string;
    label: string;
    modelValue: string;
    classLabel?: string;
    disable?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', inputElement.value);
  };
</script>
