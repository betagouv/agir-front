<template>
  <h1 class="fr-h2">Acheter un vélo</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <aside class="fr-col-lg-4 fr-col-12">
      <FormulaireAideVelo @submit-simulation="submitSimulation" />
    </aside>
    <div class="fr-col-lg-8 fr-col-12">
      <div class="background--white border border-radius--md fr-p-3w">
        <h2 class="fr-h4">Vous pouvez bénéficier des aides vélo suivantes :</h2>
        <p v-if="!simulationAidesVeloViewModel">Veuillez remplir le formulaire pour accèder à vos aides.</p>
        <div v-else v-for="(aides, index) in simulationAidesVeloViewModel" :key="index">
          <Accordeon v-if="aides.length" :label="`Acheter un vélo ${index}`" :nameId="`aides-${index}`">
            <ul class="list-style-none fr-m-0 fr-p-0">
              <li v-for="(aide, index) in aides" :key="index">
                <AideDetail
                  :titre="aide.libelle"
                  label-du-badge="A définir"
                  :description="aide.description"
                  :url-externe="aide.lien"
                  :valeur-aide="aide.montant"
                  :url-logo="aide.logo"
                />
              </li>
            </ul>
          </Accordeon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import AideDetail from '@/components/custom/AideDetail.vue';
  import FormulaireAideVelo from './FormulaireAideVelo.vue';
  import { SimulationAidesVeloViewModel } from '@/aides/ports/simulerAideVelo.presenter';
  
  const simulationAidesVeloViewModel = ref<SimulationAidesVeloViewModel | null>(null);

  const submitSimulation = (data: SimulationAidesVeloViewModel) => {
    simulationAidesVeloViewModel.value = data;
  };
</script>

<style scoped>
  li {
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }

  li:last-child {
    padding: 0;
    margin: 0;
    border: none;
  }
</style>
