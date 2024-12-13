<template>
  <div class="fr-col-12 fr-col-md-4">
    <div class="shadow border-radius--md text--left fr-p-3w full-height flex flex-column flex-space-between">
      <div class="fr-mb-3v">
        <h3 class="fr-h4 fr-pb-2w fr-mb-2w fr-text--md">
          <span aria-hidden="true" class="fr-pr-1w">{{ titreEmoji }}</span> {{ titreTexte }}
        </h3>
        <slot />
      </div>

      <a :href="lienBouton" class="fr-btn">Découvrir</a>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { titreEmoji = '😊', titreTexte } = defineProps<{
    titreEmoji: string;
    titreTexte: string;
    lienBouton: string;
  }>();
</script>

<style scoped>
  .fr-btn {
    align-self: center;
    border-radius: 2rem;
    background-color: black;
  }

  .fr-btn:hover {
    background-color: #656565;
  }

  h3 {
    border-bottom: 1px solid #eaeaea;
  }
</style>
