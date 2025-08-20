<template>
  <button
    type="button"
    id="menu-thematiques-bouton"
    aria-haspopup="true"
    :aria-expanded="menuThematiqueOuvert"
    aria-controls="menu-thematiques"
    @click="toggleThematiquesMenu"
    class="position--relative text--left full-width flex flex-space-between align-items--center fr-p-2w"
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
    class="popup-filtre-thematique shadow background--white fr-p-2w flex"
  >
    <InputCheckbox id="thematiques" :options="filtres" @update="updateThematiques">
      <template #label>
        <span class="fr-text--lg fr-mb-0 text--normal text--bleu display-block">Thématiques</span>
      </template>
    </InputCheckbox>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';

  defineProps<{ filtres: { id: string; label: string; checked: boolean }[] }>();

  const menuThematiqueOuvert = ref<boolean>(false);
  function toggleThematiquesMenu() {
    menuThematiqueOuvert.value = !menuThematiqueOuvert.value;
  }

  const emit = defineEmits<{
    (event: 'updateThematiques', value: string[]): void;
  }>();

  const updateThematiques = (thematiques: string[]) => emit('updateThematiques', thematiques);
</script>

<style scoped>
  .popup-filtre-thematique {
    position: absolute;
    z-index: 501;
    width: inherit;
  }
</style>
