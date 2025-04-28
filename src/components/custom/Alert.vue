<template>
  <div role="alert" :class="`fr-alert fr-alert--${type} background--white`">
    <h3 class="fr-alert__title">{{ titre }}</h3>
    <span class="fr-sr-only">: </span>
    <p>{{ message }}</p>
    <button v-if="onClose" class="fr-btn--close fr-btn" title="Masquer le message" @click="onClose">
      Masquer le message
    </button>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/alert/alert.min.css';

  defineProps<{
    titre: string;
    message: string;
    type: 'success' | 'error' | 'info';
    onClose?: () => void;
  }>();
</script>
