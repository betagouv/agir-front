<template>
  <div class="width-80 fr-my-3w">
    <Pie :data="chartData" :options="options" />
  </div>
</template>

<script setup lang="ts">
  import { ArcElement, Chart as ChartJS, ChartOptions, Legend, Tooltip } from 'chart.js';
  import { Pie } from 'vue-chartjs';
  import { DonneesCollectivitesInseeViewModel } from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';

  ChartJS.register(ArcElement, Tooltip, Legend);

  defineProps<{ chartData: DonneesCollectivitesInseeViewModel['graphiqueActionsRepartitionParThematiquesData'] }>();

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      tooltip: {
        enabled: true,
      },
    },
  };
</script>

<style scoped>
  .width-80 {
    width: 80%;
    max-height: 60%;
    margin: 0 auto;
  }
</style>
