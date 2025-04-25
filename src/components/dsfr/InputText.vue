<template>
  <div :class="erreur && erreur.afficher ? 'fr-input-group--error' : ''" class="fr-input-group">
    <label :for="name" class="fr-label">
      {{ label }}
      <span v-if="description" class="fr-hint-text">{{ description }}</span>
    </label>
    <input
      aria-describedby="text-input-error-desc-error"
      :autocomplete="autocomplete"
      :id="name"
      :autofocus="autofocus"
      :class="erreur && erreur.afficher ? 'fr-input--error' : ''"
      :disabled="disabled"
      :maxlength="maxlength"
      :name="name"
      :required="required"
      :value="modelValue"
      class="fr-input"
      type="text"
      @blur="handleBlur"
      @input="updateValue"
    />
    <p v-if="erreur && erreur.afficher" id="text-input-error-desc-error" class="fr-error-text" aria-live="assertive">
      {{ erreur.message }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    name: string;
    label: string;
    modelValue: string;
    description?: string;
    required?: boolean;
    erreur?: {
      message: string;
      afficher: boolean;
    };
    maxlength?: number;
    autofocus?: boolean;
    disabled?: boolean;
    autocomplete?: string;
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
