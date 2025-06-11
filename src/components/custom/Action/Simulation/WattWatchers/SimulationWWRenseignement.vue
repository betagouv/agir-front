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
          autofocus
          label="Numéro de PRM"
          description="Il s’agit d’une suite de 14 chiffres qui identifie le logement sur le réseau électrique"
          v-model="numeroCompteurInput"
          name="prm"
        />

        <section class="accordeon-prm">
          <Accordeon name-id="accordeon-prm" class="fr-mb-3w">
            <template #titre>
              <span class="fr-icon-information-line fr-pr-1w" aria-hidden="true" />
              Où trouver le numéro de PRM&nbsp;?
            </template>

            <template #contenu>
              <div class="fr-grid-row fr-grid-row--gutters">
                <section class="fr-col-12 fr-col-md-6 flex fr-pr-2w">
                  <img src="/facture-linky-exemple.webp" class="fr-pt-1w fr-mr-2w" alt="" />
                  <div>
                    <h4 class="fr-mb-1w">Sur votre facture</h4>
                    <p>Vous trouverez votre numéro de PRM sur votre facture</p>
                  </div>
                </section>

                <section class="fr-col-12 fr-col-md-6 flex fr-pr-2w left-border">
                  <img src="/compteur-linky-exemple.webp" class="fr-pt-1w fr-mr-2w" alt="" />
                  <div>
                    <h4 class="fr-mb-1w">Sur votre compteur Linky</h4>
                    <p>
                      Faire défiler les affichages du compteur (appui sur la touche +) jusqu’à lire la valeur du “numéro
                      de PRM”
                    </p>
                  </div>
                </section>
              </div>
            </template>
          </Accordeon>
        </section>
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
    :numero-compteur-input="numeroCompteurInput"
    :modale-id="MODALE_ID"
    :connexion-prm-status="connexionPrmStatus"
  />
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { ConnexionPRMStatus } from '@/components/custom/Action/Simulation/WattWatchers/connexionPrmStatus';
  import RenseignementModale from '@/components/custom/Action/Simulation/WattWatchers/RenseignementModale.vue';
  import BarreDeRechercheAdresse from '@/components/custom/Form/BarreDeRechercheAdresse.vue';
  import EnregistreurAdressePrincipale from '@/components/custom/Form/EnregistreurAdressePrincipale.vue';
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import InputText, { InputErreur } from '@/components/dsfr/InputText.vue';
  import { validationPrenomOuNom } from '@/components/validations/validationsChampsFormulaire';
  import {
    BarreDeRecherchePresenterImpl,
    BarreDeRechercheViewModel,
  } from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { RecupererAdressePourBarreDeRechercheUsecase } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
  import { AdresseBarreDeRecherche, Coordonnees } from '@/shell/coordonneesType.js';
  import { utilisateurStore } from '@/store/utilisateur';

  const utilisateur = utilisateurStore().utilisateur;
  const MODALE_ID = 'localisation-compteur-modal';

  const recherche = ref<string>('');
  const coordonnees = ref<Coordonnees>();
  const adresse = ref<AdresseBarreDeRecherche>();
  const nomDeFamille = ref<string>(utilisateur.nom);
  const erreurCgu = ref<string>('');
  const erreurAdresse = ref<string>('');
  const erreurNomDeFamille = ref<InputErreur>({
    message: 'Le nom de famille possède des caractères interdits',
    afficher: false,
  });
  const acceptationCguWw = ref<boolean>(false);

  const avecAdressePrivee = ref<boolean>(false);
  const connexionPrmStatus = ref<ConnexionPRMStatus>(ConnexionPRMStatus.PAS_COMMENCE);
  const affichagePRM = ref<boolean>(false);
  const numeroCompteurInput = ref<string>('');

  const logementRepository = new LogementRepositoryAxios();
  const recupererAdressePourBarreDeRechercheUsecase = new RecupererAdressePourBarreDeRechercheUsecase(
    logementRepository,
  );

  onMounted(async () => {
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

    const modalElement = document.getElementById(MODALE_ID);
    window.dsfr(modalElement).modal.disclose();

    connexionPrmStatus.value = ConnexionPRMStatus.EN_COURS;

    setTimeout(() => {
      connexionPrmStatus.value = ConnexionPRMStatus.SUCCES;
      numeroCompteurInput.value = '283918274';
    }, 1000);
  }

  function formulaireEstEnErreur() {
    let formulaireAUneErreur = false;

    if (!acceptationCguWw.value) {
      erreurCgu.value = 'Veuillez accepter les conditions générales d’utilisation de Watt Watchers pour continuer';
      formulaireAUneErreur = true;
    }

    if (affichagePRM.value) {
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
  .accordeon-prm img {
    height: 7.5rem;
  }

  .accordeon-prm h4 {
    font-size: 1.1rem;
  }

  .left-border {
    position: relative;
    padding-left: 1rem;
  }

  .left-border::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    height: 50%;
    width: 1px;
    background-color: #e0e0e0;
    transform: translate(-50%, -50%);
  }
</style>
