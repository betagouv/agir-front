<template>
  <div role="alert" :class="`fr-alert fr-alert--${type} background--white`">
    <h3 class="fr-alert__title">{{ titre }}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/alert/alert.min.css';

  defineProps<{
    titre: string;
    message: string;
    type: 'success' | 'error';
  }>();
</script>
