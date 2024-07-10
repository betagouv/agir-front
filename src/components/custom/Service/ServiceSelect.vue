<template>
  <select class="service-select" :id="id" :name="id" @input="updateMois">
    <option
      v-for="option in options"
      :key="option.code"
      :value="option.code"
      :selected="option.estLaCategorieParDefaut"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
  defineProps<{
    id: string;
    options: {
      label: string;
      code: string;
      estLaCategorieParDefaut: boolean;
    }[];
  }>();

  const emit = defineEmits<{ (e: 'update', value: string): void }>();

  const updateMois = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update', inputElement.value);
  };
</script>

<style>
  .service-select {
    font-size: 2rem;
    border-bottom: 2px dashed var(--blue-france-sun-113-625);
    color: var(--blue-france-sun-113-625);
    font-weight: bold;
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="%23000091" class="bi bi-chevron-down" viewBox="0 0 16 16"%3E%3Cpath fill-rule="evenodd" d="M1.646 4.646a.75.75 0 0 1 1.06 0L8 9.939l5.294-5.293a.75.75 0 0 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06z"/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 2rem;
  }

  .service-select option {
    font-size: 1.25rem;
  }
</style>
