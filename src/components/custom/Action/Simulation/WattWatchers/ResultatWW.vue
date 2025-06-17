<template>
  <div>
    <div class="position--relative full-width full-height fr-px-2w fr-py-3w flex flex-center">
      <Doughnut :data="graphData" :options="graphOptions" ref="chartRef" aria-hidden="true" />

      <p class="texte-au-centre fr-mb-0">
        <span class="display-block text--bold text--3xl fr-mb-1w">{{ totalConsommation }}€</span>
        consommés
        <span class="display-block text--gris-light">par an</span>
      </p>

      <div
        aria-hidden="true"
        v-for="(item, index) in detailConsommations"
        :key="item.label"
        class="emoji-bubble"
        :style="positionnerBulle(index, item.color)"
      >
        {{ item.emoji }}
      </div>
    </div>

    <ListeDetailConsommation :detail-consommations="detailConsommations" />
  </div>
</template>

<script lang="ts" setup>
  import { ArcElement, Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
  import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
  import { Doughnut } from 'vue-chartjs';
  import ListeDetailConsommation from '@/components/custom/Action/Simulation/WattWatchers/ListeDetailConsommation.vue';
  import { ResultatWWViewModel } from '@/domaines/wattWatchers/ports/wattWatchers.repository';

  ChartJS.register(ArcElement);

  const props = defineProps<{
    totalConsommation: ResultatWWViewModel['totalConsommation'];
    detailConsommations: ResultatWWViewModel['detailConsommations'];
  }>();

  const chartRef = ref();
  const chartSize = ref<{ height: number; width: number }>({ height: 0, width: 0 });

  onMounted(async () => {
    await updateChartSize();
    window.addEventListener('resize', updateChartSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateChartSize);
  });

  const updateChartSize = async () => {
    await nextTick();
    if (chartRef.value?.$el) {
      chartSize.value = {
        height: chartRef.value.$el.clientHeight,
        width: chartRef.value.$el.clientWidth,
      };
    }
  };

  const graphData = computed<ChartData<'doughnut'>>(() => ({
    labels: props.detailConsommations.map(c => c.label),
    datasets: [
      {
        data: props.detailConsommations.map(c => c.value),
        backgroundColor: props.detailConsommations.map(c => c.color),
        borderRadius: 10,
        spacing: 2,
      },
    ],
  }));

  const graphOptions: ChartOptions<'doughnut'> = {
    events: [],
    cutout: '90%',
    radius: '80%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const valeurTotale = computed(() => props.detailConsommations.reduce((sum, item) => sum + item.value, 0));

  const positionnerBulle = (index: number, color: string) => {
    const distance = Math.max(chartSize.value.width, chartSize.value.height) / 2 - 5;

    const valeurPrecedente = props.detailConsommations.slice(0, index).reduce((sum, item) => sum + item.value, 0);
    const valeurActuelle = props.detailConsommations[index].value;

    const angle = ((valeurPrecedente + valeurActuelle / 2) / valeurTotale.value) * 2 * Math.PI - Math.PI / 2;
    const x = distance * Math.cos(angle);
    const y = distance * Math.sin(angle);

    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      backgroundColor: color,
      'z-index': props.detailConsommations.length - index,
    };
  };
</script>

<style scoped>
  .emoji-bubble {
    position: absolute;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }

  .texte-au-centre {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>
