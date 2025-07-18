<template>
  <div class="fr-col-6">
    <div class="shadow">
      <section class="background--white fr-pt-2w fr-px-2w">
        <p v-if="type === 'economique'" class="fr-mb-1w fr-badge fr-badge--sm fr-badge--yellow-tournesol">
          La plus économique
        </p>
        <p v-if="type === 'ecologique'" class="fr-mb-1w fr-badge fr-badge--sm fr-badge--green-emeraude">
          La plus écologique
        </p>

        <h3 class="fr-h4" v-html="resultatSimulationVoiture.typeDeVoiture" />

        <p>
          Coût d'achat&nbsp;:
          <span class="inline-flex">
            <span class="text--bold fr-mr-1w">{{ resultatSimulationVoiture.cout.coutAchatNet }}</span>
            <span class="line-through text-disabled-grey">{{ resultatSimulationVoiture.cout.prixAchat }}</span>
          </span>
        </p>
        <p>
          Économie&nbsp;:
          <span
            :aria-label="`${resultatSimulationVoiture.economies.difference} euros de différence par rapport à votre véhicule actuel`"
            :class="resultatSimulationVoiture.economies.style"
            class="fr-badge fr-badge--no-icon fr-ml-1v lowercase"
          >
            {{ resultatSimulationVoiture.economies.labelDifference }}
            <span class="unite">€ / an</span>
          </span>
        </p>
        <p>
          Émissions&nbsp;:
          <span
            :aria-label="`${resultatSimulationVoiture.emission.difference} euros de différence par rapport à votre véhicule actuel`"
            :class="resultatSimulationVoiture.emission.style"
            class="fr-badge fr-badge--no-icon fr-ml-1v lowercase"
          >
            {{ resultatSimulationVoiture.emission.labelDifference }}
            <span class="unite">kg<span class="uppercase">CO2</span>e / an</span>
          </span>
        </p>
      </section>

      <section class="information-section background-bleu-alt-light fr-p-2w">
        <p v-if="resultatSimulationVoiture.montantAide">
          <span class="fr-icon-bank-line icone" aria-hidden="true"></span>
          <span class="text--bold text--bleu fr-ml-1v">
            {{ resultatSimulationVoiture.montantAide }}
          </span>
          d'aide à l'achat
        </p>
        <p v-if="resultatSimulationVoiture.dureeSeuilRentabilite.valeur > 0">
          <span class="fr-icon-money-euro-circle-line icone" aria-hidden="true"></span>
          Rentable à partir de
          <span class="text--bold text--bleu">
            {{ resultatSimulationVoiture.dureeSeuilRentabilite.valeur }}
            {{ resultatSimulationVoiture.dureeSeuilRentabilite.unite }}</span
          >
        </p>
        <p v-else>
          <span class="fr-icon-money-euro-circle-line icone" aria-hidden="true"></span>
          Rentable <span class="text--bold text--bleu">dès l'achat</span>
        </p>

        <p v-if="resultatSimulationVoiture.economiesTotales">
          <span class="fr-icon-calendar-event-line icone" aria-hidden="true"></span>
          Économisez
          <span class="text--bold text--bleu">
            {{ resultatSimulationVoiture.economiesTotales }}
          </span>
          sur 10 ans
        </p>
      </section>
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
  .line-through {
    text-decoration: line-through;
  }

  .lowercase {
    text-transform: lowercase;
  }

  .uppercase {
    text-transform: uppercase;
  }

  .unite {
    font-weight: normal;
    padding-left: 0.25rem;
  }

  .icone {
    color: var(--blue-france-sun-113-625);
    margin-right: 0.25rem;
  }

  .information-section p:last-child {
    margin-bottom: 0;
  }
</style>
