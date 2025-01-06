<template>
  <fieldset
    :id="name"
    :aria-labelledby="`radio-legend-${name}`"
    :class="`fr-fieldset ${orientation === 'horizontal' && 'boutonRadio--horizontal'}`"
  >
    <legend
      :id="`radio-legend-${name}`"
      :class="legendeSize === 'l' ? 'fr-h4' : 'fr-mb-1w'"
      class="fr-fieldset__legend--regular fr-fieldset__legend fr-pb-0"
    >
      {{ legende }}
      <span v-if="description" class="fr-hint-text">{{ description }}</span>
    </legend>
    <div class="fr-grid-row">
      <div v-for="option in options" :key="option.label" :class="`fr-fieldset__element ${col}`">
        <div
          class="fr-radio-group border fr-col background--white"
          :class="`${option.value === selectedValue ? 'fr-text--bold border--bleu-dark' : ''} ${option.customClass ?? ''}`"
        >
          <input
            :id="`${option.value}-${name}`"
            :checked="option.value === defaultValue"
            :disabled="option.disabled"
            :name="name"
            :value="option.value"
            type="radio"
            @change.prevent="onInputChange"
          />
          <label :for="`${option.value}-${name}`" class="fr-label">
            <span v-html="option.label" />
          </label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
  import { onUpdated, ref, watch } from 'vue';

  const props = defineProps<{
    legende: string;
    legendeSize: 'm' | 'l';
    orientation: 'vertical' | 'horizontal';
    name: string;
    options: { label: string; value: string | boolean; disabled?: boolean; customClass?: string }[];
    col: string;
    defaultValue?: string | boolean;
    description?: string;
    valueType?: 'number';
  }>();

  const selectedValue = ref(props.defaultValue || '');
  const emit = defineEmits(['update:modelValue']);
  watch(
    () => props.defaultValue,
    newDefault => {
      selectedValue.value = newDefault || '';
    },
  );
  const onInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    let valueToUpdate;

    if (input.value === 'true') {
      valueToUpdate = true;
    } else if (input.value === 'false') {
      valueToUpdate = false;
    } else if (props.valueType === 'number') {
      valueToUpdate = Number.parseInt(input.value);
    } else {
      valueToUpdate = input.value;
    }
    selectedValue.value = valueToUpdate;

    emit('update:modelValue', valueToUpdate);
  };

  onUpdated(() => {});
</script>

<style scoped>
  .fr-radio-group {
    max-width: none;
  }

  .fr-radio-group input[type='radio'] + label {
    padding: 1rem 1rem 1rem 3rem;
    background-position: 1rem;
  }

  .fr-radio-group input[type='radio'] + label:before {
    top: 1rem;
    left: calc(3rem + 3px);
  }

  .boutonRadio--horizontal .fr-fieldset__element {
    flex: auto;
  }

  .quiz-article-bien-repondu {
    background-color: var(--success-950-100);
  }

  .quiz-article-erreur {
    background-color: var(--error-950-100);
  }

  .quiz-article-bien-repondu .fr-label,
  .quiz-article-erreur .fr-label {
    color: inherit;
  }

  .quiz-article-bien-repondu.fr-radio-group input[type='radio']:checked:disabled + label,
  .quiz-article-erreur.fr-radio-group input[type='radio']:checked:disabled + label {
    background-image: radial-gradient(transparent 10px, var(--border-active-blue-france) 11px, transparent 12px),
      radial-gradient(var(--background-active-blue-france) 5px, transparent 6px);
  }

  .quiz-article-bien-repondu.fr-radio-group input[type='radio']:disabled + label,
  .quiz-article-erreur.fr-radio-group input[type='radio']:disabled + label {
    background-image: radial-gradient(transparent 10px, var(--border-action-high-blue-france) 11px, transparent 12px);
  }
</style>
