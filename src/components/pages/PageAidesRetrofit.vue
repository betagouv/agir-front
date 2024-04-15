<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane :page-courante="titrePage" />
    <AidesResultat
      :is-loading="isLoading"
      titre-categorie-aide="Prime au retrofit"
      :simulation-aides-view-model="simulationAidesRetrofitViewModel"
      :titre="titrePage"
      :sous-titre="sousTitre"
    >
      <template v-slot:asideResultatAides>
        <AsideAideRetrofit
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
  import AsideAideRetrofit from '@/components/custom/Aides/AidesRetrofitAside.vue';
  import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';
  import SimulerAideRetrofitUsecase from '@/aides/simulerAideRetrofit.usecase';
  import { SimulerAideRetrofitRepositoryAxios } from '@/aides/adapters/simulerAideRetrofit.repository.axios';
  import { SimulerAideRetrofitPresenterImpl } from '@/aides/adapters/simulerAideRetrofit.presenter.impl';
  import { RecupererInformationLogementUseCase } from '@/logement/recupererInformationLogement.usecase';
  import { LogementRepositoryAxios } from '@/logement/adapters/logement.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { LogementPresenterImpl } from '@/logement/adapters/logement.presenter.impl';
  import {
    ChargerProfileUtilisateurUsecase,
    ProfileUtilisateurRepositoryAxiosImpl,
  } from '@/profileUtilisateur/chargerProfileUtilisateur.usecase';
  import { ProfileUtilisateurPresenterImpl } from '@/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';

  const titrePage = 'Vos aides - Retrofit';
  const sousTitre = 'Vous pouvez bénéficier des aides Retrofit suivantes :';
  const simulationAidesRetrofitViewModel = ref<SimulationAideResultatViewModel[] | null>(null);
  const isLoading = ref<boolean>(false);
  const codePostal = ref<string>('');
  const commune = ref<string>('');
  const revenuFiscal = ref<number | null>(0);
  const nombreDePartsFiscales = ref<number>(0);

  const simulerAideRetrofit = () => {
    isLoading.value = true;
    const useCase = new SimulerAideRetrofitUsecase(new SimulerAideRetrofitRepositoryAxios());
    useCase.execute(
      codePostal.value,
      revenuFiscal.value?.toString() ?? '',
      new SimulerAideRetrofitPresenterImpl((viewModel: SimulationAideResultatViewModel[]) => {
        simulationAidesRetrofitViewModel.value = viewModel;
        isLoading.value = false;
      }),
    );
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

  simulerAideRetrofit();
</script>
