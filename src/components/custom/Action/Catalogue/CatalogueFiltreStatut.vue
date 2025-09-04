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
            checked: statut.dejaVu,
          },
          {
            id: 'dejaRealisees',
            label: 'Réalisées',
            checked: statut.dejaRealisees,
          },
          {
            id: 'recommandePourMoi',
            label: 'Recommandée pour moi',
            checked: statut.recommandePourMoi,
          },
        ]"
        @update="onStatusSelected"
      >
        <template #label>
          <span class="fr-text--lg fr-mb-0 text--normal text--bleu display-block">Statut</span>
        </template>
      </InputCheckbox>
    </template>
  </CatalogueDropDownMenu>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import CatalogueDropDownMenu from '@/components/custom/Action/Catalogue/CatalogueDropDownMenu.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import { FiltreStatut, FiltreStatutBuilder } from '@/domaines/actions/filtres';

  const props = defineProps<{
    initialStatut?: FiltreStatut;
  }>();

  const emit = defineEmits<{
    (event: 'updateStatus', value: FiltreStatut): void;
  }>();

  const statut = ref<FiltreStatut>(props.initialStatut || FiltreStatutBuilder.defaut());

  watch(
    () => props.initialStatut,
    newStatut => {
      if (newStatut) {
        statut.value = newStatut;
      }
    },
  );

  const onStatusSelected = (status: string[]) => {
    statut.value = {
      dejaVu: status.includes('dejaVu'),
      dejaRealisees: status.includes('dejaRealisees'),
      recommandePourMoi: status.includes('recommandePourMoi'),
    };
    emit('updateStatus', statut.value);
  };

  const filtreResume = computed(() => {
    const filtresStatut = [
      { checked: statut.value.dejaVu, label: 'Consultées' },
      { checked: statut.value.dejaRealisees, label: 'Réalisées' },
      { checked: statut.value.recommandePourMoi, label: 'Recommandée pour moi' },
    ];

    const filtresSelectionnes = filtresStatut.filter(filtre => filtre.checked).map(filtre => filtre.label);
    return filtresSelectionnes.length ? filtresSelectionnes.join(', ') : 'Toutes';
  });
</script>
