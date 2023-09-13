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
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  import { SimulerAideRetrofitPresenterImpl } from '@/aides/adapters/simulerAideRetrofit.presenter.impl';
  import { SimulerAideRetrofitRepositoryAxios } from '@/aides/adapters/simulerAideRetrofit.repository.axios';
  import SimulerAideRetrofitUsecase from '@/aides/simulerAideRetrofit.usecase';
  import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';

  const emit = defineEmits(['submit-simulation'])
  const codePostal = ref("");
  const revenuFiscal = ref("");

  const submitForm = () => {
    const useCase = new SimulerAideRetrofitUsecase(new SimulerAideRetrofitRepositoryAxios());

    function mapValues(viewModels: SimulationAideResultatViewModel) {
      emit('submit-simulation', viewModels);
    }

    useCase.execute(codePostal.value, revenuFiscal.value, new SimulerAideRetrofitPresenterImpl(mapValues));
  };
</script>
