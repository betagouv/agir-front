<template>
  <form>
    <h3 class="fr-h4">Où habitez-vous ?</h3>
    <button @click="retourEtapePrecedente">Précédent</button>
  </form>
</template>
<script setup lang="ts">
  const emit = defineEmits(['retourEtapePrecedente']);

  const retourEtapePrecedente = () => {
    emit('retourEtapePrecedente');
  };
</script>
