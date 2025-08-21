<template>
  <CatalogueDropDownMenu id="thematiques">
    <template #bouton-contenu>
      <span>
        <span class="fr-text--lg fr-mb-1w text--normal text--bleu display-block">Thématiques</span>
        <span class="flex align-items--center" v-html="filtreResume" />
      </span>
    </template>

    <template #menu-contenu>
      <InputCheckbox id="thematiques" :options="filtresInternes" @update="updateThematiques">
        <template #label>
          <span class="fr-text--lg fr-mb-0 text--normal text--bleu display-block">Thématiques</span>
        </template>
      </InputCheckbox>
    </template>
  </CatalogueDropDownMenu>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import CatalogueDropDownMenu from '@/components/custom/Action/Catalogue/CatalogueDropDownMenu.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';

  const props = defineProps<{ filtres: { id: string; label: string; checked: boolean }[] }>();

  const emit = defineEmits<{ (event: 'updateThematiques', value: string[]): void }>();

  const filtresInternes = ref(props.filtres);

  watch(
    () => props.filtres,
    nouveauxFiltres => {
      filtresInternes.value = nouveauxFiltres;
    },
    { deep: true },
  );

  const updateThematiques = (thematiques: string[]) => {
    filtresInternes.value.forEach(filtre => {
      filtre.checked = thematiques.includes(filtre.id);
    });

    emit('updateThematiques', thematiques);
  };

  const filtreResume = computed(() => {
    const filtresSelectionnes = filtresInternes.value.filter(filtre => filtre.checked);

    if (filtresSelectionnes.length === 0 || filtresSelectionnes.length === filtresInternes.value.length) {
      return 'Toutes';
    } else if (filtresSelectionnes.length === 1) {
      return filtresSelectionnes[0].label;
    } else {
      return `${filtresSelectionnes[0].label} <span class="fr-tag fr-tag--custom-bleu fr-tag--sm fr-ml-1w">+${filtresSelectionnes.length - 1}</span>`;
    }
  });
</script>
