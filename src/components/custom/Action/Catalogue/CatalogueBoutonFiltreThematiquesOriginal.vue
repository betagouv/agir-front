<template>
  <button
    type="button"
    id="menu-thematiques-bouton"
    aria-haspopup="true"
    :aria-expanded="menuThematiqueOuvert"
    aria-controls="menu-thematiques"
    @click="toggleThematiquesMenu"
    class="position--relative text--left full-width flex flex-space-between align-items--center fr-p-1w"
  >
    <span>
      <span class="fr-text--lg fr-mb-1w text--normal text--bleu display-block">Thématiques</span>
      Toutes
    </span>

    <span
      class="text--bleu"
      :class="{
        'fr-icon-arrow-down-s-line': !menuThematiqueOuvert,
        'fr-icon-arrow-up-s-line': menuThematiqueOuvert,
      }"
    />
  </button>

  <div
    v-show="menuThematiqueOuvert"
    id="menu-thematiques"
    role="menu"
    tabindex="-1"
    aria-labelledby="menu-thematiques-bouton"
    class="popup-filtre-thematique shadow background--white fr-p-1w"
  >
    <span class="fr-text--lg fr-mb-1w text--normal text--bleu display-block">Thématiques</span>

    test
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const menuThematiqueOuvert = ref<boolean>(false);
  function toggleThematiquesMenu() {
    menuThematiqueOuvert.value = !menuThematiqueOuvert.value;
  }
</script>

<style scoped>
  .popup-filtre-thematique {
    position: absolute;
  }
</style>
