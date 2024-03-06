<template>
  <div class="fr-transcription" :id="id">
    <button
      class="fr-transcription__btn"
      :aria-expanded="estOuvert"
      :aria-controls="`fr-transcription-collapse-${id}`"
      data-fr-js-collapse-button="true"
    >
      Transcription
    </button>
    <div
      :class="`fr-collapse ${estOuvert && 'fr-collapse--expanded'}`"
      :id="`fr-transcription-collapse-${id}`"
      data-fr-js-collapse="true"
      style="--collapse-max-height: none; --collapse: -210px"
    >
      <div class="fr-transcription__footer">
        <div class="fr-transcription__actions-group">
          <button
            class="fr-btn--fullscreen fr-btn"
            :aria-controls="`fr-transcription-modal-${id}`"
            aria-label="Agrandir la transcription"
            data-fr-opened="false"
            id="button-2150"
            data-fr-js-modal-button="true"
          >
            Agrandir
          </button>
        </div>
      </div>
      <div
        :id="`fr-transcription-modal-${id}`"
        class="fr-modal"
        :aria-labelledby="`fr-transcription-modal-${id}-title`"
        data-fr-js-modal="true"
      >
        <div class="fr-container fr-container--fluid fr-container-md">
          <div class="fr-grid-row fr-grid-row--center">
            <div class="fr-col-12 fr-col-md-10 fr-col-lg-8">
              <div class="fr-modal__body" data-fr-js-modal-body="true" style="--modal-max-height: 719px">
                <div class="fr-modal__header">
                  <button
                    class="fr-btn--close fr-btn"
                    :aria-controls="`fr-transcription-modal-${id}`"
                    id="button-2151"
                    title="Fermer"
                    data-fr-js-modal-button="true"
                  >
                    Fermer
                  </button>
                </div>
                <div class="fr-modal__content">
                  <h1 :id="`fr-transcription-modal-${id}-title`" class="fr-modal__title">{{ titre }}</h1>
                  <slot />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/transcription/transcription.min.css';

  defineProps<{
    id: string;
    titre: string;
    estOuvert: boolean;
  }>();
</script>
