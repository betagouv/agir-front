<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane :page-courante="titrePage" />
    <AidesResultat
      :is-loading="isLoading"
      titre-categorie-aide="Acheter un vélo neuf"
      :simulation-aides-view-model="simulationAidesVeloViewModel"
      :titre="titrePage"
      :sous-titre="sousTitre"
    >
      <template v-slot:asideResultatAides>
        <div class="background--white border border-radius--md fr-p-3w fr-mb-3w">
          <h2 class="fr-h5">Paramètres</h2>
          <form class="fr-mb-1w">
            <div class="fr-grid-row align-items--end">
              <InputNumberVertical
                v-model="prixDuVelo"
                :default-value="prixDuVelo"
                :min-value="0"
                name="prix-du-velo"
                label="Prix du velo"
                size="md"
              />
              <button class="fr-btn fr-btn--secondary" @click.prevent="simulerAideVelo">Valider</button>
            </div>
          </form>
          <span class="fr-text--sm fr-text--bold">À titre indicatif, voici quelques prix moyens</span>
          <ul class="fr-text--sm fr-m-0 fr-mt-1v">
            <li class="fr-p-0">
              Vélo mécanique :
              <button class="text--underline" @click="updatePrixDuVelo(250)">250 €</button>
            </li>
            <li class="fr-p-0">
              Vélo pliant standard :
              <button class="text--underline" @click="updatePrixDuVelo(500)">500 €</button>
            </li>
            <li class="fr-p-0">
              Vélo électrique standard :
              <button class="text--underline" @click="updatePrixDuVelo(2000)">2 000 €</button>
            </li>
            <li class="fr-p-0">
              Vélo cargo électrique :
              <button class="text--underline" @click="updatePrixDuVelo(7000)">7 000 €</button>
            </li>
          </ul>
        </div>
        <AsideAideVelo
          :code-postal="codePostal"
          :ville="commune"
          :revenu-fiscal="revenuFiscal"
          :nombre-de-parts-fiscales="nombreDePartsFiscales"
        />
      </template>
    </AidesResultat>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import AidesResultat from '@/components/custom/Aides/AidesResultat.vue';
  import AsideAideVelo from '@/components/custom/Aides/AidesVeloAside.vue';
  import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';
  import SimulerAideVeloUsecase from '@/aides/simulerAideVelo.usecase';
  import { SimulerAideVeloRepositoryAxios } from '@/aides/adapters/simulerAideVelo.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { SimulerAideVeloPresenterImpl } from '@/aides/adapters/simulerAideVelo.presenter.impl';
  import InputNumberVertical from '@/components/custom/InputNumberVertical.vue';
  import { RecupererInformationLogementUseCase } from '@/logement/recupererInformationLogement.usecase';
  import { LogementRepositoryAxios } from '@/logement/adapters/logement.repository.axios';
  import { LogementPresenterImpl } from '@/logement/adapters/logement.presenter.impl';
  import {
    ChargerProfileUtilisateurUsecase,
    ProfileUtilisateurRepositoryAxiosImpl,
  } from '@/profileUtilisateur/chargerProfileUtilisateur.usecase';
  import { ProfileUtilisateurPresenterImpl } from '@/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';

  const titrePage = 'Acheter un vélo';
  const sousTitre = 'Voici les aides vélo disponibles (en fonction de votre situation)';
  const simulationAidesVeloViewModel = ref<SimulationAideResultatViewModel[] | null>(null);
  const codePostal = ref<string>('');
  const commune = ref<string>('');
  const revenuFiscal = ref<number | null>(0);
  const nombreDePartsFiscales = ref<number>(0);
  const prixDuVelo = ref<number>(1000);
  const isLoading = ref<boolean>(false);

  function mapResultatAidesVelo(viewModels: SimulationAideResultatViewModel[]) {
    simulationAidesVeloViewModel.value = viewModels;
    isLoading.value = false;
  }

  const updatePrixDuVelo = (prix: number) => {
    prixDuVelo.value = prix;
  };

  const simulerAideVeloPresenterImpl = new SimulerAideVeloPresenterImpl(mapResultatAidesVelo);
  const simulerAideVeloRepositoryAxios = new SimulerAideVeloRepositoryAxios();
  const simulerAideVelo = () => {
    isLoading.value = true;
    const useCase = new SimulerAideVeloUsecase(simulerAideVeloRepositoryAxios);
    useCase.execute(prixDuVelo.value, utilisateurStore().utilisateur.id, simulerAideVeloPresenterImpl);
  };

  const informationLogementUseCase = new RecupererInformationLogementUseCase(new LogementRepositoryAxios());
  informationLogementUseCase.execute(
    utilisateurStore().utilisateur.id,
    new LogementPresenterImpl(viewModel => {
      codePostal.value = viewModel.codePostal;
      commune.value = viewModel.commune;
    }),
  );

  const usecase = new ChargerProfileUtilisateurUsecase(new ProfileUtilisateurRepositoryAxiosImpl());
  const idUtilisateur = utilisateurStore().utilisateur.id;
  usecase.execute(
    idUtilisateur,
    new ProfileUtilisateurPresenterImpl(viewModel => {
      revenuFiscal.value = viewModel.revenuFiscal;
      nombreDePartsFiscales.value = viewModel.nombreDePartsFiscales;
    }),
  );

  simulerAideVelo();
</script>
