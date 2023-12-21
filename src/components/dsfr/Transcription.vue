<template>
  <div class="fr-transcription background--white">
    <button class="fr-transcription__btn" aria-expanded="false" :aria-controls="id">{{ titre }}</button>
    <div class="fr-collapse" :id="id">
      <Modale :label="`${id}-transcription-title`" :id="`${id}-modal`" size="m">
        <h1 :id="id" class="fr-modal__title text--center text--uppercase fr-text--sm text--normal text--gris">
          {{ titre }}
        </h1>
        <slot />
      </Modale>
      <div class="fr-transcription__footer">
        <div class="fr-transcription__actions-group">
          <button
            class="fr-btn fr-btn--fullscreen"
            :aria-controls="`${id}-modal`"
            data-fr-opened="false"
            :title="titre"
          >
            Agrandir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Modale from '@/components/custom/Modale/Modale.vue';

  defineProps<{
    id: string;
    titre: string;
  }>();
</script>
