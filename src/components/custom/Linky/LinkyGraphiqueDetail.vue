<template>
  <h2 class="fr-h5">Notre analyse</h2>
  <ul>
    <li v-for="(item, index) in consommationLinkyViewModel.commentaires" :key="index" v-html="item" />
  </ul>
  <div class="background--white fr-p-2w shadow border-radius--md fr-mb-2w">
    <Bar
      id="graphique-consommation-electrique"
      class="fr-mb-4w"
      :options="{
        responsive: true,
        scales: {
          y: {
            ticks: {
              callback: value => `${value} kWh`,
            },
          },
        },
      }"
      :data="{
        labels: consommationLinkyViewModel.graphique.libelles,
        datasets: [
          {
            label: 'année précédente',
            backgroundColor: consommationLinkyViewModel.couleurValeur1,
            data: consommationLinkyViewModel.graphique.valeurPrecedente,
          },
          {
            label: 'année courante',
            backgroundColor: consommationLinkyViewModel.couleurValeur2,
            data: consommationLinkyViewModel.graphique.valeurCourante,
          },
        ],
      }"
    />
  </div>
  <p class="fr-text--xs fr-mb-2w">Sur la base des relevés quotidiens de votre compteur Linky</p>
  <Transcription
    :titre="`Transcription du graphique: ${consommationLinkyViewModel.titre}`"
    :id="consommationLinkyViewModel.id"
    :est-ouvert="false"
  >
    <Table
      :tableau-double-legende="true"
      :titre="consommationLinkyViewModel.titre"
      :titres-donnees="['', ...consommationLinkyViewModel.graphique.libelles]"
      :donnees="[
        ['Année précédente', ...consommationLinkyViewModel.graphique.valeurPrecedenteTranscription],
        ['Année courante', ...consommationLinkyViewModel.graphique.valeurCouranteTranscription],
      ]"
    />
  </Transcription>
</template>

<script setup lang="ts">
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import { Bar } from 'vue-chartjs';
  import Table from '@/components/dsfr/Table.vue';
  import Transcription from '@/components/dsfr/Transcription.vue';
  import { ConsommationLinkyViewModel } from '@/domaines/serviceRecherche/linky/adapters/serviceRechercheConsommationLinky.presenter.impl';

  defineProps<{ consommationLinkyViewModel: ConsommationLinkyViewModel }>();

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>
