<template>
  <button class="modalButton fr-btn" data-fr-opened="false" aria-controls="fr-modal-1" @click="aContinue = false">
    Ouvrir modale V2
  </button>

  <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-1" class="fr-modal">
    <div class="fr-container fr-container--fluid fr-container-md">
      <div class="fr-grid-row fr-grid-row--center">
        <div class="fr-col-12 fr-col-md-8">
          <div class="fr-modal__body confetti">
            <div class="fr-modal__header fr-mb-3w">
              <button class="fr-btn--close fr-btn" title="Fermer la fenêtre modale" aria-controls="fr-modal-1">
                Fermer
              </button>
            </div>

            <AnnonceV2 v-if="!aContinue" />
            <RemerciementsV2 v-else />
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import AnnonceV2 from '@/components/custom/AnnonceV2/AnnonceV2.vue';
  import RemerciementsV2 from '@/components/custom/AnnonceV2/RemerciementsV2.vue';

  const aContinue = ref<boolean>(false);

  onMounted(() => {
    setTimeout(() => {
      const modalButton: HTMLButtonElement | null = document.querySelector('.modalButton');
      modalButton?.click();
    }, 100);
  });
</script>

<style scoped>
  .confetti {
    background-image: url('/confetti.svg');
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .badge > img {
    width: 5rem;
    height: 5rem;
  }
</style>
