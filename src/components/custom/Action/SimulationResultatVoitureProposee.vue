<template>
  <div class="fr-col-6">
    <div class="shadow background--white fr-p-2w">
      <span v-if="type === 'economique'" class="type economique fr-icon-money-euro-circle-fill">
        La plus économique
      </span>
      <span v-if="type === 'ecologique'" class="type ecologique fr-icon-leaf-fill"> La plus écologique </span>

      <h3 class="fr-h4" v-html="resultatSimulationVoiture.typeDeVoiture" />

      <p>
        Coût annuel: <span class="text--bold">{{ resultatSimulationVoiture.coutAnnuel.montant }}</span
        >&nbsp;€

        <span
          class="fr-badge fr-badge--no-icon"
          :class="resultatSimulationVoiture.coutAnnuel.difference < 0 ? 'fr-badge--success ' : 'fr-badge--warning'"
          :aria-label="`Différence par rapport à votre véhicule actuel : ${resultatSimulationVoiture.coutAnnuel.difference}`"
        >
          {{ resultatSimulationVoiture.coutAnnuel.difference > 0 ? '+' : ''
          }}{{ resultatSimulationVoiture.coutAnnuel.difference }}€
        </span>
      </p>

      <p>
        Emissions annuelles: <span class="text--bold">{{ resultatSimulationVoiture.emission.montant }}</span
        >&nbsp;kgCO2e

        <span
          class="fr-badge fr-badge--no-icon"
          :class="resultatSimulationVoiture.emission.difference < 0 ? 'fr-badge--success ' : 'fr-badge--warning'"
          :aria-label="`Différence par rapport à votre véhicule actuel : ${resultatSimulationVoiture.emission.difference}`"
        >
          {{ resultatSimulationVoiture.emission.difference }}%
        </span>
      </p>

      <hr />
      <ul class="fr-grid-row list-style-none" aria-label="Catégories">
        <li
          v-for="tag in resultatSimulationVoiture.tag"
          :key="tag"
          class="fr-tag fr-tag--secondary fr-mr-1w"
          v-text="tag"
        />
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ResultatSimulationVoitureProposeeViewModel } from '@/domaines/simulationVoiture/adapters/resultatSimulationVoiture.presenter.impl';

  defineProps<{
    type: 'ecologique' | 'economique';
    resultatSimulationVoiture: ResultatSimulationVoitureProposeeViewModel;
  }>();
</script>

<style scoped>
  .type {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    margin-bottom: 1rem;
    border-radius: 0.3rem;
    font-weight: 500;
  }

  .ecologique {
    background-color: rgba(223, 255, 228, 1);
    color: rgba(18, 77, 42, 1);
  }

  .economique {
    background-color: rgba(255, 245, 223, 1);
    color: rgb(148, 86, 0);
  }
</style>
