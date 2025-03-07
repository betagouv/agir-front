<template>
  <fieldset class="fr-fieldset" id="checkboxes" aria-labelledby="checkboxes-legend">
    <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="checkboxes-legend">
      Plusieurs réponses sont possibles
    </legend>
    <div class="fr-fieldset__element" v-for="(option, index) in updatedOptions" :key="option.id">
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
          @change="updateValue($event, index)"
        />
        <label class="fr-label background--white" :for="option.id">{{ option.label }}</label>
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
      checked?: boolean;
    }[];
    estResetable?: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
  }>();

  const updatedOptions = ref(props.options);
  const updateValue = (event: Event, index: number) => {
    const input = event.target as HTMLInputElement;

    if (props.estResetable && index === props.options.length - 1) {
      updatedOptions.value.forEach((opt, i) => (opt.checked = i === index ? input.checked : false));
    } else {
      updatedOptions.value[index].checked = input.checked;
      if (props.estResetable) {
        updatedOptions.value[updatedOptions.value.length - 1].checked = false;
      }
    }

    emit(
      'update:modelValue',
      updatedOptions.value.filter(opt => opt.checked).map(opt => opt.id),
    );
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
