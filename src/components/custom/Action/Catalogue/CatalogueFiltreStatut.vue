<template>
  <CatalogueDropDownMenu id="thematiques" :is-button-menu-item="true">
    <template #bouton-contenu>
      <span>
        <span class="fr-text--lg fr-mb-1w text--normal text--bleu display-block">Statut</span>
        <span class="flex align-items--center" v-html="filtreResume" />
      </span>
    </template>

    <template #menu-contenu>
      <InputCheckbox
        id="thematiques"
        :is-in-menu="true"
        :options="[
          {
            id: 'dejaVu',
            label: 'Consultées',
            checked: dejaVu,
          },
          {
            id: 'dejaRealisees',
            label: 'Réalisées',
            checked: dejaRealisees,
          },
        ]"
        @update="onStatusSelected"
      >
        <template #label>
          <span class="fr-text--lg fr-mb-0 text--normal text--bleu display-block">Thématiques</span>
        </template>
      </InputCheckbox>
    </template>
  </CatalogueDropDownMenu>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import CatalogueDropDownMenu from '@/components/custom/Action/Catalogue/CatalogueDropDownMenu.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';

  const emit = defineEmits<{
    (event: 'updateStatus', value: { dejaVu: boolean; dejaRealisees: boolean }): void;
  }>();

  const dejaVu = ref(false);
  const dejaRealisees = ref(false);

  const onStatusSelected = (status: string[]) => {
    const newDejaVu = status.includes('dejaVu');
    const newDejaRealisees = status.includes('dejaRealisees');

    dejaVu.value = newDejaVu;
    dejaRealisees.value = newDejaRealisees;

    emit('updateStatus', {
      dejaVu: newDejaVu,
      dejaRealisees: newDejaRealisees,
    });
  };

  const filtreResume = computed(() => {
    const filtresStatut = [
      { checked: dejaVu.value, label: 'Consultées' },
      { checked: dejaRealisees.value, label: 'Réalisées' },
    ];

    const filtresSelectionnes = filtresStatut.filter(filtre => filtre.checked).map(filtre => filtre.label);
    return filtresSelectionnes.length ? filtresSelectionnes.join(', ') : 'Toutes';
  });
</script>
