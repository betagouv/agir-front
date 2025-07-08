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
