<template>
  <dialog :aria-labelledby="labelId" :id="id" class="fr-modal" role="dialog">
    <div class="fr-container fr-container--fluid fr-container-md">
      <div class="fr-grid-row fr-grid-row--center">
        <div :class="`fr-col-12 ${modaleSize(size)}`">
          <div class="fr-modal__body" :class="radius && 'border-radius--lg'">
            <div class="fr-modal__header">
              <button class="fr-btn--close fr-btn" :aria-controls="id">Fermer</button>
            </div>
            <slot name="contenuEtFooter" />
            <div class="fr-modal__content fr-mb-0">
              <slot name="contenu" />
            </div>
            <div class="fr-modal__footer fr-mt-0" v-if="isFooterActions">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      id: string;
      labelId: string;
      radius: boolean;
      isFooterActions: boolean;
      size?: 's' | 'sm' | 'm';
    }>(),
    {
      size: 's',
    },
  );

  const modaleSize = size => {
    switch (size) {
      case 's':
        return 'fr-col-md-4';
      case 'sm':
        return 'fr-col-md-6';
      case 'm':
        return 'fr-col-md-8';
      default:
        return 'fr-col-md-4';
    }
  };
</script>
