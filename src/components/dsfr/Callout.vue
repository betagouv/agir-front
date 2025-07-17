<template>
  <div :class="`fr-callout ${iconeInformation ? 'fr-icon-information-line' : ''}`">
    <h3 v-if="titre" class="fr-callout__title" v-text="titre" />

    <template v-if="$slots.texte">
      <slot name="texte"></slot>
    </template>
    <p v-else-if="texte">{{ texte }}</p>

    <button
      v-if="button"
      @click="button.onClick"
      v-text="button.text"
      :class="button.class"
      class="fr-btn fr-btn--secondary"
    />
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
      class?: string;
    };
    iconeInformation?: boolean;
  }>();
</script>
