<template>
  <form
    @submit.prevent
    class="fr-search-bar position--relative"
    id="header-search"
    role="search"
    @blur="cacherDialogue"
  >
    <label class="fr-label" for="recherche-adresse-input" v-if="!labelId">Renseignez votre adresse</label>
    <div class="fr-input-wrap fr-icon-search-line full-width">
      <input
        type="search"
        role="combobox"
        placeholder="Rechercher l'adresse de votre choix..."
        autocomplete="off"
        id="recherche-adresse-input"
        name="recherche-adresse-input"
        class="fr-input"
        :aria-activedescendant="indexSelectionne >= 0 ? `option-${indexSelectionne}` : ''"
        aria-autocomplete="list"
        aria-controls="adresse-menu"
        :aria-expanded="dialogOuverte"
        :aria-labelledby="labelId"
        v-model="recherche"
        @input="chargerAdresses"
        @focus="ouvrirDialogueSiNecessaire"
        @blur="cacherDialogue"
        @keydown="naviguerListe"
      />
    </div>

    <dialog class="adresseDialogue shadow" :open="dialogOuverte" ref="dialogRef">
      <ul
        v-if="adressesAffichees"
        id="adresse-menu"
        role="listbox"
        class="list-style-none fr-p-0 fr-m-0"
        @mouseleave="indexSelectionne = -1"
      >
        <li
          role="option"
          class="fr-p-1w"
          :id="`option-${index}`"
          v-for="(adresse, index) in adressesAffichees"
          :class="indexSelectionne === index ? 'adresseSelectionee' : ''"
          :key="adresse.nom"
          :aria-selected="indexSelectionne === index"
          @click="envoyerCoordonnees(adresse)"
          @mouseenter="indexSelectionne = index"
        >
          <span class="fr-hidden-sm" v-text="adresse.label" />
          <div class="fr-hidden fr-unhidden-sm">
            <div class="flex flex-space-between align-items--center">
              <span class="text--semi-bold">{{ adresse.nom }}</span>
              <span>{{ adresse.ville }} ({{ adresse.contexte }})</span>
            </div>
          </div>
        </li>
      </ul>
    </dialog>
  </form>
</template>

<script setup lang="ts">
  import axios from 'redaxios';
  import { ref } from 'vue';
  import { useDebouncedFn } from '@/composables/useDebounce';
  import { Coordonnees } from '@/shell/coordonneesType';

  defineProps<{
    labelId?: string;
  }>();

  type FeatureApiModel = {
    geometry: { coordinates: number[] };
    properties: { label: string; name: string; city: string; context: string; postcode: string };
  };
  type Adresse = {
    label: string;
    nom: string;
    ville: string;
    contexte: string;
    codePostal: string;
    coordonnees: Coordonnees;
  };

  const coordonnees = defineModel<Coordonnees>();
  const adressesAffichees = ref<Adresse[]>([]);
  const indexSelectionne = ref<number>(-1);
  const dialogOuverte = ref<boolean>(false);
  const dialogRef = ref<HTMLDialogElement>();
  const recherche = ref<string>('');
  const DELAI_DEBOUNCE = 500;

  const { debounced: chargerAdresses } = useDebouncedFn(() => {
    chargerAdressesSimilaires(recherche.value);
  }, DELAI_DEBOUNCE);

  const chargerAdressesSimilaires = (adresse: string) => {
    adressesAffichees.value = [];
    indexSelectionne.value = -1;

    if (adresse.length <= 3) {
      cacherDialogue();
      return;
    }

    const adresseEncodee = encodeURIComponent(adresse).replaceAll('%20', '+');
    const url = `https://api-adresse.data.gouv.fr/search/?q=${adresseEncodee}&limit=8`;
    axios.get(url).then(response => {
      adressesAffichees.value = response.data.features.map(
        (feature: FeatureApiModel): Adresse => ({
          label: feature.properties.label,
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
    indexSelectionne.value = -1;
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

  function naviguerListe(event: KeyboardEvent) {
    if (!adressesAffichees.value.length) return;

    switch (event.key) {
      case 'ArrowDown':
        dialogOuverte.value = true;
        indexSelectionne.value = (indexSelectionne.value + 1) % adressesAffichees.value.length;
        event.preventDefault();
        break;
      case 'ArrowUp':
        dialogOuverte.value = true;
        indexSelectionne.value =
          (indexSelectionne.value - 1 + adressesAffichees.value.length) % adressesAffichees.value.length;
        event.preventDefault();
        break;
      case 'Enter':
        if (indexSelectionne.value >= 0) {
          envoyerCoordonnees(adressesAffichees.value[indexSelectionne.value]);
          event.preventDefault();
        }
        break;
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

  .adresseSelectionee {
    background-color: #0a76f6;
    color: white;
  }
</style>
