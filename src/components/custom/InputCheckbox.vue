<template>
  <fieldset class="fr-fieldset" id="checkboxes" aria-labelledby="checkboxes-legend">
    <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="checkboxes-legend">
      Plusieurs réponses sont possibles
    </legend>
    <div class="fr-fieldset__element" v-for="option in options" :key="option.id">
      <div
        :class="`fr-checkbox-group checkbox-group--custom fr-p-2w border ${
          checkedNames.includes(option.id) ? 'fr-text--bold border--bleu-dark' : ''
        }`"
      >
        <input :id="option.id" :value="option.id" type="checkbox" v-model="checkedNames" @change="updateValue" />
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
  }>();

  const checkedNames = ref<string[]>(props.defaultValues || []);

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
  }>();

  const updateValue = () => {
    emit('update:modelValue', checkedNames.value);
  };
</script>
