<template>
  <CatalogueDropDownMenu id="thematiques">
    <template #bouton-contenu>
      <span>
        <span class="fr-text--lg fr-mb-1w text--normal text--bleu display-block">Thématiques</span>
        <span class="flex align-items--center" v-html="filtreResume" />
      </span>
    </template>

    <template #menu-contenu>
      <InputCheckbox id="thematiques" :options="filtres" @update="updateThematiques">
        <template #label>
          <span class="fr-text--lg fr-mb-0 text--normal text--bleu display-block">Thématiques</span>
        </template>
      </InputCheckbox>
    </template>
  </CatalogueDropDownMenu>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import CatalogueDropDownMenu from '@/components/custom/Action/Catalogue/CatalogueDropDownMenu.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';

  const props = defineProps<{ filtres: { id: string; label: string; checked: boolean }[] }>();

  const emit = defineEmits<{ (event: 'updateThematiques', value: string[]): void }>();
  const updateThematiques = (thematiques: string[]) => emit('updateThematiques', thematiques);

  const filtreResume = computed(() => {
    const filtresSelectionne = props.filtres.filter(filtre => filtre.checked);

    if (filtresSelectionne.length === 0 || filtresSelectionne.length === props.filtres.length) {
      return 'Toutes';
    } else if (filtresSelectionne.length === 1) {
      return filtresSelectionne[0].label;
    } else {
      return `${filtresSelectionne[0].label} <span class="fr-tag fr-tag--custom-bleu fr-tag--sm fr-ml-1w">+${filtresSelectionne.length - 1}</span>`;
    }
  });
</script>
