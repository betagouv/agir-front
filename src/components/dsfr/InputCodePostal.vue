<template>
  <label class="fr-label" for="codePostal">Code postal</label>
  <input class="fr-input" name="codePostal" id="codePostal" type="text" @input="updateValue" :value="defaultValue" />
</template>

<script setup lang="ts">
  defineProps<{
    defaultValue?: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', inputElement.value);
  };
</script>
