<template>
  <KycSkeleton v-if="isLoading" />
  <slot v-else-if="viewModelExiste" />
  <p v-else>Problème de chargement...</p>
</template>

<script setup lang="ts">
  import KycSkeleton from '@/components/KycSkeleton.vue';

  defineProps<{ viewModelExiste: boolean; isLoading: boolean }>();
</script>
