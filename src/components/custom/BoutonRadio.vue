<template>
  <fieldset
    :class="`fr-fieldset ${orientation === 'horizontal' && 'boutonRadio--horizontal'}`"
    :id="name"
    aria-labelledby="radio-legend"
  >
    <legend
      :class="`fr-fieldset__legend--regular fr-fieldset__legend fr-pb-0 ${legendeSize === 'l' ? 'fr-h4' : 'fr-mb-1w'}`"
      id="radio-legend"
    >
      {{ legende }}
    </legend>
    <div class="fr-grid-row full-width">
      <div :class="`fr-fieldset__element ${col}`" v-for="option in options" :key="option.label">
        <div
          :class="`fr-radio-group border fr-p-2w fr-col ${
            option.value === defaultValue ? 'fr-text--bold border--bleu-dark' : ''
          }`"
        >
          <input
            type="radio"
            :id="`${option.label}`"
            :name="name"
            :value="option.value"
            @change.prevent="onInputChange"
            :checked="option.value === defaultValue"
          />
          <label class="fr-label" :for="`${option.label}`">
            {{ option.label }}
          </label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  defineProps<{
    legende: string;
    legendeSize: 'm' | 'l';
    orientation: 'vertical' | 'horizontal';
    name: string;
    options: { label: string; value: string }[];
    col: string;
    defaultValue?: string;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const onInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    emit('update:modelValue', input.value);
  };
</script>

<style scoped>
  .fr-radio-group {
    max-width: none;
  }

  .fr-radio-group input[type='radio'] + label:before {
    top: auto;
  }

  .boutonRadio--horizontal .fr-fieldset__element {
    flex: auto;
  }
</style>
