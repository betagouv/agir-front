<template>
  <div>
    <h1>Mes aides - Retrofit</h1>
    <div class="form-container">
      <form id="mes-aides-retrofit-8199" @submit.prevent="submitForm">
        <label class="fr-label" for="text-input-code-postal">Votre code postal</label>
        <input class="fr-input" v-model="codePostal" type="text" id="text-input-code-postal" name="text-input-text-code-postal" />
        <label class="fr--label" for="text-input-rfr">Revenu fiscal de référence</label>
        <input class="fr-input" v-model="revenuFiscal" type="text" id="text-input-rfr" name="text-input-text-rfr" />
        <button id="button-8202" class="fr-mt-2v fr-btn">Valider</button>
      </form>
    </div>
    <div v-if="simulationAidesRetrofitViewModel" class="resultats">
      Voici les aides dont vous pouvez bénéficier
      <ul>
        <li v-for="aide in simulationAidesRetrofitViewModel" :key="aide.libelle">{{ aide.libelle }} : {{ aide.montant }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import SimulerAideRetrofitUsecase from "@/aides/simulerAideRetrofit.usecase";
import { SimulerAideRetrofitRepositoryAxios } from "@/aides/adapters/simulerAideRetrofitRepository.axios";
import { SimulerAideRetrofitPresenterImpl } from "@/aides/adapters/simulerAideRetrofit.presenter.impl";
import { SimulationAidesRetrofitViewModel } from "@/aides/ports/simulerAideRetrofit.presenter";

export default {
  setup() {
    const codePostal = ref("");
    const revenuFiscal = ref("");
    const simulationAidesRetrofitViewModel = ref<SimulationAidesRetrofitViewModel[]>();
    const submitForm = () => {
      const useCase = new SimulerAideRetrofitUsecase(new SimulerAideRetrofitRepositoryAxios());

      function mapValues(viewModels: SimulationAidesRetrofitViewModel[]) {
        simulationAidesRetrofitViewModel.value = viewModels;
      }

      useCase.execute(codePostal.value, revenuFiscal.value, new SimulerAideRetrofitPresenterImpl(mapValues));
    };

    return {
      simulationAidesRetrofitViewModel,
      codePostal,
      revenuFiscal,
      submitForm,
    };
  },
};
</script>

<style scoped>
.form-container {
  width: 30vw;
  text-align: start;
  margin: 0 auto 0 auto;
}

.resultats {
  text-align: start;
}
</style>
