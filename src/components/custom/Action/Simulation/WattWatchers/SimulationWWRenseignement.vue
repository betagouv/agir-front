<template>
  <section>
    <h2 class="fr-h3 fr-mb-1w">Quelle est votre adresse ?</h2>
    <p class="fr-mb-3w">Nous en avons besoin pour localiser votre compteur</p>

    <form @submit.prevent="localiserMonCompteur">
      <div class="fr-mb-4w fr-input-group" :class="erreurAdresse ? 'fr-input-group--error' : ''">
        <label for="adresse" class="fr-mb-2w">
          Votre adresse <span class="fr-hint-text" v-if="!affichagePRM">Obligatoire</span>
        </label>
        <BarreDeRechercheAdresse
          class="fr-mt-1w"
          label-id="adresse"
          v-model:adresse="adresse"
          v-model:coordonnees="coordonnees"
          v-model:recherche="recherche"
          :input-options="{
            disabled: affichagePRM,
            describedBy: erreurAdresse ? 'adresse-text-input-error-desc-error' : '',
          }"
        />
        <p v-if="erreurAdresse" id="adresse-text-input-error-desc-error" class="fr-error-text" aria-live="assertive">
          {{ erreurAdresse }}
        </p>

        <EnregistreurAdressePrincipale
          v-if="adresse && coordonnees && avecAdressePrivee"
          :adresse="adresse"
          :coordonnees="coordonnees"
          @enregistrementNouvelleAdresse="avecAdressePrivee = false"
        />
      </div>

      <InputText
        v-model="nomDeFamille"
        class="fr-mb-4w"
        required
        name="nom-de-famille"
        label="Nom de famille (du titulaire du contrat électrique)"
        autocomplete="family-name"
        :description="!affichagePRM ? 'Obligatoire' : ''"
        :disabled="affichagePRM"
        :erreur="erreurNomDeFamille"
      />

      <button
        type="button"
        class="fr-btn fr-btn--tertiary fr-btn--icon-left fr-mb-3w"
        :class="affichagePRM ? 'fr-icon-eye-off-fill' : 'fr-icon-settings-5-fill'"
        @click="toggleAffichagePRM"
        v-text="
          !affichagePRM ? 'Je préfère renseigner mon numéro de compteur' : 'Masquer le champ du numéro de compteur'
        "
      />

      <template v-if="affichagePRM">
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
  </section>

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
  import { nextTick, onMounted, ref } from 'vue';
  import { ConnexionPRMStatus } from '@/components/custom/Action/Simulation/WattWatchers/connexionPrmStatus';
  import RenseignementAccordeon from '@/components/custom/Action/Simulation/WattWatchers/RenseignementAccordeon.vue';
  import RenseignementModale from '@/components/custom/Action/Simulation/WattWatchers/RenseignementModale.vue';
  import BarreDeRechercheAdresse from '@/components/custom/Form/BarreDeRechercheAdresse.vue';
  import EnregistreurAdressePrincipale from '@/components/custom/Form/EnregistreurAdressePrincipale.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import InputText, { InputErreur } from '@/components/dsfr/InputText.vue';
  import { validationPrenomOuNom } from '@/components/validations/validationsChampsFormulaire';
  import { useDsfrModale } from '@/composables/useDsfrModale';
  import {
    BarreDeRecherchePresenterImpl,
    BarreDeRechercheViewModel,
  } from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { RecupererAdressePourBarreDeRechercheUsecase } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
  import { AdresseBarreDeRecherche, Coordonnees } from '@/shell/coordonneesType.js';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    passerEtapeSuivante: () => void;
  }>();

  const MODALE_ID = 'localisation-compteur-modal';
  const { ouvrirModale, fermerModale } = useDsfrModale(MODALE_ID);
  const utilisateur = utilisateurStore().utilisateur;

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
  const avecAdressePrivee = ref<boolean>(false);
  const affichagePRM = ref<boolean>(false);

  onMounted(async () => {
    const recupererAdressePourBarreDeRechercheUsecase = new RecupererAdressePourBarreDeRechercheUsecase(
      new LogementRepositoryAxios(),
    );

    await recupererAdressePourBarreDeRechercheUsecase.execute(
      utilisateur.id,
      new BarreDeRecherchePresenterImpl(async (barreDeRechercheViewModel: BarreDeRechercheViewModel) => {
        coordonnees.value = barreDeRechercheViewModel.coordonnees;
        recherche.value = barreDeRechercheViewModel.recherche;
      }),
    );
  });

  function toggleAffichagePRM() {
    affichagePRM.value = !affichagePRM.value;
  }

  function localiserMonCompteur() {
    if (formulaireEstEnErreur()) return;

    ouvrirModale();
    connexionPrmStatus.value = ConnexionPRMStatus.EN_COURS;

    setTimeout(() => {
      connexionPrmStatus.value = ConnexionPRMStatus.SUCCES;
      numeroPrmValue.value = '283918274';
    }, 1000);
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
