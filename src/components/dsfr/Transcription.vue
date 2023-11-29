<template>
  <div class="fr-transcription background--white">
    <button class="fr-transcription__btn" aria-expanded="false" :aria-controls="id">{{ titre }}</button>
    <div class="fr-collapse" :id="id">
      <Modale :titre="titre" :label="`${id}-transcription-title`" :id="`${id}-modal`" size="m">
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
