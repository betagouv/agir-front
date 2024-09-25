<template>
  <label :class="`fr-label ${label.cssModifier}`" :for="id">
    {{ label.wording }}
    <span class="fr-hint-text">Nombre uniquement</span>
  </label>
  <input class="fr-input" type="text" :id="id" :name="id" inputmode="numeric" pattern="[0-9]*" @input="updateValue" />
</template>

<script setup lang="ts">
  defineProps<{ id: string; label: { wording: string; cssModifier?: string } }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const updateValue = async event => {
    const { value } = event.target as HTMLInputElement;
    emit('update:modelValue', value);
  };
</script>
