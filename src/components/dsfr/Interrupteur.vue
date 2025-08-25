<template>
  <div class="fr-toggle">
    <input
      :role="!isInMenu ? 'checkbox' : 'menuitemcheckbox'"
      type="checkbox"
      class="fr-toggle__input"
      :id="id"
      @change.prevent="onInputChange"
      :aria-checked="isChecked"
    />
    <label class="fr-toggle__label" :for="id">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/toggle/toggle.min.css';
  import { ref } from 'vue';

  defineProps<{ label: string; id: string; isInMenu?: boolean }>();

  const isChecked = ref<boolean>(false);
  const emit = defineEmits<{ (event: 'onChange', value: boolean): void }>();

  const onInputChange = (event: Event) => {
    const { checked } = event.target as HTMLInputElement;
    isChecked.value = checked;
    emit('onChange', checked);
  };
</script>

<style scoped>
  .fr-toggle__label::before {
    margin-right: 1rem;
  }
</style>
