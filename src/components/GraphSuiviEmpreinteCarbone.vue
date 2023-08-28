<template>
  <div class="fr-p-3w background-gris fr-mb-4w">
    <h2 class="fr-h5">{{ titreDuGraphique }}</h2>
    <LineChart :chartData="getDonneesDuGraph()" :options="getOptionsDuGraph()" />
    <div class="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mt-2w">
      <span class="fr-text--sm fr-mb-0">Votre moyenne</span>
      <div class="legende-graphique legende-graphique--blue"></div>
      <div class="fr-text--sm fr-mb-0">{{ titreVariationDesSuivis }}</div>
      <div class="legende-graphique legende-graphique--dashed"></div>
    </div>
  </div>
  <Transcription
    id="transcription-graphique-evolution-impact-carbone"
    titre="Transcription du graphique évolution de votre impact carbone"
  >
    <Tableau
      :titre="titreDuGraphique"
      :titresDonnees="['Dates', titreVariationDesSuivis]"
      :donnees="getDonneesDuTableau(donneesGraphique.datesDuGraph, donneesGraphique.valeursCarboneDuGraph)"
    />
  </Transcription>
</template>

<script setup lang="ts">
  import { LineChart } from "vue-chart-3";
  import { Chart, registerables } from "chart.js";
  import Transcription from "./dsfr/Transcription.vue";
  import Tableau from "./dsfr/Table.vue";

  const titreDuGraphique = 'Évolution de votre impact carbone';
  const titreVariationDesSuivis = 'Variation des suivis';

  Chart.register(...registerables);

  const donneesGraphique = defineProps<{
    datesDuGraph: string[],
    valeursCarboneDuGraph: number[],
    moyenneDesSuivis: number[],
  }>();

  const getDonneesDuGraph = () => {        
    return {
      labels: donneesGraphique.datesDuGraph,
      datasets: [
        {
          label: titreVariationDesSuivis,
          backgroundColor: "#000091",
          borderColor: "#000091",
          pointStyle: "circle" as const,
          data: donneesGraphique.valeursCarboneDuGraph,
        },
        {
          label: "Votre moyenne",
          backgroundColor: "#f6f6f6",
          borderColor: "#000000",
          borderDash: [5, 5],
          pointStyle: false as const,
          data: donneesGraphique.moyenneDesSuivis,
        },
      ],
    };
  }

  const getOptionsDuGraph = () => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        }
      },
      scales: {
        y: {
          border: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };
  }

  const getDonneesDuTableau = (tableau1: (string | number)[], tableau2: (string | number)[]): (string | number)[][] => {
    const tableauCombiné = tableau1.map((value, index) => [value, tableau2[index]]);
    
    return tableauCombiné;
  }

</script>

<style scoped>
  .legende-graphique {
    width: 3rem;
    height: 0;
    margin: 0 1rem 0 .5rem;
  }
  .legende-graphique--blue {
    border: 4px solid #000091;
  }

  .legende-graphique--dashed {
    border: 4px dashed #000000;
  }
</style>
