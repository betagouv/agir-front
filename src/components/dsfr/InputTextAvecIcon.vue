<template>
  <div class="fr-input-group">
    <label class="fr-label" :for="name">
      {{ label }}
      <span v-if="description" class="fr-hint-text">{{ description }}</span>
    </label>
    <div class="fr-input-wrap" :class="icon">
      <input
        class="fr-input"
        type="text"
        :required="required"
        :id="name"
        :name="name"
        :value="modelValue"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    name: string;
    label: string;
    modelValue: string;
    description?: string;
    required?: boolean;
    icon: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', inputElement.value);
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
</style>
