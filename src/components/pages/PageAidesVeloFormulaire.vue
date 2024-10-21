<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Acheter un vélo" />
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
              :defaultSelectValue="logementViewModel.commune_utilisee_dans_le_compte"
              @update:selectedCommune="logementViewModel.commune_utilisee_dans_le_compte = $event"
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
                label="En tant qu’habitant d’Angers Loire Métropole, êtes-vous abonnés du TER Pays de la Loire ?"
                description="Sont éligibles Tutti illimité ou combiné / Métrocéane mensuel / annuel Loire-Atlantique et Sarthe / mensuel réseaux Mayenne et Vendée (hors scolaire)"
                v-model="abonnementTransport"
              />
            </div>
            <button class="fr-mt-2w fr-btn" :disabled="isFormulaireEnErreur">Valider</button>
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
  import { computed, onMounted, ref } from 'vue';
  import AidesVeloFormulaireAside from '@/components/custom/Aides/AidesInfosUtilisationDesDonnees.vue';
  import CompteFormulaireRevenuFiscal from '@/components/custom/Compte/CompteFormulaireRevenuFiscal.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
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
  import { MettreAJourProfileUtilisateurUsecase } from '@/domaines/profileUtilisateur/mettreAJourProfileUtilisateurUsecase';
  import router from '@/router';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
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
      await enregistrerInformationsLogementUsecase.execute(utilisateurStore().utilisateur.id, {
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
