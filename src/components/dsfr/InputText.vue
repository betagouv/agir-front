<template>
  <div :class="erreur && erreur.afficher ? 'fr-input-group--error' : ''" class="fr-input-group">
    <label :for="name" class="fr-label">
      {{ label }}
      <span v-if="description" class="fr-hint-text" :class="descriptionClass">{{ description }}</span>
    </label>
    <input
      ref="inputRef"
      :aria-describedby="erreur && erreur.afficher ? errorId : ''"
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
      spellcheck="false"
    />
    <p v-if="erreur && erreur.afficher" :id="errorId" class="fr-error-text" aria-live="assertive">
      {{ erreur.message }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';

  const inputRef = ref<HTMLInputElement>();
  defineExpose({ focus: () => inputRef.value?.focus() });

  export type InputErreur = {
    message: string;
    afficher: boolean;
  };

  const props = defineProps<{
    name: string;
    label: string;
    modelValue: string;
    description?: string;
    descriptionClass?: string;
    required?: boolean;
    erreur?: InputErreur;
    maxlength?: number;
    autofocus?: boolean;
    disabled?: boolean;
    autocomplete?: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'blur'): void;
  }>();

  const errorId = computed(() => {
    return `${props.name}-text-input-error-desc-error`;
  });

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', inputElement.value);
  };

  const handleBlur = () => {
    emit('blur');
  };
</script>
