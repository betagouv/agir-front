<template>
  <div class="background--white border border-radius--md fr-p-3w fr-mb-4w">
    <h2 class="fr-h5">Paramètres</h2>
    <form @submit.prevent="submitForm">
      <div class="fr-input-group">
        <label class="fr-label" for="text-input-code-postal">
          Votre code postal
        </label>
        <input class="fr-input" v-model="codePostal" name="code-postal" id="text-input-code-postal" type="text">
      </div>
      <div class="fr-input-group">
        <label class="fr-label" for="text-input-rfr">
          Revenu fiscal de référence
        </label>
        <input class="fr-input" v-model="revenuFiscal" name="code-postal" id="text-input-rfr" type="text">
      </div>
      <button class="fr-mt-2v fr-btn">Valider</button>
    </form>
  </div>
  <CarteInfo>
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Pouquoi ces questions ?
    </p>
    <p>Adapter les résultats au plus près de votre situation</p>
    <p>Votre <strong>code postal</strong> permet de consulter les aides locales.</p>
    <p>Votre <strong>revenu fiscal de référence</strong> et le <strong>nombre de parts</strong> permettent d’afficher les aides en fonction de vos ressources.</p>
  </CarteInfo>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import { SimulationAidesVeloViewModel } from '@/aides/ports/simulerAideVelo.presenter';
  import { SimulerAideVeloPresenterImpl } from '@/aides/adapters/simulerAideVelo.presenter.impl';
  import { SimulerAideVeloRepositoryAxios } from '@/aides/adapters/simulerAideVelo.repository.axios';
  import SimulerAideVeloUsecase from '@/aides/simulerAideVelo.usecase';

  const emit = defineEmits(['submit-simulation'])
  const codePostal = ref("");
  const revenuFiscal = ref("");
  const simulationAidesVeloViewModel = ref<SimulationAidesVeloViewModel>();

  const submitForm = () => {
    const useCase = new SimulerAideVeloUsecase(new SimulerAideVeloRepositoryAxios());

    function mapValues(viewModels: SimulationAidesVeloViewModel) {
      simulationAidesVeloViewModel.value = viewModels;
      emit('submit-simulation', viewModels);
    }

    useCase.execute(codePostal.value, revenuFiscal.value, new SimulerAideVeloPresenterImpl(mapValues));
  };
</script>
