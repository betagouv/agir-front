<template>
  <div class="fr-callout fr-icon-information-line">
    <h3 class="fr-callout__title" v-text="titre" />
    <p class="fr-callout__text" v-html="texte" />
    <button v-if="buttonText && onClick" class="fr-btn" @click="onClick">{{ buttonText }}</button>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/callout/callout.min.css';

  defineProps<{
    titre: string;
    texte: string;
    buttonText?: string;
    onClick?: () => void;
  }>();
</script>
