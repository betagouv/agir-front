<template>
  <div
    ref="alertEl"
    :role="aUnRoleAlert ? 'alert' : ''"
    :class="`fr-alert fr-alert--${type} ${taille === 'small' ? 'fr-alert--sm' : ''} background--white`"
    tabindex="-1"
  >
    <h3 v-if="titre" class="fr-alert__title" v-text="titre" />
    <span v-if="titre" class="fr-sr-only">: </span>

    <template v-if="$slots.message">
      <slot name="message"></slot>
    </template>
    <p v-else-if="message">{{ message }}</p>

    <button v-if="onClose" class="fr-btn--close fr-btn" title="Masquer le message" @click="onClose">
      Masquer le message
    </button>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/alert/alert.min.css';
  import { ref } from 'vue';

  withDefaults(
    defineProps<{
      aUnRoleAlert?: boolean;
      titre?: string;
      message?: string;
      type: 'success' | 'error' | 'info' | 'warning';
      taille?: 'small' | 'medium';
      onClose?: () => void;
    }>(),
    { aUnRoleAlert: true },
  );

  const alertEl = ref<HTMLDivElement>();

  defineExpose({
    focus: () => alertEl.value?.focus(),
  });
</script>
