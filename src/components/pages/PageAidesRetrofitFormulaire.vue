<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Prime au retrofit" />
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-lg-8">
        <div class="background--white border border-radius--md fr-p-3w fr-mb-4w">
          <h2 class="fr-h3">Quelques questions nécessaires à l’estimation des aides</h2>
          <form @submit.prevent="mettreAJourLesInfos">
            <h3 class="fr-h4">Où habitez-vous ?</h3>
            <InputCodePostal
              v-if="logementViewModel"
              v-model="logementViewModel.codePostal"
              :defaultSelectValue="logementViewModel.commune_utilisee_dans_le_compte"
              :defaultValue="logementViewModel.codePostal"
              @update:selectedCommune="logementViewModel.commune_utilisee_dans_le_compte = $event"
            />
            <h3 class="fr-h4 fr-mt-3w">Quel est votre revenu ?</h3>
            <CompteFormulaireRevenuFiscal
              v-model:nombre-de-parts="nombreDePartsFiscales"
              v-model:revenu-fiscal-de-reference="revenuFiscal"
              @update:isRFREnErreur="value => (isRFREnErreur = value)"
            />

            <button :disabled="isRFREnErreur" class="fr-mt-2w fr-btn">Valider</button>
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
  import { onMounted, ref } from 'vue';
  import AidesVeloFormulaireAside from '@/components/custom/Aides/AidesInfosUtilisationDesDonnees.vue';
  import CompteFormulaireRevenuFiscal from '@/components/custom/Compte/CompteFormulaireRevenuFiscal.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { LogementPresenterImpl } from '@/domaines/logement/adapters/logement.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { EnregistrerInformationsLogementUsecase } from '@/domaines/logement/enregistrerInformationLogement.usecase';
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
  import { utilisateurStore } from '@/store/utilisateur';

  const store = utilisateurStore();
  const revenuFiscal = ref<number | null>(0);
  const nombreDePartsFiscales = ref(0);
  const logementViewModel = ref<LogementViewModel | null>(null);
  const abonnementTransport = ref(false);
  const isRFREnErreur = ref(false);
  const profileUtilisateur = ref<ProfileUtilisateurViewModel>();

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
        anneeNaissance: profileUtilisateur.value!.anneeNaissance,
        nomPrenomModifiables: profileUtilisateur.value!.nomPrenomModifiables,
      };
      await usecase.execute(donneeAMettreAjour);

      const enregistrerInformationsLogementUsecase = new EnregistrerInformationsLogementUsecase(
        new LogementRepositoryAxios(),
      );
      enregistrerInformationsLogementUsecase.execute(utilisateurStore().utilisateur.id, {
        adultes: logementViewModel.value!.adultes,
        enfants: logementViewModel.value!.enfants,
        codePostal: logementViewModel.value!.codePostal,
        commune_utilisee_dans_le_compte: logementViewModel.value!.commune_utilisee_dans_le_compte,
        commune_label: '',
        residence: logementViewModel.value!.residence.valeur,
        superficie: logementViewModel.value!.superficie.valeur,
        proprietaire: logementViewModel.value!.proprietaire.valeur,
        plusDeQuinzeAns: logementViewModel.value!.plusDeQuinzeAns.valeur,
        dpe: logementViewModel.value!.dpe.valeur,
      });

      await router.push({ name: RouteAidesName.VELO });
    }
  }
</script>
