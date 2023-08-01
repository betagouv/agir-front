<template>
  <section class="fr-accordion">
    <h3 class="fr-accordion__title">
      <button class="fr-accordion__btn fr-text-label--blue-france" aria-expanded="false" :aria-controls="nameId">Voir le détail</button>
    </h3>
    <div class="fr-collapse" :id="nameId">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
  defineProps<{
    nameId: string
  }>()
</script>
