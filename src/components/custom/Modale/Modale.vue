<template>
  <dialog :aria-labelledby="label" :id="id" class="fr-modal">
    <div class="fr-container fr-container--fluid fr-container-md">
      <div class="fr-grid-row fr-grid-row--center">
        <div :class="`fr-col-12 ${modaleSize}`">
          <div class="fr-modal__body" :class="radius && 'border-radius--lg'">
            <div class="fr-modal__header">
              <button class="fr-btn--close fr-btn" :aria-controls="id">Fermer</button>
            </div>
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
  const props = withDefaults(
    defineProps<{
      id: string;
      label: string;
      radius: boolean;
      isFooterActions: boolean;
      size?: 's' | 'm';
    }>(),
    {
      size: 's',
    },
  );

  const modaleSize = props.size === 's' ? 'fr-col-md-4' : 'fr-col-md-8';
</script>
