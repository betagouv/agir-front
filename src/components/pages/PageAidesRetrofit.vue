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
          :ville="utilisateurStore().utilisateur.commune"
          :revenu-fiscal="utilisateurStore().utilisateur.revenuFiscal!"
          :nombre-de-parts-fiscales="utilisateurStore().utilisateur.nombreDePartsFiscales!"
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
  import { utilisateurStore } from '@/store/utilisateur';

  const titrePage = 'Vos aides - Retrofit';
  const sousTitre = 'Vous pouvez bénéficier des aides Retrofit suivantes :';
  const simulationAidesRetrofitViewModel = ref<SimulationAideResultatViewModel[] | null>(null);
  const isLoading = ref<boolean>(false);
  const codePostal = ref<string>(utilisateurStore().utilisateur.codePostal!);

  const simulerAideRetrofit = () => {
    isLoading.value = true;
    const useCase = new SimulerAideRetrofitUsecase(new SimulerAideRetrofitRepositoryAxios());
    useCase.execute(
      utilisateurStore().utilisateur.codePostal,
      utilisateurStore().utilisateur.revenuFiscal !== null
        ? utilisateurStore().utilisateur.revenuFiscal!.toString()
        : '',
      new SimulerAideRetrofitPresenterImpl((viewModel: SimulationAideResultatViewModel[]) => {
        simulationAidesRetrofitViewModel.value = viewModel;
        isLoading.value = false;
      })
    );
  };

  simulerAideRetrofit();
</script>
