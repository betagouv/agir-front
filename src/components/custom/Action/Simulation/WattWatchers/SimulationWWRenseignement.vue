<template>
  <form @submit.prevent="localiserMonCompteur">
    <ChoixDuLocalisateur v-model:choix-localisateur="choixLocalisateur" />

    <template v-if="!affichagePRM">
      <div :class="erreurAdresse ? 'fr-input-group--error' : ''" class="fr-mb-4w fr-input-group">
        <label class="fr-mb-3w" for="recherche-adresse-input">Mon adresse</label>
        <BarreDeRechercheAdresse
          v-model:adresse="adresse"
          v-model:coordonnees="coordonnees"
          v-model:recherche="recherche"
          :input-options="{
            describedBy: erreurAdresse ? 'adresse-text-input-error-desc-error' : '',
          }"
          @update:coordonnees="
            () => {
              if (coordonnees) {
                avecAdressePrivee = true;
              }
            }
          "
        />
        <p v-if="erreurAdresse" id="adresse-text-input-error-desc-error" aria-live="assertive" class="fr-error-text">
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
    </template>

    <template v-else>
      <InputText
        ref="numeroPrmInput"
        v-model="numeroPrmValue"
        :erreur="erreurNumeroPrm"
        :maxlength="14"
        description="Il s’agit d’une suite de 14 chiffres qui identifie le logement sur le réseau électrique"
        label="Numéro de PRM"
        name="prm"
      />

      <RenseignementAccordeon />
    </template>

    <InputText
      v-model="nomDeFamille"
      :erreur="erreurNomDeFamille"
      autocomplete="family-name"
      class="fr-mb-4w"
      label="Nom de famille (du titulaire du contrat électrique)"
      name="nom-de-famille"
      required
    />

    <InputCheckboxUnitaire
      id="cguWW"
      v-model="acceptationCguWw"
      :erreur="erreurCgu"
      class="fr-mb-4w"
      label="En activant le suivi de ma consommation, je déclare sur l’honneur être titulaire du compte électrique ou être
          mandaté par celui-ci. J’autorise Watt Watchers à recueillir mon historique de consommation d’électricité sur 3
          ans (demi-heure, journée et puissance maximum quotidienne), ainsi qu’à analyser mes consommations."
    />

    <button class="fr-btn" type="submit">Localiser mon compteur</button>
  </form>

  <RenseignementModale
    :commune="adresse?.commune || ''"
    :connexion-prm-status="connexionPrmStatus"
    :modale-id="MODALE_ID"
    :modifier-numero="
      () => {
        affichagePRM = true;
        fermerModale();
        nextTick(() => numeroPrmInput?.focus());
      }
    "
    :nom="nomDeFamille"
    :numero-compteur-input="numeroPrmValue"
    :passer-etape-suivante="passerEtapeSuivante"
    :retour="fermerModale"
  />
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, ref, watch } from 'vue';
  import ChoixDuLocalisateur from '@/components/custom/Action/Simulation/WattWatchers/ChoixDuLocalisateur.vue';
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
  import { InscriptionPresenterImpl } from '@/domaines/simulationWattWatchers/adapters/inscription.presenter.impl';
  import { WattWatchersRepositoryAxios } from '@/domaines/simulationWattWatchers/adapters/wattWatchers.repository.axios';
  import { InscriptionParAdresseUsecase } from '@/domaines/simulationWattWatchers/inscriptionParAdresse.usecase';
  import { InscriptionParPRMUsecase } from '@/domaines/simulationWattWatchers/inscriptionParPRM.usecase';
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

  const nomDeFamille = ref<string>(utilisateur.nom ?? '');
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
  const choixLocalisateur = ref<string>();
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

    if (choixLocalisateur.value === 'numero-prm') {
      const usecase = new InscriptionParPRMUsecase(new WattWatchersRepositoryAxios());
      usecase.execute(
        utilisateurStore().utilisateur.id,
        numeroPrmValue.value,
        nomDeFamille.value,
        new InscriptionPresenterImpl(
          (): void => {
            ouvrirModale();
            connexionPrmStatus.value = ConnexionPRMStatus.EN_COURS;

            setTimeout(() => {
              connexionPrmStatus.value = ConnexionPRMStatus.SUCCES;
            }, 1000);
          },
          (): void => {
            //Todo: erreur lors de l'inscription
          },
        ),
      );
    } else {
      const usecase = new InscriptionParAdresseUsecase(new WattWatchersRepositoryAxios());
      usecase.execute(
        utilisateurStore().utilisateur.id,
        nomDeFamille.value,
        {
          commune_label: adresse.value!.commune,
          numeroRue: adresse.value!.numeroRue,
          rue: adresse.value!.rue,
          codePostal: adresse.value!.codePostal,
          codeEpci: adresse.value!.codeEpci,
          coordonnees: adresse.value!.coordonnees,
          commune_utilisee_dans_le_compte: '',
        },
        new InscriptionPresenterImpl(
          (): void => {
            ouvrirModale();
            connexionPrmStatus.value = ConnexionPRMStatus.EN_COURS;

            setTimeout(() => {
              connexionPrmStatus.value = ConnexionPRMStatus.SUCCES;
            }, 1000);
          },
          (): void => {
            //Todo: erreur lors de l'inscription
          },
        ),
      );
    }
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
