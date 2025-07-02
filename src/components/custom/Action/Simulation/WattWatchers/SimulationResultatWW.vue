<template>
  <h2 class="fr-h3">Ma consommation</h2>

  <div v-if="resultatWWViewModel" class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-md-6 fr-col-12">
      <div class="shadow full-height">
        <ResultatWW
          :detail-consommations="resultatWWViewModel.detailConsommations"
          :total-consommation="resultatWWViewModel.totalConsommation"
        />
      </div>
    </div>
    <div class="fr-col-md-6 fr-col-12">
      <div class="shadow full-height">
        <ProgressionEconomie
          :economie-actuelle="resultatWWViewModel.economieActuelle"
          :economie-possible="resultatWWViewModel.economiePotentielle"
        />

        <RedirectionActionsWW :nombre-actions="resultatWWViewModel.nombreActions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import ProgressionEconomie from '@/components/custom/Action/Simulation/WattWatchers/ProgressionEconomie.vue';
  import RedirectionActionsWW from '@/components/custom/Action/Simulation/WattWatchers/RedirectionActionsWW.vue';
  import ResultatWW from '@/components/custom/Action/Simulation/WattWatchers/ResultatWW.vue';
  import {
    ResultatWWPresenterImpl,
    ResultatWWViewModel,
  } from '@/domaines/simulationWattWatchers/adapters/resultatWattWatchers.presenter.impl';
  import { WattWatchersRepositoryAxios } from '@/domaines/simulationWattWatchers/adapters/wattWatchers.repository.axios';
  import { RecupererConsommationUsecase } from '@/domaines/simulationWattWatchers/recupererConsommation.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  /*const resultatWWViewModel: ResultatWWViewModel = {
    totalConsommation: 2820,
    economieActuelle: 0,
    economiePotentielle: 2300,
    nombreActions: 13,
    detailConsommations: [
      { color: '#FF9239', emoji: '🔥', id: 'chauffage', label: 'Chauffage', value: 0.59, pourcentage: '59%' },
      { color: '#98CCFF', emoji: '🛁', id: 'eau-chaude', label: 'Eau chaude', value: 0.24, pourcentage: '24%' },
      { color: '#77F2B2', emoji: '✳️', id: 'autres', label: 'Autres', value: 0.07, pourcentage: '7%' },
      { color: '#A8C6E5', emoji: '🍳', id: 'cuisson', label: 'Cuisson', value: 0.03, pourcentage: '3%' },
      { color: '#AEF372', emoji: '🧺', id: 'electromenager', label: 'Électroménager', value: 0.03, pourcentage: '3%' },
      { color: '#FFC739', emoji: '💡', id: 'eclairage', label: 'Éclairage', value: 0.02, pourcentage: '2%' },
      { color: '#C1BEFF', emoji: '📺', id: 'multimedia', label: 'Multimédia', value: 0.02, pourcentage: '2%' },
    ],
  };*/
  const resultatWWViewModel = ref<ResultatWWViewModel>();
  onMounted(() => {
    const usecase = new RecupererConsommationUsecase(new WattWatchersRepositoryAxios());
    usecase.recupererConsommation(
      utilisateurStore().utilisateur.id,
      new ResultatWWPresenterImpl(vm => {
        resultatWWViewModel.value = vm;
      }),
    );
  });
</script>
