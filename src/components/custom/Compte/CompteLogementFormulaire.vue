<template>
  <form @submit.prevent="enregistrerLesInformations">
    <h2 class="fr-h4">Ma résidence principale</h2>

    <Alert
      v-if="alerte.isActive"
      :message="alerte.message"
      :titre="alerte.titre"
      :type="alerte.type"
      :a-un-role-alert="true"
      class="fr-col-12 fr-mb-2w"
      ref="alertRef"
    />

    <div class="fr-mb-4w">
      <div v-if="doitAfficherBarreAdresse" class="fr-input-group">
        <label id="recherche-par-adresse-label" class="fr-label fr-mb-2w" for="recherche-adresse-input">
          Où habitez-vous ?
        </label>

        <BarreDeRechercheAdresse
          v-model:adresse="adresseBarreDeRecherche"
          v-model:recherche="recherche"
          label-id="recherche-par-adresse-label"
        />

        <button
          class="fr-btn fr-icon-delete-line fr-btn--icon-left fr-btn--tertiary fr-mt-2w"
          @click.prevent="supprimerMonAdresse()"
        >
          Supprimer mon adresse
        </button>
      </div>

      <template v-else>
        <InputCodePostal
          v-model:code-epci="logementViewModel.codeEpci"
          v-model:code-postal="logementViewModel.codePostal"
          @update:isCodePostalEnErreur="isCodePostalEnErreur = $event"
        />

        <button
          class="fr-btn fr-icon-ball-pen-line fr-btn--icon-left fr-btn--tertiary fr-mt-2w"
          @click.prevent="doitAfficherBarreAdresse = true"
        >
          Renseigner mon adresse
        </button>
      </template>
    </div>

    <CompteFormulaireBoutonEnregistrer />
  </form>
</template>

<script lang="ts" setup>
  import { computed, nextTick, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import CompteFormulaireBoutonEnregistrer from '@/components/custom/Compte/CompteFormulaireBoutonEnregistrer.vue';
  import BarreDeRechercheAdresse from '@/components/custom/Form/BarreDeRechercheAdresse.vue';
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

  const adresseDansLeCompte = ref<AdresseDansLeCompte>(
    new AdresseDansLeCompte(
      logementViewModel.value?.codePostal,
      logementViewModel.value?.commune_utilisee_dans_le_compte,
      logementViewModel.value?.commune_label,
      logementViewModel.value?.rue,
      logementViewModel.value?.numeroRue,
      logementViewModel.value?.coordonnees,
    ),
  );
  const adresseBarreDeRecherche = ref<AdresseBarreDeRecherche>();
  const barreDeRechercheInitialisationViewModel = ref<BarreDeRechercheViewModel>();
  new BarreDeRecherchePresenterImpl(vm => (barreDeRechercheInitialisationViewModel.value = vm)).presente({
    codePostal: adresseDansLeCompte.value.codePostal,
    codeEpci: '',
    commune_utilisee_dans_le_compte: adresseDansLeCompte.value.commune,
    commune_label: adresseDansLeCompte.value.communeLabel,
    coordonnees: {
      latitude: adresseDansLeCompte.value.latitude,
      longitude: adresseDansLeCompte.value.longitude,
    },
    numeroRue: adresseDansLeCompte.value.numeroRue,
    rue: adresseDansLeCompte.value.rue,
  });
  const recherche = ref<string>(barreDeRechercheInitialisationViewModel.value?.recherche ?? '');

  const doitAfficherBarreAdresse = ref<boolean>(adresseDansLeCompte.value.estAdresseComplete());
  const isCodePostalEnErreur = ref(false);
  const codePostalEstValide = computed(() => {
    return !isCodePostalEnErreur.value && logementViewModel.value.codeEpci !== undefined;
  });
  const alertRef = ref<HTMLDivElement>();

  const enregistrerLesInformations = async () => {
    if (!codePostalEstValide.value) {
      afficherAlerte('error', 'Erreur', 'Veuillez renseigner votre commune.');
      await nextTick();
      alertRef.value?.focus();
      return;
    }

    if (
      doitAfficherBarreAdresse.value &&
      recherche.value !== barreDeRechercheInitialisationViewModel.value?.recherche &&
      !adresseBarreDeRecherche.value
    ) {
      afficherAlerte('error', 'Erreur', 'Veuillez renseigner une adresse.');
      await nextTick();
      alertRef.value?.focus();
      return;
    }

    const usecase = new PatcherInformationLogementUsecase(new LogementRepositoryAxios(), sessionAppRawDataStorage);
    usecase
      .execute(utilisateurStore().utilisateur.id, {
        coordonnees: adresseBarreDeRecherche.value?.coordonnees,
        rue: adresseBarreDeRecherche.value?.rue,
        numeroRue: adresseBarreDeRecherche.value?.numeroRue,
        codePostal: adresseBarreDeRecherche.value?.codePostal ?? logementViewModel.value.codePostal,
        codeEpci: adresseBarreDeRecherche.value?.codeEpci ?? logementViewModel.value.codeEpci,
      })
      .then(() => {
        afficherAlerte('success', 'Succès', 'Vos informations ont été correctement mises à jour.');
        if (adresseBarreDeRecherche.value?.rue) {
          utilisateurStore().utilisateur.possedeUneAdresseComplete = true;
        }
      })
      .catch(async () => {
        afficherAlerte('error', 'Erreur', 'Une erreur est survenue. Vérifiez vos informations ou réessayez plus tard.');
      })
      .finally(async () => {
        await nextTick();
        alertRef.value?.focus();
      });
  };

  const supprimerMonAdresse = async () => {
    adresseDansLeCompte.value = new AdresseDansLeCompte(
      logementViewModel.value?.codePostal,
      logementViewModel.value?.commune_utilisee_dans_le_compte,
      logementViewModel.value?.commune_label,
      null!,
      null!,
      null!,
    );
    const usecase = new PatcherInformationLogementUsecase(new LogementRepositoryAxios(), sessionAppRawDataStorage);
    usecase
      .execute(utilisateurStore().utilisateur.id, {
        coordonnees: {
          latitude: null!,
          longitude: null!,
        },
        rue: null!,
        numeroRue: null!,
        codePostal: adresseBarreDeRecherche.value?.codePostal ?? logementViewModel.value.codePostal,
        codeEpci: adresseBarreDeRecherche.value?.codeEpci ?? logementViewModel.value.codeEpci,
      })
      .then(() => {
        utilisateurStore().utilisateur.possedeUneAdresseComplete = false;
        afficherAlerte('success', 'Succès', 'Vos informations ont été correctement mises à jour.');
        doitAfficherBarreAdresse.value = false;
        recherche.value = '';
      })
      .catch(async () => {
        afficherAlerte('error', 'Erreur', 'Une erreur interne est survenue. Veuillez réessayer plus tard.');
      })
      .finally(async () => {
        await nextTick();
        alertRef.value?.focus();
      });
  };
</script>
