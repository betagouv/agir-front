<template>
  <div tabindex="-1" ref="simulationResultat">
    <div v-if="isLoading">
      <p>Calcul du résultat...</p>
      <div class="ball-loader fr-my-3w fr-mx-auto"></div>
    </div>
    <section v-else-if="resultatSimulationVoiture">
      <SimulationResultatVoitureActuelle
        v-if="resultatSimulationVoiture.resultatVoitureActuelle"
        :resultat-simulation-voiture="resultatSimulationVoiture.resultatVoitureActuelle"
        class="fr-mb-2w"
      />

      <div>
        <h2 class="fr-h3">Les meilleures solutions pour vous</h2>
        <div class="fr-grid-row fr-grid-row--gutters">
          <SimulationResultatVoitureProposee
            v-if="resultatSimulationVoiture.resultatVoiturePlusEconomique"
            :resultat-simulation-voiture="resultatSimulationVoiture.resultatVoiturePlusEconomique"
            type="economique"
          />
          <SimulationResultatVoitureProposee
            v-if="resultatSimulationVoiture.resultatVoiturePlusEcologique"
            :resultat-simulation-voiture="resultatSimulationVoiture.resultatVoiturePlusEcologique"
            type="ecologique"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import {
    ResultatSimulationVoiturePresenterImpl,
    ResultatSimulationVoitureViewModel,
  } from '@/domaines/simulationVoiture/adapters/resultatSimulationVoiture.presenter.impl';
  import { SimulateurVoitureRepositoryAxios } from '@/domaines/simulationVoiture/adapters/simulateurVoiture.repository.axios';
  import { CalculerResultatSimulationVoitureUsecase } from '@/domaines/simulationVoiture/calculerResultatSimulationVoiture.usecase';
  import { utilisateurStore } from '@/store/utilisateur';
  import SimulationResultatVoitureProposee from '@/components/custom/Action/Simulation/Voiture/SimulationResultatVoitureProposee.vue';
  import SimulationResultatVoitureActuelle from '@/components/custom/Action/Simulation/Voiture/SimulationResultatVoitureActuelle.vue';

  const isLoading = ref<boolean>(false);
  const simulationResultat = ref<HTMLDivElement>();
  const resultatSimulationVoiture = ref<ResultatSimulationVoitureViewModel>();

  defineExpose({
    focus: () => {
      simulationResultat.value?.focus();
    },
  });

  onMounted(() => {
    isLoading.value = true;

    const recupererResultatsSimulationVoitureUsecase = new CalculerResultatSimulationVoitureUsecase(
      new SimulateurVoitureRepositoryAxios(),
    );
    recupererResultatsSimulationVoitureUsecase
      .execute(
        utilisateurStore().utilisateur.id,
        new ResultatSimulationVoiturePresenterImpl(vm => {
          resultatSimulationVoiture.value = vm;
        }),
      )
      .finally(() => {
        isLoading.value = false;
      });
  });
</script>
