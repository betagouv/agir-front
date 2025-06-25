<template>
  <form @submit.prevent="localiserMonCompteur">
    <fieldset class="fr-fieldset" id="radio-inline" aria-labelledby="radio-inline-legend radio-inline-messages">
      <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id="radio-inline-legend">
        <h2 class="fr-h3 fr-mb-1w">Localiser mon compteur</h2>
      </legend>

      <div class="fr-grid-row fr-grid-row--gutters full-width fr-m-1w jagis-background--bleu-light fr-p-1w">
        <div class="fr-col-12 fr-col-md-6">
          <div class="fr-radio-group">
            <input
              type="radio"
              value="adresse-postale"
              id="adresse-postale"
              name="choix-localisateur"
              v-model="choixLocalisateur"
            />
            <label class="fr-label" for="adresse-postale">
              <span
                >Avec mon adresse postale
                <span class="fr-badge badge--conseille">conseillé</span>
              </span>
            </label>
          </div>
        </div>
        <div class="fr-col-12 fr-col-md-6">
          <div class="fr-radio-group">
            <input
              type="radio"
              value="numero-prm"
              id="numero-prm"
              name="choix-localisateur"
              v-model="choixLocalisateur"
            />
            <label class="fr-label" for="numero-prm">Avec mon numéro de PRM</label>
          </div>
        </div>
      </div>
    </fieldset>

    <template v-if="!affichagePRM">
      <div class="fr-mb-4w fr-input-group" :class="erreurAdresse ? 'fr-input-group--error' : ''">
        <label for="recherche-adresse-input" class="fr-mb-3w">
          Votre adresse <span class="fr-hint-text">Obligatoire</span>
        </label>
        <BarreDeRechercheAdresse
          v-model:adresse="adresse"
          v-model:coordonnees="coordonnees"
          v-model:recherche="recherche"
          @update:coordonnees="
            () => {
              avecAdressePrivee = true;
            }
          "
          :input-options="{
            describedBy: erreurAdresse ? 'adresse-text-input-error-desc-error' : '',
          }"
        />
        <p v-if="erreurAdresse" id="adresse-text-input-error-desc-error" class="fr-error-text" aria-live="assertive">
          {{ erreurAdresse }}
        </p>

        <Callout
          v-if="avecAdressePrivee"
          :button="{
            text: 'Enregistrer',
            onClick: definirAdressePrincipale,
            class: 'fr-btn--icon-left fr-icon-save-fill',
          }"
          :icone-information="false"
          class="fr-mt-3w"
          texte="Pratique : souhaitez-vous enregistrer votre adresse principale pour une prochaine fois&nbsp;?"
        />
      </div>

      <InputText
        v-model="nomDeFamille"
        class="fr-mb-4w"
        required
        name="nom-de-famille"
        label="Nom de famille (du titulaire du contrat électrique)"
        autocomplete="family-name"
        :erreur="erreurNomDeFamille"
      />
    </template>

    <template v-else>
      <InputText
        ref="numeroPrmInput"
        name="prm"
        label="Numéro de PRM"
        description="Il s’agit d’une suite de 14 chiffres qui identifie le logement sur le réseau électrique"
        v-model="numeroPrmValue"
        :erreur="erreurNumeroPrm"
        :maxlength="14"
      />

      <RenseignementAccordeon />
    </template>

    <InputCheckboxUnitaire
      class="fr-mb-4w"
      id="cguWW"
      label="En activant le suivi de ma consommation, je déclare sur l’honneur être titulaire du compte électrique ou être
          mandaté par celui-ci. J’autorise Watt Watchers à recueillir mon historique de consommation d’électricité sur 3
          ans (demi-heure, journée et puissance maximum quotidienne), ainsi qu’à analyser mes consommations."
      v-model="acceptationCguWw"
      :erreur="erreurCgu"
    />

    <button type="submit" class="fr-btn">Localiser mon compteur</button>
  </form>

  <RenseignementModale
    :numero-compteur-input="numeroPrmValue"
    :modale-id="MODALE_ID"
    :connexion-prm-status="connexionPrmStatus"
    :passer-etape-suivante="passerEtapeSuivante"
    :modifier-numero="
      () => {
        affichagePRM = true;
        fermerModale();
        nextTick(() => numeroPrmInput?.focus());
      }
    "
    :retour="fermerModale"
  />
</template>

