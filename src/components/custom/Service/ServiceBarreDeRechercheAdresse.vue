<template>
  <form
    @submit.prevent
    class="fr-search-bar position--relative"
    id="header-search"
    role="search"
    @blur="cacherDialogue"
  >
    <label class="fr-label" for="recherche-adresse-input">Recherche</label>
    <div class="fr-input-wrap fr-icon-search-line full-width">
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
          class="fr-p-1w"
          v-for="adresse in adressesAffichees"
          :key="adresse.nom"
          aria-selected="false"
          @click="envoyerCoordonnees(adresse)"
        >
          <div class="flex flex-space-between align-items--center">
            <span class="text--semi-bold">{{ adresse.nom }}</span>
            <span>{{ adresse.ville }} ({{ adresse.contexte }})</span>
          </div>
        </li>
        <!--        mettre aria selected sur hover-->
      </ul>
    </dialog>
  </form>
</template>

<script setup lang="ts">
  import axios from 'redaxios';
  import { ref } from 'vue';
  import { useDebouncedFn } from '@/composables/useDebounce';
  import { Coordonnees } from '@/shell/coordonneesType';

  type FeatureApiModel = {
    geometry: { coordinates: number[] };
    properties: { name: string; city: string; context: string; postcode: string };
  };
  type Adresse = { nom: string; ville: string; contexte: string; codePostal: string; coordonnees: Coordonnees };

  const coordonnees = defineModel<Coordonnees>();
  const adressesAffichees = ref<Adresse[]>([]);
  const recherche = ref<string>('');
  const dialogOuverte = ref<boolean>(false);
  const dialogRef = ref<HTMLDialogElement>();

  const { debounced: chargerAdresses } = useDebouncedFn(() => {
    chargerAdressesSimilaires(recherche.value);
  }, 500);

  const chargerAdressesSimilaires = (adresse: string) => {
    adressesAffichees.value = [];
    if (adresse.length <= 3) {
      cacherDialogue();
      return;
    }

    const adresseEncodee = encodeURIComponent(adresse).replace('%20', '+');
    const url = `https://api-adresse.data.gouv.fr/search/?q=${adresseEncodee}&limit=8`;
    axios.get(url).then(response => {
      adressesAffichees.value = response.data.features.map(
        (feature: FeatureApiModel): Adresse => ({
          nom: feature.properties.name,
          ville: feature.properties.city,
          contexte: feature.properties.context,
          codePostal: feature.properties.postcode,
          coordonnees: {
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
          },
        }),
      );
    });

    dialogOuverte.value = true;
  };

  function envoyerCoordonnees(adresse: Adresse) {
    recherche.value = `${adresse.nom}, ${adresse.ville} (${adresse.codePostal})`;
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
    top: 100%;
  }

  .adresseDialogue li {
    cursor: pointer;
  }

  .adresseDialogue li:hover {
    background-color: #0a76f6;
    color: white;
  }
</style>
