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
            <h3 class="fr-h4 fr-mt-3w">Quel est votre revenu ?</h3>
            <div class="fr-grid-row fr-grid-row--gutters fr-col-12 fr-pb-4w">
              <div class="fr-col-6">
                <div class="fr-input-group">
                  <label class="fr-label" for="text-input-rfr"> Nombre de parts fiscales de votre foyer </label>
                  <input
                    required
                    class="fr-input fr-col-4"
                    name="revenu-fiscal"
                    id="text-input-rfr"
                    inputmode="numeric"
                    type="number"
                    v-model="nombreDePartsFiscales"
                    step=".5"
                    min="1"
                  />
                </div>
              </div>
              <div class="fr-col-6">
                <InputText
                  name="revenu"
                  @update:model-value="value => (revenuFiscal = Number(value))"
                  :model-value="revenuFiscal?.toString() || ''"
                  label="Revenu fiscal de référence de votre foyer"
                />
              </div>
            </div>

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
  import AidesVeloFormulaireAside from '@/components/custom/Aides/AidesInfosUtilisationDesDonnees.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import InputText from '@/components/dsfr/InputText.vue';
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
