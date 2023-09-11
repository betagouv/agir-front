<template>
  <h1 class="fr-h2">Acheter un vélo</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <aside class="fr-col-lg-4 fr-col-12">
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
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import AideDetail from '@/components/custom/AideDetail.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import { ref } from 'vue';
  import { SimulationAidesVeloViewModel } from '@/aides/ports/simulerAideVelo.presenter';
  import { SimulerAideVeloPresenterImpl } from '@/aides/adapters/simulerAideVelo.presenter.impl';
  import { SimulerAideVeloRepositoryAxios } from '@/aides/adapters/simulerAideVelo.repository.axios';
  import SimulerAideVeloUsecase from '@/aides/simulerAideVelo.usecase';

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
