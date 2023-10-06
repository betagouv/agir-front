<template>
  <section class="fr-accordion background--white border border-radius--md">
    <h3 class="fr-accordion__title">
      <button class="fr-accordion__btn fr-text-label--blue-france" aria-expanded="false" :aria-controls="nameId">
        <slot name="titre" />
      </button>
    </h3>
    <div class="fr-collapse" :id="nameId">
      <slot name="contenu" />
    </div>
  </section>
</template>

<script setup lang="ts">
  defineProps<{
    nameId: string;
  }>();
</script>

<style scoped>
  .fr-accordion::before {
    display: none;
  }

  .fr-accordion__btn {
    border-radius: 6px;
  }

  .fr-accordion__btn::after {
    position: absolute;
    right: 1rem;
  }

  .fr-accordion__btn[aria-expanded='true'] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
</style>
