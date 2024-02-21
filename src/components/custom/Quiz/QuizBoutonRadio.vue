<template>
  <!-- v-model="valueInput" -->
</template>

<script setup lang="ts">
  defineProps<{
    question: string;
    options: { label: string; value: string; disabled?: boolean; customClass: string }[];
    valeur: string;
    reponseCorrecte: string;
    reponseDonnee: string;
  }>();
</script>

<style scoped></style>
