<template>
  <div class="fr-container fr-my-3w" v-if="flashMessage || flashTitre">
    <div :class="`fr-alert fr-alert--${flashType}`">
      <h3 class="fr-alert__title" v-if="flashTitre" v-text="flashTitre" />
      <p v-text="flashMessage" />
      <button class="fr-btn--close fr-btn" title="Masquer le message" @click="clearFlashMessage">
        Masquer le message
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/alert/alert.min.css';
  import { useFlashMessage } from '@/composables/useFlashMessage';

  const { flashTitre, flashMessage, flashType, clearFlashMessage } = useFlashMessage();
</script>
