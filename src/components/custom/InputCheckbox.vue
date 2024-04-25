<template>
  <fieldset class="fr-fieldset" id="checkboxes" aria-labelledby="checkboxes-legend">
    <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="checkboxes-legend">
      Plusieurs réponses sont possibles
    </legend>
    <div class="fr-fieldset__element" v-for="(option, index) in options" :key="option.id">
      <div
        :class="`fr-checkbox-group checkbox-group--custom border ${
          checkedNames.includes(option.id) ? 'fr-text--bold border--bleu-dark' : ''
        }`"
      >
        <input
          :id="option.id"
          :value="option.id"
          type="checkbox"
          v-model="checkedNames"
          @change="updateValue($event, estResetable && index === options.length - 1 ? true : false)"
        />
        <label class="fr-label" :for="option.id">{{ option.label }}</label>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps<{
    options: {
      id: string;
      label: string;
    }[];
    defaultValues?: string[];
    estResetable?: boolean;
  }>();

  const checkedNames = ref<string[]>(props.defaultValues || []);

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
  }>();

  const updateValue = (event: Event, reset: boolean) => {
    const input = event.target as HTMLInputElement;

    if (props.estResetable && reset && input.checked) {
      checkedNames.value = [input.value];
    } else if (props.estResetable) {
      checkedNames.value = checkedNames.value.filter(value => value !== props.options[props.options.length - 1].id);
    }
    emit('update:modelValue', checkedNames.value);
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