<script setup lang="ts">
  import { nextTick, onMounted, ref, watch } from 'vue';
  import { ConnexionPRMStatus } from '@/components/custom/Action/Simulation/WattWatchers/connexionPrmStatus';
  import RenseignementAccordeon from '@/components/custom/Action/Simulation/WattWatchers/RenseignementAccordeon.vue';
  import RenseignementModale from '@/components/custom/Action/Simulation/WattWatchers/RenseignementModale.vue';
  import BarreDeRechercheAdresse from '@/components/custom/Form/BarreDeRechercheAdresse.vue';
  import Callout from '@/components/dsfr/Callout.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import InputText, { InputErreur } from '@/components/dsfr/InputText.vue';
  import { validationPrenomOuNom } from '@/components/validations/validationsChampsFormulaire';
  import { useAdressePrincipale } from '@/composables/useAdressePrincipale';
  import { useDsfrModale } from '@/composables/useDsfrModale';
  import { BarreDeRechercheViewModel } from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';
  import { AdresseBarreDeRecherche, Coordonnees } from '@/shell/coordonneesType.js';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    passerEtapeSuivante: () => void;
  }>();

  const MODALE_ID = 'localisation-compteur-modal';
  const { ouvrirModale, fermerModale } = useDsfrModale(MODALE_ID);
  const utilisateur = utilisateurStore().utilisateur;
  const {
    avecAdressePrivee,
    definirAdressePrincipale: definirAdressePrincipaleComposable,
    recupererAdressePourBarreDeRecherche,
  } = useAdressePrincipale();

  const recherche = ref<string>('');
  const coordonnees = ref<Coordonnees>();
  const adresse = ref<AdresseBarreDeRecherche>();

  const nomDeFamille = ref<string>(utilisateur.nom);
  const acceptationCguWw = ref<boolean>(false);
  const numeroPrmInput = ref<InstanceType<typeof InputText>>();
  const numeroPrmValue = ref<string>('');

  const erreurCgu = ref<string>('');
  const erreurAdresse = ref<string>('');
  const erreurNomDeFamille = ref<InputErreur>({
    message: 'Le nom de famille possède des caractères interdits',
    afficher: false,
  });
  const erreurNumeroPrm = ref<InputErreur>({
    message: '',
    afficher: false,
  });

  const connexionPrmStatus = ref<ConnexionPRMStatus>(ConnexionPRMStatus.PAS_COMMENCE);
  const choixLocalisateur = ref<string>('adresse-postale');
  const affichagePRM = ref<boolean>(false);

  watch(choixLocalisateur, nouvelleValeur => {
    affichagePRM.value = nouvelleValeur === 'numero-prm';
  });

  onMounted(async () => {
    await recupererAdressePourBarreDeRecherche(
      utilisateur.id,
      async (barreDeRechercheViewModel: BarreDeRechercheViewModel) => {
        coordonnees.value = barreDeRechercheViewModel.coordonnees;
        recherche.value = barreDeRechercheViewModel.recherche;
      },
    );
  });

  function localiserMonCompteur() {
    if (formulaireEstEnErreur()) return;

    ouvrirModale();
    connexionPrmStatus.value = ConnexionPRMStatus.EN_COURS;

    setTimeout(() => {
      connexionPrmStatus.value = ConnexionPRMStatus.SUCCES;
      numeroPrmValue.value = '283918274';
    }, 1000);
  }

  function definirAdressePrincipale() {
    definirAdressePrincipaleComposable(utilisateur.id, adresse.value, coordonnees.value);
  }

  function resetErreursFormulaires() {
    erreurAdresse.value = '';
    erreurNomDeFamille.value.afficher = false;
    erreurNumeroPrm.value.afficher = false;
    erreurCgu.value = '';
  }

  function formulaireEstEnErreur() {
    let formulaireAUneErreur = false;
    resetErreursFormulaires();

    if (!acceptationCguWw.value) {
      erreurCgu.value = 'Veuillez accepter les conditions générales d’utilisation de Watt Watchers pour continuer';
      formulaireAUneErreur = true;
    }

    if (affichagePRM.value) {
      const estUnNombreValide = /^\d+$/.test(numeroPrmValue.value);
      const longueurCorrecte = numeroPrmValue.value.length === 14;

      if (estUnNombreValide && longueurCorrecte) {
        return formulaireAUneErreur;
      }

      erreurNumeroPrm.value.message = !estUnNombreValide
        ? 'Le numéro de PRM ne doit contenir que des chiffres.'
        : `Le numéro de PRM doit contenir 14 chiffres. Votre numéro comptabilise actuellement ${numeroPrmValue.value.length} chiffres.`;
      erreurNumeroPrm.value.afficher = true;
      formulaireAUneErreur = true;
      return formulaireAUneErreur;
    }

    if (!validationPrenomOuNom(nomDeFamille.value)) {
      erreurNomDeFamille.value.afficher = true;
      formulaireAUneErreur = true;
    }

    if (!recherche.value && !coordonnees.value) {
      erreurAdresse.value = 'Veuillez renseigner une adresse, puis la sélectionner dans le menu déroulant';
      formulaireAUneErreur = true;
    }

    return formulaireAUneErreur;
  }
</script>

<style scoped>
  .badge--conseille {
    background-color: #e4eaff;
    color: #1e0c89;
  }
</style>
