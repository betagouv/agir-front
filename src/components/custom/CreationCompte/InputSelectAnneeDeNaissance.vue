<template>
  <div class="fr-select-group">
    <label class="fr-label" for="selectAnneeNaissance">
      Année de naissance
      <span class="fr-hint-text">facultatif</span>
    </label>
    <select class="fr-select" id="selectAnneeNaissance" name="selectAnneeNaissance" @input="updateValue">
      <option value="" selected disabled hidden>Sélectionner une année</option>
      <option v-for="annee in anneesOptions" :key="annee" :value="annee">{{ annee }}</option>
    </select>
  </div>
</template>
<script setup lang="ts">
  defineModel<number>('anneeDeNaissance');
  const anneesOptions = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    emit('update:modelValue', Number(inputElement.value));
  };
</script>
