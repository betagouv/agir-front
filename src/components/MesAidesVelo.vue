<template>
  <div>
    <h1>Mes aides - Vélo</h1>
    <div class="form-container">
      <form id="mes-aides-velo-8199" @submit.prevent="submitForm">
        <label class="fr-label" for="text-input-code-postal">Votre code postal</label>
        <input class="fr-input" v-model="codePostal" type="text" id="text-input-code-postal" name="text-input-text-code-postal" />
        <label class="fr--label" for="text-input-rfr">Revenu fiscal de référence</label>
        <input class="fr-input" v-model="revenuFiscal" type="text" id="text-input-rfr" name="text-input-text-rfr" />
        <button id="button-8202" class="fr-mt-2v fr-btn">Valider</button>
      </form>
    </div>
    <div v-if="simulationAidesVeloViewModel" class="resultats">
      Voici les aides dont vous pouvez bénéficier
      <ul>
        <li v-for="(value, propertyName) in  simulationAidesVeloViewModel" v-bind:class="simulationAidesVeloViewModel" >
          {{ propertyName }} 
          <ul>
            <li v-for="aide in value" :key="aide.libelle">
              <img :src="aide.logo">
              {{ aide.libelle }} :
              {{ aide.description }}
              {{ aide.montant }}
              <a title="en savoir plus - ouvre une nouvelle fenêtre" :href="aide.lien" target="_blank" rel="noopener">(en savoir plus)</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import SimulerAideVeloUsecase from "@/aides/simulerAideVelo.usecase";
import { SimulerAideVeloRepositoryAxios } from "@/aides/adapters/simulerAideVelo.repository.axios";
import { SimulerAideVeloPresenterImpl } from "@/aides/adapters/simulerAideVelo.presenter.impl";
import { SimulationAidesVeloViewModel } from "@/aides/ports/simulerAideVelo.presenter";

export default {
  setup() {
    const codePostal = ref("");
    const revenuFiscal = ref("");
    const simulationAidesVeloViewModel = ref<SimulationAidesVeloViewModel>();
    const submitForm = () => {
      const useCase = new SimulerAideVeloUsecase(new SimulerAideVeloRepositoryAxios());

      function mapValues(viewModels: SimulationAidesVeloViewModel) {
        simulationAidesVeloViewModel.value = viewModels;
      }

      useCase.execute(codePostal.value, revenuFiscal.value, new SimulerAideVeloPresenterImpl(mapValues));
    };
    return {
      simulationAidesVeloViewModel,
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
  margin: 1rem 5rem auto 5rem;
}
</style>
