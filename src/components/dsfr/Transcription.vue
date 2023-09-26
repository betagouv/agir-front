<template>
  <div class="fr-transcription background--white">
    <button class="fr-transcription__btn" aria-expanded="false" :aria-controls="id">{{ titre }}</button>
    <div class="fr-collapse" :id="id">
      <dialog :id="`${id}-modal`" class="fr-modal" role="dialog" :aria-labelledby="`${id}-transcription-title`">
        <div class="fr-container fr-container--fluid fr-container-md">
          <div class="fr-grid-row fr-grid-row--center">
            <div class="fr-col-12 fr-col-md-10 fr-col-lg-8">
              <div class="fr-modal__body">
                <div class="fr-modal__header">
                  <button class="fr-btn--close fr-btn" :aria-controls="`${id}-modal`" title="Fermer">Fermer</button>
                </div>
                <div class="fr-modal__content">
                  <h1 :id="`${id}-transcription-title`" class="fr-modal__title">
                    {{ titre }}
                  </h1>
                  <slot />
                </div>
                <div class="fr-transcription__footer">
                  <div class="fr-transcription__actions-group">
                    <button
                      class="fr-btn fr-btn--fullscreen"
                      :aria-controls="`${id}-modal`"
                      data-fr-opened="false"
                      title=""
                    >
                      Agrandir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    id: string;
    titre: string;
  }>();
</script>
