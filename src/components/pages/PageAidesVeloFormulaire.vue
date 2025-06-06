<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Acheter un vélo" />
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-lg-8">
        <div class="background--white border fr-p-3w fr-mb-4w">
          <h2 class="fr-h3">Quelques questions nécessaires à l’estimation des aides</h2>
          <form @submit.prevent="mettreAJourLesInfos">
            <h3 class="fr-h4">Où habitez-vous ?</h3>
            <InputCodePostal
              v-if="logementViewModel"
              v-model:code-postal="logementViewModel.codePostal"
              v-model:code-epci="logementViewModel.codeEpci"
              @update:isCodePostalEnErreur="isCodePostalEnErreur = $event"
            />
            <h3 class="fr-h4 fr-mt-3w">Quel est votre revenu ?</h3>
            <CompteFormulaireRevenuFiscal
              v-model:nombre-de-parts="nombreDePartsFiscales"
              v-model:revenu-fiscal-de-reference="revenuFiscal"
              @update:isRFREnErreur="value => (isRFREnErreur = value)"
            />
            <div v-if="afficherAbonnement">
              <h3 class="fr-h4">Abonnements et cartes</h3>
              <InputCheckboxUnitaire
                id="abonnement-transport"
                v-model="abonnementTransport"
                description="Sont éligibles Tutti illimité ou combiné / Métrocéane mensuel / annuel Loire-Atlantique et Sarthe / mensuel réseaux Mayenne et Vendée (hors scolaire)"
                label="En tant qu’habitant d’Angers Loire Métropole, êtes-vous abonnés du TER Pays de la Loire ?"
              />
            </div>
            <button :disabled="isFormulaireEnErreur" class="fr-mt-2w fr-btn">Valider</button>
          </form>
        </div>
      </div>
      <div class="fr-col-lg-4">
        <AidesVeloFormulaireAside />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import AidesVeloFormulaireAside from '@/components/custom/Aides/AidesInfosUtilisationDesDonnees.vue';
  import CompteFormulaireRevenuFiscal from '@/components/custom/Compte/CompteFormulaireRevenuFiscal.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { LogementPresenterImpl } from '@/domaines/logement/adapters/logement.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { PatcherInformationLogementUsecase } from '@/domaines/logement/patcherInformationLogement.usecase';
  import { LogementViewModel } from '@/domaines/logement/ports/logement.presenter';
  import { RecupererInformationLogementUseCase } from '@/domaines/logement/recupererInformationLogement.usecase';
  import {
    ProfileUtilisateurPresenterImpl,
    ProfileUtilisateurViewModel,
  } from '@/domaines/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
  import {
    ChargerProfileUtilisateurUsecase,
    ProfileUtilisateurRepositoryAxiosImpl,
  } from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';
  import {
    MettreAJourProfileUtilisateurUsecase,
    ProfileAMettreAJourInput,
  } from '@/domaines/profileUtilisateur/mettreAJourProfileUtilisateurUsecase';
  import router from '@/router';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
  import { sessionAppRawDataStorage } from '@/shell/appRawDataStorage';
  import { utilisateurStore } from '@/store/utilisateur';

  const store = utilisateurStore();
  const revenuFiscal = ref<number | null>(0);
  const nombreDePartsFiscales = ref(0);
  const abonnementTransport = ref(false);
  const logementViewModel = ref<LogementViewModel | null>(null);
  const isRFREnErreur = ref(false);
  const isCodePostalEnErreur = ref(false);
  const isFormulaireEnErreur = computed(() => {
    return isCodePostalEnErreur.value || isRFREnErreur.value;
  });
  const afficherAbonnement = computed(() => {
    return (
      logementViewModel.value?.codePostal.length === 5 &&
      (logementViewModel.value?.codePostal.startsWith('49') ||
        logementViewModel.value?.codePostal.startsWith('44') ||
        logementViewModel.value?.codePostal.startsWith('53') ||
        logementViewModel.value?.codePostal.startsWith('72') ||
        logementViewModel.value?.codePostal.startsWith('85'))
    );
  });

  const profileUtilisateurViewModel = ref<ProfileUtilisateurViewModel>({
    id: '',
    mail: '',
    abonnementTransport: false,
    dateNaissance: { jour: '', mois: '', annee: '' },
    nom: '',
    prenom: '',
    pseudo: '',
    revenuFiscal: 0,
    nombreDePartsFiscales: 0,
    nomPrenomModifiables: false,
  });

  onMounted(() => {
    const informationLogementUseCase = new RecupererInformationLogementUseCase(new LogementRepositoryAxios());
    informationLogementUseCase.execute(
      utilisateurStore().utilisateur.id,
      new LogementPresenterImpl(viewModel => {
        logementViewModel.value = viewModel;
      }),
    );

    const usecase = new ChargerProfileUtilisateurUsecase(new ProfileUtilisateurRepositoryAxiosImpl());
    const idUtilisateur = store.utilisateur.id;
    usecase.execute(
      idUtilisateur,
      new ProfileUtilisateurPresenterImpl(viewModel => {
        revenuFiscal.value = viewModel.revenuFiscal;
        nombreDePartsFiscales.value = viewModel.nombreDePartsFiscales;
        abonnementTransport.value = viewModel.abonnementTransport;
        profileUtilisateurViewModel.value = viewModel;
      }),
    );
  });

  async function mettreAJourLesInfos() {
    {
      const usecase = new MettreAJourProfileUtilisateurUsecase(
        new ProfileUtilisateurRepositoryAxiosImpl(),
        new SessionRepositoryStore(),
      );
      const utilisateur = utilisateurStore().utilisateur;
      const donneeAMettreAjour: ProfileAMettreAJourInput = {
        nom: utilisateur.nom,
        id: utilisateur.id,
        prenom: utilisateur.prenom,
        abonnementTransport: abonnementTransport.value,
        revenuFiscal: revenuFiscal.value,
        nombreDePartsFiscales: nombreDePartsFiscales.value,
        pseudo: utilisateur.pseudo,
        dateNaissance: profileUtilisateurViewModel.value.dateNaissance,
        nomPrenomModifiables: profileUtilisateurViewModel.value.nomPrenomModifiables,
      };
      await usecase.execute(donneeAMettreAjour);

      const patcherInformationsLogementUsecase = new PatcherInformationLogementUsecase(
        new LogementRepositoryAxios(),
        sessionAppRawDataStorage,
      );
      await patcherInformationsLogementUsecase.execute(utilisateurStore().utilisateur.id, {
        codePostal: logementViewModel.value?.codePostal,
        codeEpci: logementViewModel.value?.codeEpci,
      });

      await router.push({ name: RouteAidesName.VELO });
    }
  }
</script>
