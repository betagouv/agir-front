<template>
  <fieldset class="fr-fieldset" id="checkboxes" aria-labelledby="checkboxes-legend">
    <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="checkboxes-legend">
      Plusieurs réponses sont possibles
    </legend>
    <div class="fr-fieldset__element" v-for="option in options" :key="option.id">
      <div class="fr-checkbox-group checkbox-group--custom fr-p-2w border">
        <input :id="option.id" :value="option.id" type="checkbox" v-model="checkedNames" @input="updateValue" />
        <label class="fr-label" :for="option.id">{{ option.label }}</label>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{
    options: {
      id: string;
      label: string;
    }[];
  }>();

  const checkedNames = ref<string[]>([]);

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
  }>();

  const updateValue = () => {
    emit('update:modelValue', checkedNames.value);
  };
</script>

<style scoped>
  /* CSS semantic: non compatible Firefox -> to refacto */
  .fr-checkbox-group:has(input:checked) {
    border-color: var(--blue-france-sun-113-625);
    font-weight: bold;
  }
</style>
