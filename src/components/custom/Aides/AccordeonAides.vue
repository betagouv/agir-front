<template>
  <section class="fr-accordion background--white border border-radius--md">
    <h3 class="fr-accordion__title">
      <button
        class="fr-accordion__btn fr-text-label--blue-france fr-p-2w"
        aria-expanded="false"
        :aria-controls="nameId"
        :id="`button-${nameId}`"
      >
        <slot name="titre" />
        <span class="chevron-icon fr-icon-arrow-right-s-line" aria-hidden="true"></span>
      </button>
    </h3>
    <div class="fr-collapse" :id="nameId">
      <slot name="contenu" />
    </div>
  </section>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/accordion/accordion.min.css';

  defineProps<{ nameId: string }>();
</script>

<style scoped>
  .fr-accordion::before,
  .fr-accordion__btn::after {
    display: none;
  }

  .fr-accordion__btn {
    position: relative;
    border-radius: 6px;
  }

  .fr-accordion__btn[aria-expanded='true'] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .chevron-icon {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }

  .fr-accordion__btn[aria-expanded='true'] .chevron-icon {
    transform: rotate(90deg);
  }
</style>
