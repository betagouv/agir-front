<template>
  <CompteSkeleton page-courante="Mon Compte - Options avancées">
    <CompteSuppression />
  </CompteSkeleton>
</template>

<script lang="ts" setup>
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import CompteSuppression from '@/components/custom/Compte/CompteSuppression.vue';
</script>
