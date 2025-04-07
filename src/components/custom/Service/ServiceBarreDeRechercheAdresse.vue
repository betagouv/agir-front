<template>
  <div class="fr-search-bar position--relative" id="header-search" role="search" @blur="cacherDialogue">
    <label class="fr-label" for="recherche-adresse-input">Recherche</label>
    <div class="fr-input-wrap fr-icon-search-line">
      <input
        role="combobox"
        autocomplete="off"
        aria-controls="adresse-menu"
        aria-activedescendant="mettre-descendant-hovered"
        aria-autocomplete="list"
        :aria-expanded="dialogOuverte"
        v-model="recherche"
        @input="chargerAdresses"
        @focus="ouvrirDialogueSiNecessaire"
        @blur="cacherDialogue"
        class="fr-input"
        placeholder="Rechercher"
        type="search"
        id="recherche-adresse-input"
        name="recherche-adresse-input"
      />
    </div>

    <dialog class="adresseDialogue shadow" :open="dialogOuverte" ref="dialogRef">
      <ul v-if="adressesAffichees" id="adresse-menu" role="listbox" class="list-style-none fr-p-0 fr-m-0">
        <li
          role="option"
          class="fr-p-1w text--semi-bold"
          v-for="adresse in adressesAffichees"
          v-text="adresse.label"
          :key="adresse.label"
          aria-selected="false"
          @click="envoyerCoordonnees(adresse)"
        />
        <!--        mettre aria selected sur hover-->
      </ul>
    </dialog>
  </div>
</template>

<script setup lang="ts">
  import axios from 'redaxios';
  import { ref } from 'vue';
  import { useDebouncedFn } from '@/composables/useDebounce';
  import { Coordonnees } from '@/shell/coordonneesType';

  type FeatureApiModel = {
    geometry: { coordinates: number[] };
    properties: { label: string };
  };
  type Adresse = { label: string; coordonnees: Coordonnees };

  const coordonnees = defineModel<Coordonnees>();
  const adressesAffichees = ref<Adresse[]>([]);
  const recherche = ref<string>('');
  const dialogOuverte = ref<boolean>(false);
  const dialogRef = ref<HTMLDialogElement>();

  const { debounced: chargerAdresses } = useDebouncedFn(() => {
    chargerAdressesSimilaires(recherche.value);
  }, 500);

  const chargerAdressesSimilaires = (adresse: string) => {
    if (adresse.length <= 3) {
      adressesAffichees.value = [];
      cacherDialogue();
      return;
    }

    const adresseEncodee = encodeURIComponent(adresse).replace('%20', '+');
    const url = `https://api-adresse.data.gouv.fr/search/?q=${adresseEncodee}&limit=8`;
    axios.get(url).then(response => {
      adressesAffichees.value = response.data.features.map((feature: FeatureApiModel) => ({
        label: feature.properties.label,
        coordonnees: {
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
        },
      }));
    });

    dialogOuverte.value = true;
  };

  function envoyerCoordonnees(adresse: Adresse) {
    recherche.value = adresse.label;
    adressesAffichees.value = [];
    coordonnees.value = {
      latitude: adresse.coordonnees.latitude,
      longitude: adresse.coordonnees.longitude,
    };
    dialogOuverte.value = false;
  }

  function cacherDialogue() {
    // Pour ne pas clash avec le @click sur le li
    requestAnimationFrame(() => {
      const active = document.activeElement;
      const clickedInsideDialog = dialogRef.value?.contains(active);

      if (!clickedInsideDialog) {
        dialogOuverte.value = false;
      }
    });
  }

  function ouvrirDialogueSiNecessaire() {
    if (adressesAffichees.value.length > 0) {
      dialogOuverte.value = true;
    }
  }
</script>

<style>
  .adresseDialogue {
    width: 100%;
    z-index: 5;
    overflow: visible;
    padding: 0;
    border: none;
  }

  .adresseDialogue li {
    cursor: pointer;
  }

  .adresseDialogue li:hover {
    background-color: #0a76f6;
    color: white;
  }
</style>
