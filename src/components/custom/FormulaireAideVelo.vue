<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-lg-8">
      <div class="background--white border border-radius--md fr-p-3w fr-mb-4w">
        <h2 class="fr-h5">Quelques questions pour calculer les aides vélo adaptées</h2>
        <form @submit.prevent="submitForm">
          <div class="fr-input-group">
            <label class="fr-label" for="text-input-code-postal"> Votre code postal </label>
            <input class="fr-input" v-model="codePostal" name="code-postal" id="text-input-code-postal" type="text" />
          </div>
          <div class="fr-input-group">
            <label class="fr-label" for="text-input-rfr"> Revenu fiscal de référence </label>
            <input class="fr-input" v-model="revenuFiscal" name="code-postal" id="text-input-rfr" type="text" />
          </div>
          <button class="fr-mt-2v fr-btn" :disabled="isDisabled">Valider</button>
        </form>
      </div>
    </div>
    <div class="fr-col-lg-4">
      <CarteInfo>
        <p class="fr-text--bold">
          <span class="fr-icon-information-line" aria-hidden="true"></span>
          Pouquoi ces questions ?
        </p>
        <p>Adapter les résultats au plus près de votre situation</p>
        <p>Votre <strong>code postal</strong> permet de consulter les aides locales.</p>
        <p>
          Votre <strong>revenu fiscal de référence</strong> et le <strong>nombre de parts</strong> permettent d’afficher les aides en fonction de vos
          ressources.
        </p>
      </CarteInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import CarteInfo from "@/components/custom/CarteInfo.vue";
import { SimulerAideVeloPresenterImpl } from "@/aides/adapters/simulerAideVelo.presenter.impl";
import { SimulerAideVeloRepositoryAxios } from "@/aides/adapters/simulerAideVelo.repository.axios";
import SimulerAideVeloUsecase from "@/aides/simulerAideVelo.usecase";
import { SimulationAideResultatViewModel } from "@/aides/ports/simulationAideResultat";
import { utilisateurStore } from "@/store/utilisateur";

const store = utilisateurStore();
const emit = defineEmits(["submit-simulation"]);
const codePostal = ref(store.utilisateur.codePostal);
const revenuFiscal = ref("");

const isDisabled = computed(() => {
  return codePostal.value.trim() === "" || revenuFiscal.value.trim() === "";
});

const submitForm = () => {
  const useCase = new SimulerAideVeloUsecase(new SimulerAideVeloRepositoryAxios());

  function mapValues(viewModels: SimulationAideResultatViewModel) {
    emit("submit-simulation", viewModels, codePostal.value, revenuFiscal.value);
  }

  useCase.execute(codePostal.value, revenuFiscal.value, new SimulerAideVeloPresenterImpl(mapValues));
};
</script>
