<template>
  <CompteSkeleton page-courante="Mon Compte - Options avancées">
    <CompteSuppression />
    <CompteFormulaireMotDePasse />
  </CompteSkeleton>
</template>

<script setup lang="ts">
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import CompteSuppression from '@/components/custom/Compte/CompteSuppression.vue';
  import CompteFormulaireMotDePasse from '@/components/custom/Compte/CompteFormulaireMotDePasse.vue';
</script>
