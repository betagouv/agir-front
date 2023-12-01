<template>
  <div class="fr-checkbox-group fr-checkbox-group--sm">
    <input :name="id" :id="id" type="checkbox" @input="updateValue" />
    <label class="fr-label" :for="id">
      {{ label }}
      <span v-if="description" class="fr-hint-text">{{ description }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    id: string;
    label: string;
    description?: string;
  }>();

  const emit = defineEmits(['update']);

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;

    emit('update', inputElement.checked);
  };
</script>
