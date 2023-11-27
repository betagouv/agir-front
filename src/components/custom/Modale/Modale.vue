<template>
  <dialog :aria-labelledby="label" :id="id" class="fr-modal" role="dialog">
    <div class="fr-container fr-container--fluid fr-container-md">
      <div class="fr-grid-row fr-grid-row--center">
        <div class="fr-col-12 fr-col-md-8 fr-col-lg-4">
          <div class="fr-modal__body border-radius--lg">
            <div class="fr-modal__header">
              <button class="fr-btn--close fr-btn" :aria-controls="id">Fermer</button>
            </div>
            <div class="fr-modal__content">
              <h1 :id="label" class="fr-modal__title text--center text--uppercase fr-text--sm text--normal text--gris">
                {{ titre }}
              </h1>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
  defineProps<{
    id: string;
    titre: string;
    label: string;
  }>();
</script>
