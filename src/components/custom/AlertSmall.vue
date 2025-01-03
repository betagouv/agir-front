<template>
  <div role="alert" :class="`fr-alert fr-alert--${type} background--white fr-alert--sm`">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/alert/alert.min.css';

  defineProps<{
    message: string;
    type: 'success' | 'error' | 'info';
  }>();
</script>
