<template>
  <div class="fr-toggle">
    <input type="checkbox" class="fr-toggle__input" :id="id" @change.prevent="onInputChange" />
    <label class="fr-toggle__label" :for="id">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/toggle/toggle.min.css';

  defineProps<{ label: string; id: string }>();

  const emit = defineEmits<{ (event: 'onChange', value: boolean): void }>();

  const onInputChange = (event: Event) => {
    const { checked } = event.target as HTMLInputElement;
    emit('onChange', checked);
  };
</script>

<style scoped>
  .fr-toggle__label::before {
    margin-right: 1rem;
  }
</style>
