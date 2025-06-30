<template>
  <div>
    <h1 class="fr-h2">Mon logement</h1>
    <div id="scroll-to-alerte">
      <Alert
        v-if="alerte.isActive"
        :message="alerte.message"
        :titre="alerte.titre"
        :type="alerte.type"
        class="fr-col-12 fr-mb-2w"
      />
    </div>
    <form @submit.prevent="enregistrerLesInformations">
      <div class="fr-mb-4w">
        <div v-if="doitAfficherBarreAdresse" class="fr-input-group">
          <label class="fr-label fr-mb-2w" id="recherche-par-adresse-label" for="recherche-adresse-input"
            >Où habitez-vous ?</label
          >
          <BarreDeRechercheAdresse
            label-id="recherche-par-adresse-label"
            v-model:adresse="adresseBarreDeRecherche"
            v-model:recherche="recherche"
          />
        </div>

        <InputCodePostal
          v-else
          v-model:code-epci="logementViewModel.codeEpci"
          v-model:code-postal="logementViewModel.codePostal"
          @update:isCodePostalEnErreur="isCodePostalEnErreur = $event"
        />
      </div>

      <fieldset class="fr-fieldset" aria-describedby="combien-dans-logement-legend">
        <legend id="combien-dans-logement-legend" class="fr-fieldset__legend fr-fieldset__legend--regular">
          Combien êtes-vous dans votre logement (vous inclus) ?
        </legend>
        <div class="fr-fieldset__element fr-fieldset__element--inline">
          <InputNumberHorizontal
            v-model="logementViewModel.adultes"
            :default-value="logementViewModel.adultes"
            :min-value="1"
            class="fr-mr-8w"
            label="Adulte(s)"
            name="nombre-adulte"
          />
        </div>
        <div class="fr-fieldset__element fr-fieldset__element--inline">
          <InputNumberHorizontal
            v-model="logementViewModel.enfants"
            :default-value="logementViewModel.enfants"
            :min-value="0"
            label="Enfant(s) - moins de 18 ans"
            name="nombre-enfant"
          />
        </div>
      </fieldset>

      <BoutonsRadio
        v-model="logementViewModel.residence.valeur"
        :default-value="logementViewModel.residence.valeur"
        :options="logementViewModel.residence.reponsesPossibles"
        class="fr-mb-2w fr-col-12"
        col="fr-col"
        legende="Votre résidence principale est ..."
        legende-size="m"
        name="residence"
        orientation="horizontal"
      />
      <BoutonsRadio
        v-model="logementViewModel.proprietaire.valeur"
        :default-value="logementViewModel.proprietaire.valeur"
        :options="logementViewModel.proprietaire.reponsesPossibles"
        class="fr-mb-2w fr-col-12"
        col="fr-col"
        legende="Vous êtes propriétaire de votre logement ?"
        legende-size="m"
        name="proprietaire"
        orientation="horizontal"
      />
      <BoutonsRadio
        v-model="logementViewModel.superficie.valeur"
        :default-value="logementViewModel.superficie.valeur"
        :options="logementViewModel.superficie.reponsesPossibles"
        class="fr-mb-4w fr-col-12"
        col="fr-col"
        legende="Quelle en est la superficie ?"
        legende-size="m"
        name="superficie"
        orientation="horizontal"
      />
      <BoutonsRadio
        v-model="logementViewModel.plusDeQuinzeAns.valeur"
        :default-value="logementViewModel.plusDeQuinzeAns.valeur"
        :options="logementViewModel.plusDeQuinzeAns.reponsesPossibles"
        class="fr-mb-4w fr-col-12"
        col="fr-col"
        legende="Votre logement a-t-il plus de 15 ans ?"
        legende-size="m"
        name="anciennete"
        orientation="horizontal"
      />
      <div class="fr-col-12">
        <DPE v-model="logementViewModel.dpe.valeur" :default-value="logementViewModel.dpe.valeur" />
      </div>
      <CarteInfo>
        <p class="fr-text--bold">
          <span aria-hidden="true" class="fr-icon-question-line"></span>
          Qu'est-ce qu'un DPE ?
        </p>
        <p class="fr-m-0">
          Le DPE, c'est le <strong>Diagnostic de Performance Énergétique de votre logement</strong>. Il mesure d'un côté
          l'énergie nécessaire pour y maintenir une température standard, et de l'autre l'empreinte climat associée. Le
          DPE est exprimé comme une note de A (très bon) à G (passoire thermique). Vous pouvez obtenir une estimation de
          votre DPE en 2 clics avec le service
          <a href="https://particulier.gorenove.fr" rel="noreferrer" target="_blank">Go Renov</a>.
        </p>
      </CarteInfo>

      <CompteFormulaireBoutonEnregistrer />
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import CompteFormulaireBoutonEnregistrer from '@/components/custom/Compte/CompteFormulaireBoutonEnregistrer.vue';
  import DPE from '@/components/custom/DPE.vue';
  import BarreDeRechercheAdresse from '@/components/custom/Form/BarreDeRechercheAdresse.vue';
  import BoutonsRadio from '@/components/custom/Form/BoutonsRadio.vue';
  import InputNumberHorizontal from '@/components/custom/Form/InputNumberHorizontal.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import {
    BarreDeRecherchePresenterImpl,
    BarreDeRechercheViewModel,
  } from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { PatcherInformationLogementUsecase } from '@/domaines/logement/patcherInformationLogement.usecase';
  import { LogementViewModel } from '@/domaines/logement/ports/logement.presenter';
  import { AdresseDansLeCompte } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';
  import { sessionAppRawDataStorage } from '@/shell/appRawDataStorage';
  import { AdresseBarreDeRecherche } from '@/shell/coordonneesType';
  import { utilisateurStore } from '@/store/utilisateur';

  const logementViewModel = defineModel<LogementViewModel>('logementViewModel', {
    type: Object,
    required: true,
  });

  const { alerte, afficherAlerte } = useAlerte();

  const adresseDansLeCompte = new AdresseDansLeCompte(
    logementViewModel.value?.codePostal,
    logementViewModel.value?.commune_utilisee_dans_le_compte,
    logementViewModel.value?.commune_label,
    logementViewModel.value?.rue,
    logementViewModel.value?.numeroRue,
    logementViewModel.value?.coordonnees,
  );
  const barreDeRechercheInitialisationViewModel = ref<BarreDeRechercheViewModel>();
  const adresseBarreDeRecherche = ref<AdresseBarreDeRecherche>();
  new BarreDeRecherchePresenterImpl(vm => (barreDeRechercheInitialisationViewModel.value = vm)).presente(
    adresseDansLeCompte,
  );
  const recherche = ref<string>(barreDeRechercheInitialisationViewModel.value?.recherche ?? '');

  const doitAfficherBarreAdresse = computed(() => adresseDansLeCompte.estAdresseComplete());
  const isCodePostalEnErreur = ref(false);
  const codePostalEstValide = computed(() => {
    return !isCodePostalEnErreur.value && logementViewModel.value.codeEpci !== undefined;
  });

  const enregistrerLesInformations = () => {
    if (!codePostalEstValide.value) {
      afficherAlerte('error', 'Erreur', 'Veuillez renseigner votre commune.');
      return;
    }

    if (
      doitAfficherBarreAdresse.value &&
      recherche.value !== barreDeRechercheInitialisationViewModel.value?.recherche &&
      !adresseBarreDeRecherche.value
    ) {
      afficherAlerte('error', 'Erreur', 'Veuillez renseigner une adresse.');
      return;
    }

    const usecase = new PatcherInformationLogementUsecase(new LogementRepositoryAxios(), sessionAppRawDataStorage);
    usecase
      .execute(utilisateurStore().utilisateur.id, {
        adultes: logementViewModel.value.adultes,
        enfants: logementViewModel.value.enfants,
        residence: logementViewModel.value.residence.valeur,
        superficie: logementViewModel.value.superficie.valeur,
        proprietaire: logementViewModel.value.proprietaire.valeur,
        plusDeQuinzeAns: logementViewModel.value.plusDeQuinzeAns.valeur,
        dpe: logementViewModel.value.dpe.valeur,
        coordonnees: adresseBarreDeRecherche.value?.coordonnees,
        rue: adresseBarreDeRecherche.value?.rue,
        numeroRue: adresseBarreDeRecherche.value?.numeroRue,
        codePostal: adresseBarreDeRecherche.value?.codePostal ?? logementViewModel.value.codePostal,
        codeEpci: adresseBarreDeRecherche.value?.codeEpci ?? logementViewModel.value.codeEpci,
      })
      .then(() => {
        afficherAlerte('success', 'Succès', 'Vos informations ont été correctement mises à jour.');
      })
      .catch(() => {
        afficherAlerte('error', 'Erreur', 'Une erreur interne est survenue. Veuillez réessayer plus tard.');
      });

    const alertElement = document.getElementById('scroll-to-alerte');
    if (alertElement) {
      alertElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
</script>
