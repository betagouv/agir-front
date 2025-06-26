<template>
  <section class="fr-accordion">
    <h3 class="fr-accordion__title">
      <button type="button" class="fr-accordion__btn" aria-expanded="false" :aria-controls="nameId">
        <slot name="titre" />
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

<style scoped></style>
