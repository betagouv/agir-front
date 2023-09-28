<template>
  <fieldset class="fr-fieldset" :id="name" aria-labelledby="radio-legend">
    <legend class="fr-fieldset__legend--regular fr-fieldset__legend fr-h4" id="radio-legend">
      {{ legende }}
    </legend>
    <div class="fr-grid-row full-width">
      <div :class="`fr-fieldset__element ${col}`" v-for="(item, index) in options" :key="index">
        <div class="fr-radio-group border fr-p-2w fr-col">
          <input type="radio" :id="`${name}-${index}`" :name="name" :value="item" @change.prevent="onInputChange" />
          <label class="fr-label" :for="`${name}-${index}`">
            {{ item }}
          </label>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  defineProps<{
    legende: string;
    name: string;
    options: string[];
    col: string;
  }>();

  const emit = defineEmits(['update']);

  const onInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    emit('update', input.value);
  };
</script>

<style scoped>
  .fr-radio-group:has(input:checked) {
    border-color: var(--blue-france-sun-113-625);
    font-weight: bold;
  }
</style>
