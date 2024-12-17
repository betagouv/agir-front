<template>
  <div class="fr-col-12 fr-col-md-6">
    <div
      class="shadow border-radius--md text--left fr-p-3w full-height flex flex-column flex-space-between background--white"
    >
      <div class="fr-mb-3v">
        <h3 class="fr-h4 fr-pb-2w fr-mb-2w fr-text--md">
          <span aria-hidden="true" class="fr-pr-1w">{{ titreEmoji }}</span> {{ titreTexte }}
        </h3>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { titreEmoji = '😊', titreTexte } = defineProps<{
    titreEmoji: string;
    titreTexte: string;
    lienBouton: string;
  }>();
</script>

<style scoped>
  h3 {
    border-bottom: 1px solid #eaeaea;
  }
</style>
