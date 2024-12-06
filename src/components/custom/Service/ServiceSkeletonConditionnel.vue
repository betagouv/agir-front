<template>
  <ServiceSkeleton v-if="isLoading" />
  <slot v-else-if="viewModelExiste" />
  <p v-else>Problème de chargement...</p>
</template>

<script setup lang="ts">
  import ServiceSkeleton from '@/components/custom/Service/ServiceSkeleton.vue';

  defineProps<{ viewModelExiste: boolean; isLoading: boolean }>();
</script>
