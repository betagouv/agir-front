<template>
  <fieldset class="fr-fieldset" :id="name" aria-labelledby="radio-legend">
    <legend class="fr-fieldset__legend--regular fr-fieldset__legend fr-h4" id="radio-legend">
      {{ legende }}
    </legend>
    <div class="fr-fieldset__element" v-for="(item, index) in options" :key="index">
      <div class="fr-radio-group">
        <input type="radio" :id="`${name}-${index}`" :name="name" :value="item" @change.prevent="onInputChange" />
        <label class="fr-label" :for="`${name}-${index}`">
          {{ item }}
        </label>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  defineProps<{
    legende: string;
    name: string;
    options: string[];
  }>();

  const emit = defineEmits(['update']);

  const onInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    emit('update', input.value);
  };
</script>
