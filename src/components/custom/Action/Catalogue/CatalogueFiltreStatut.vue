<template>
  <CatalogueDropDownMenu id="thematiques" :is-button-menu-item="true">
    <template #bouton-contenu>
      <span>
        <span class="fr-text--lg fr-mb-1w text--normal text--bleu display-block">Statut</span>
        <span class="flex align-items--center" v-html="filtreResume" />
      </span>
    </template>

    <template #menu-contenu>
      <fieldset class="fr-fieldset" id="statut" aria-labelledby="statut-checkboxes-legend">
        <legend class="fr-fieldset__legend--regular fr-fieldset__legend text--bold" id="statut-checkboxes-legend">
          <span class="fr-text--lg fr-mb-0 text--normal text--bleu display-block">Statut</span>
        </legend>
        <div class="fr-fieldset__element">
          <Interrupteur
            :is-in-menu="true"
            v-if="utilisateurStore().estConnecte"
            id="deja_vus"
            label="Consultées"
            @on-change="rechercherParDejaVu"
          />
        </div>

        <div class="fr-fieldset__element">
          <Interrupteur
            :is-in-menu="true"
            v-if="utilisateurStore().estConnecte"
            id="deja_realisees"
            label="Réalisées"
            @on-change="rechercherParDejaRealisees"
          />
        </div>
      </fieldset>
    </template>
  </CatalogueDropDownMenu>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import CatalogueDropDownMenu from '@/components/custom/Action/Catalogue/CatalogueDropDownMenu.vue';
  import Interrupteur from '@/components/dsfr/Interrupteur.vue';
  import { utilisateurStore } from '@/store/utilisateur';

  const emit = defineEmits<{
    (event: 'rechercherParDejaVu', value: boolean): void;
    (event: 'rechercherParDejaRealisees', value: boolean): void;
  }>();

  const dejaVu = ref(false);
  const dejaRealisees = ref(false);

  const rechercherParDejaVu = (checked: boolean) => {
    dejaVu.value = checked;
    emit('rechercherParDejaVu', checked);
  };

  const rechercherParDejaRealisees = (checked: boolean) => {
    dejaRealisees.value = checked;
    emit('rechercherParDejaRealisees', checked);
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
