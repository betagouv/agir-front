<template>
  <div class="fr-input-group" :class="erreur && erreur.afficher ? 'fr-input-group--error' : ''">
    <label class="fr-label" :for="name">
      {{ label }}
      <span v-if="description" class="fr-hint-text">{{ description }}</span>
    </label>
    <div class="fr-input-wrap" :class="icon">
      <input
        class="fr-input"
        :class="erreur && erreur.afficher ? 'fr-input--error' : ''"
        type="text"
        :required="required"
        :id="name"
        :name="name"
        :value="modelValue"
        @input="updateValue"
        @blur="handleBlur"
      />
    </div>
    <p v-if="erreur && erreur.afficher" id="text-input-error-desc-error" class="fr-error-text">{{ erreur.message }}</p>
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
    erreur?: {
      message: string;
      afficher: boolean;
    };
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'blur'): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', inputElement.value);
  };

  const handleBlur = () => {
    emit('blur');
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
