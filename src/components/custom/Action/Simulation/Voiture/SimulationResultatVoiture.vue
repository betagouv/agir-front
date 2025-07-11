<template>
  <div tabindex="-1" ref="simulationResultat">
    <div v-if="isLoading">
      <p>Calcul du résultat...</p>
      <div class="ball-loader fr-my-3w fr-mx-auto"></div>
    </div>
    <section v-else-if="resultatSimulationVoiture" class="fr-p-2w">
      <div v-if="resultatSimulationVoiture?.resultatVoitureActuelle">
        <h2 class="fr-h3">Votre véhicule actuel</h2>
        <div class="background--white shadow fr-p-2w fr-mb-4w">
          <p>
            Coût annuel:
            <span class="text--bold">{{ resultatSimulationVoiture.resultatVoitureActuelle.coutAnnuel }}</span>
          </p>

          <p>
            Emissions annuelles:
            <span class="text--bold">{{ resultatSimulationVoiture.resultatVoitureActuelle.emissionAnnuelle }}</span
            >&nbsp;kgCO2e
          </p>

          <hr />

          <ul class="fr-grid-row list-style-none">
            <li
              v-for="tag in resultatSimulationVoiture.resultatVoitureActuelle.tag"
              :key="tag"
              class="fr-tag fr-tag--secondary fr-mr-1w"
              v-text="tag"
            />
          </ul>
        </div>
      </div>

      <div>
        <h2 class="fr-h3">
          Les meilleurs alternatives pour le gabarit {{ resultatSimulationVoiture.resultatVoitureActuelle.gabarit }}
        </h2>
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
  import SimulationResultatVoitureProposee from '@/components/custom/Action/Simulation/Voiture/SimulationResultatVoitureProposee.vue';
  import {
    ResultatSimulationVoiturePresenterImpl,
    ResultatSimulationVoitureViewModel,
  } from '@/domaines/simulationVoiture/adapters/resultatSimulationVoiture.presenter.impl';
  import { SimulateurVoitureRepositoryAxios } from '@/domaines/simulationVoiture/adapters/simulateurVoiture.repository.axios';
  import { CalculerResultatSimulationVoitureUsecase } from '@/domaines/simulationVoiture/calculerResultatSimulationVoiture.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

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
