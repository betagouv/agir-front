<template>
  <fieldset class="fr-fieldset" id="checkboxes" aria-labelledby="checkboxes-legend">
    <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="checkboxes-legend">
      Plusieurs réponses sont possibles
    </legend>
    <div class="fr-fieldset__element" v-for="(option, index) in options" :key="option.id">
      <div
        :class="`fr-checkbox-group checkbox-group--custom border ${
          option.checked ? 'fr-text--bold border--bleu-dark' : ''
        }`"
      >
        <input
          :id="option.id"
          :value="option.id"
          type="checkbox"
          :checked="option.checked"
          @change="updateValue($event, !!(estResetable && index === options.length - 1))"
        />
        <label class="fr-label background--white" :for="option.id">{{ option.label }}</label>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  const props = defineProps<{
    options: {
      id: string;
      label: string;
      checked?: boolean;
    }[];
    estResetable?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
  }>();

  const updateValue = (event: Event, reset: boolean) => {
    const input = event.target as HTMLInputElement;
  };
</script>

<style scoped>
  .fr-checkbox-group input[type='checkbox'] + label {
    padding: 1rem;
    margin-left: 0;
    padding-left: 3rem;
  }

  .fr-checkbox-group input[type='checkbox'] + label::before {
    left: 1rem;
    top: 1rem;
  }
</style>
