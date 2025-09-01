<template>
  <div id="header-search" class="fr-search-bar position--relative" @blur="cacherDialogue">
    <label v-if="!labelId" class="fr-label" for="recherche-adresse-input">Renseignez votre adresse</label>
    <div class="fr-input-wrap fr-icon-search-line full-width">
      <input
        id="recherche-adresse-input"
        v-model="recherche"
        :aria-activedescendant="indexSelectionne >= 0 ? `option-${indexSelectionne}` : ''"
        :aria-expanded="dialogOuverte"
        :aria-labelledby="labelId"
        :disabled="inputOptions?.disabled"
        aria-autocomplete="list"
        aria-controls="adresse-menu"
        autocomplete="off"
        class="fr-input"
        name="recherche-adresse-input"
        placeholder="Rechercher l'adresse de votre choix..."
        role="combobox"
        type="search"
        v-bind="erreurApi ? { 'aria-describedby': 'text-input-error-desc-error' } : {}"
        @blur="cacherDialogue"
        @focus="ouvrirDialogueSiNecessaire"
        @input="chargerAdresses"
        @keydown="naviguerListe"
      />
    </div>
    <dialog ref="dialogRef" :open="dialogOuverte" class="adresseDialogue shadow">
      <ul
        v-if="adressesAffichees"
        id="adresse-menu"
        class="list-style-none fr-p-0 fr-m-0"
        role="listbox"
        @mouseleave="indexSelectionne = -1"
      >
        <li
          v-for="(adresse, index) in adressesAffichees"
          :id="`option-${index}`"
          :key="adresse.numeroEtRue"
          :aria-selected="indexSelectionne === index"
          :class="indexSelectionne === index ? 'adresseSelectionee' : ''"
          class="fr-p-1w"
          role="option"
          @click="envoyerCoordonnees(adresse)"
          @mouseenter="indexSelectionne = index"
        >
          <span class="fr-hidden-sm" v-text="adresse.numeroEtRueEtCodePostal" />
          <div class="fr-hidden fr-unhidden-sm">
            <div class="flex flex-space-between">
              <span class="text--semi-bold defined-max-width">{{ adresse.numeroEtRue }}</span>
              <span class="defined-max-width text--right">{{ adresse.commune }} ({{ adresse.departement }})</span>
            </div>
          </div>
        </li>
      </ul>
    </dialog>
  </div>
  <p v-if="erreurApi" id="text-input-error-desc-error" class="fr-error-text" v-text="erreurApi" />
</template>

<script lang="ts" setup>
  import axios from 'redaxios';
  import { ref } from 'vue';
  import { useDebouncedFn } from '@/composables/useDebounce';
  import { HistoriqueAdresseRepositoryAxios } from '@/domaines/adresses/adapters/historiqueAdresse.repository.axios';
  import { AjouterHistoriqueAdresseUsecase } from '@/domaines/adresses/ajouterHistoriqueAdresse.usecase';
  import { AdresseBarreDeRecherche, Coordonnees } from '@/shell/coordonneesType';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    labelId?: string;
    inputOptions?: {
      disabled?: boolean;
      describedBy?: string;
    };
    onCoordonneesEnvoyees?: () => void;
    enregistrerAdresseDansHistorique?: boolean;
  }>();

  type FeatureApiModel = {
    geometry: { coordinates: number[] };
    properties: {
      label: string;
      name: string;
      city: string;
      context: string;
      postcode: string;
      housenumber: string;
      street: string;
      citycode: string;
    };
  };

  const adresseRef = defineModel<AdresseBarreDeRecherche>('adresse');
  const coordonnees = defineModel<Coordonnees>('coordonnees');
  const recherche = defineModel<string>('recherche');
  const adressesAffichees = ref<AdresseBarreDeRecherche[]>([]);
  const indexSelectionne = ref<number>(-1);
  const dialogOuverte = ref<boolean>(false);
  const dialogRef = ref<HTMLDialogElement>();
  const DELAI_DEBOUNCE = 500;
  const erreurApi = ref<string>('');

  const { debounced: chargerAdresses } = useDebouncedFn(() => {
    chargerAdressesSimilaires(recherche.value ?? '');
  }, DELAI_DEBOUNCE);

  const chargerAdressesSimilaires = (adresse: string) => {
    erreurApi.value = '';
    adressesAffichees.value = [];
    indexSelectionne.value = -1;
    coordonnees.value = undefined;
    adresseRef.value = undefined;

    if (adresse.length <= 3) {
      cacherDialogue();
      return;
    }

    const adresseEncodee = encodeURIComponent(adresse).replaceAll('%20', '+');
    const url = `https://data.geopf.fr/geocodage/search/?q=${adresseEncodee}&limit=8&index=address&type=housenumber&autocomplete=1`;
    axios
      .get(url)
      .then(response => {
        adressesAffichees.value = response.data.features.map(
          (feature: FeatureApiModel): AdresseBarreDeRecherche => ({
            numeroEtRueEtCodePostal: feature.properties.label,
            numeroEtRue: feature.properties.name,
            commune: feature.properties.city,
            departement: feature.properties.context,
            codePostal: feature.properties.postcode,
            codeEpci: feature.properties.citycode,
            coordonnees: {
              latitude: feature.geometry.coordinates[1],
              longitude: feature.geometry.coordinates[0],
            },
            numeroRue: feature.properties.housenumber,
            rue: feature.properties.street,
          }),
        );
      })
      .catch(() => {
        erreurApi.value = 'Le service de géocodage est indisponible pour le moment. Veuillez réessayer.';
      });

    dialogOuverte.value = true;
  };

  function envoyerCoordonnees(adresse: AdresseBarreDeRecherche) {
    indexSelectionne.value = -1;
    recherche.value = `${adresse.numeroEtRue}, ${adresse.commune} (${adresse.codePostal})`;
    coordonnees.value = adresse.coordonnees;
    adresseRef.value = adresse;
    dialogOuverte.value = false;

    if (props.enregistrerAdresseDansHistorique) {
      const ajouterAdresseRecente = new AjouterHistoriqueAdresseUsecase(new HistoriqueAdresseRepositoryAxios());
      ajouterAdresseRecente.execute(utilisateurStore().utilisateur.id, {
        id: '',
        code_commune: adresse.codeEpci,
        commmune: adresse.commune,
        code_postal: adresse.codePostal,
        numero_rue: adresse.numeroRue,
        rue: adresse.rue,
        longitude: adresse.coordonnees.longitude,
        latitude: adresse.coordonnees.latitude,
        date_creation: '',
      });
    }

    if (props.onCoordonneesEnvoyees) {
      props.onCoordonneesEnvoyees();
    }
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
        if (indexSelectionne.value === -1) {
          envoyerCoordonnees(adressesAffichees.value[0]);
        } else if (indexSelectionne.value >= 0) {
          envoyerCoordonnees(adressesAffichees.value[indexSelectionne.value]);
        }
        event.preventDefault();
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

  .defined-max-width {
    max-width: 70%;
    min-width: 40%;
  }
</style>
