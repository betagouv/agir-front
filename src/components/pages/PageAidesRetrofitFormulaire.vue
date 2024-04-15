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
              :defaultValue="logementViewModel.codePostal"
              :defaultSelectValue="logementViewModel.commune"
              @update:selectedCommune="logementViewModel.commune = $event"
            />
            <h3 class="fr-h4 fr-mt-3w">Quelle est votre tranche de revenus ?</h3>
            <InputTrancheDeRevenu
              v-model:nombre-de-parts="nombreDePartsFiscales"
              v-model:revenu-fiscal-de-reference="revenuFiscal"
            />
            <button class="fr-mt-2w fr-btn">Valider</button>
          </form>
        </div>
      </div>
      <div class="fr-col-lg-4">
        <AidesVeloFormulaireAside />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { MettreAJourProfileUtilisateurUsecase } from '@/profileUtilisateur/mettreAJourProfileUtilisateurUsecase';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import InputTrancheDeRevenu from '@/components/custom/InputTrancheDeRevenu.vue';
  import router from '@/router';
  import AidesVeloFormulaireAside from '@/components/custom/Aides/AidesInfosUtilisationDesDonnees.vue';

  import { RouteAidesName } from '@/router/aides/routeAidesName';
  import {
    ChargerProfileUtilisateurUsecase,
    ProfileUtilisateurRepositoryAxiosImpl,
  } from '@/profileUtilisateur/chargerProfileUtilisateur.usecase';
  import { LogementViewModel } from '@/logement/ports/logement.presenter';
  import { RecupererInformationLogementUseCase } from '@/logement/recupererInformationLogement.usecase';
  import { LogementRepositoryAxios } from '@/logement/adapters/logement.repository.axios';
  import { LogementPresenterImpl } from '@/logement/adapters/logement.presenter.impl';
  import {
    ProfileUtilisateurPresenterImpl,
    ProfileUtilisateurViewModel,
  } from '@/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
  import { EnregistrerInformationsLogementUsecase } from '@/logement/enregistrerInformationLogement.usecase';

  const store = utilisateurStore();
  const revenuFiscal = ref<number | null>(0);
  const nombreDePartsFiscales = ref(0);
  const logementViewModel = ref<LogementViewModel | null>(null);
  const abonnementTransport = ref(false);

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
      const donneeAMettreAjour: ProfileUtilisateurViewModel = {
        nom: utilisateur.nom,
        id: utilisateur.id,
        mail: utilisateur.mail,
        prenom: utilisateur.prenom,
        abonnementTransport: abonnementTransport.value,
        revenuFiscal: revenuFiscal.value,
        nombreDePartsFiscales: nombreDePartsFiscales.value,
      };
      await usecase.execute(donneeAMettreAjour);

      const enregistrerInformationsLogementUsecase = new EnregistrerInformationsLogementUsecase(
        new LogementRepositoryAxios(),
      );
      enregistrerInformationsLogementUsecase.execute(utilisateurStore().utilisateur.id, {
        adultes: logementViewModel.value!.adultes,
        enfants: logementViewModel.value!.enfants,
        codePostal: logementViewModel.value!.codePostal,
        commune: logementViewModel.value!.commune,
        residence: logementViewModel.value!.residence.valeur,
        superficie: logementViewModel.value!.superficie.valeur,
        proprietaire: logementViewModel.value!.proprietaire.valeur,
        modeDeChauffage: logementViewModel.value!.modeDeChauffage.valeur,
        plusDeQuinzeAns: logementViewModel.value!.plusDeQuinzeAns.valeur,
        dpe: logementViewModel.value!.dpe.valeur,
      });

      await router.push({ name: RouteAidesName.VELO });
    }
  }
</script>
