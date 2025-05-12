<template>
  <div :class="`fr-callout ${iconeInformation ? 'fr-icon-information-line' : ''}`">
    <h3 v-if="titre" class="fr-callout__title" v-text="titre" />
    <p v-if="texte" class="fr-callout__text" v-html="texte" />
    <button v-if="button" class="fr-btn fr-btn--secondary" @click="button.onClick">{{ button.text }}</button>
  </div>
</template>

<script lang="ts" setup>
  import '@gouvfr/dsfr/dist/component/callout/callout.min.css';

  defineProps<{
    titre?: string;
    texte?: string;
    button?: {
      text?: string;
      onClick?: () => void;
    };
    iconeInformation?: boolean;
  }>();
</script>
