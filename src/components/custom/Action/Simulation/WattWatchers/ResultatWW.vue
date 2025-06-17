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
        :style="bubbleStyle(index, item.color)"
      >
        {{ item.emoji }}
      </div>
    </div>

    <ul class="fr-px-2w list-style-none liste-categories fr-pb-3w fr-my-0">
      <li
        v-for="categorie in detailConsommations"
        :key="categorie.label"
        class="custom-disc flex align-items--center"
        :class="`disc-${categorie.id}`"
      >
        <div class="flex flex-space-between full-width align-items--baseline">
          <span class="fr-text--sm fr-mb-0">
            {{ categorie.label }}
          </span>
          <span class="text--bold">{{ categorie.pourcentage }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ArcElement, Chart as ChartJS, ChartData, ChartOptions } from 'chart.js';
  import { nextTick, onMounted, onUnmounted, ref } from 'vue';
  import { Doughnut } from 'vue-chartjs';
  import { ResultatWWViewModel } from '@/domaines/wattWatchers/ports/wattWatchers.repository';

  ChartJS.register(ArcElement);
  const { totalConsommation, detailConsommations } = defineProps<{
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
    if (chartRef.value && chartRef.value.$el) {
      chartSize.value = {
        height: chartRef.value.$el.clientHeight,
        width: chartRef.value.$el.clientWidth,
      };
    }
  };

  const graphData: ChartData<'doughnut'> = {
    labels: detailConsommations.map(c => c.label),
    datasets: [
      {
        data: detailConsommations.map(c => c.value),
        backgroundColor: detailConsommations.map(c => c.color),
        borderRadius: 10,
        spacing: 2,
      },
    ],
  };
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

  const bubbleStyle = (index: number, color: string) => {
    const radius = Math.max(chartSize.value.width, chartSize.value.height) / 2 - 5;
    const total = detailConsommations.reduce((sum, item) => sum + item.value, 0);

    const valueBefore = detailConsommations.slice(0, index).reduce((sum, item) => sum + item.value, 0);
    const currentValue = detailConsommations[index].value;

    const angle = ((valueBefore + currentValue / 2) / total) * 2 * Math.PI - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      backgroundColor: color,
      'z-index': detailConsommations.length - index,
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

  .custom-disc::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 9px;
    border-radius: 12px;
    background-color: #0a76f6;
    margin-right: 0.75rem;
  }

  .liste-categories {
    columns: 1;

    @media (min-width: 32rem) {
      columns: 2;
    }
  }

  .disc-chauffage::before {
    background-color: v-bind('detailConsommations[0].color');
  }
  .disc-eau-chaude::before {
    background-color: v-bind('detailConsommations[1].color');
  }
  .disc-autres::before {
    background-color: v-bind('detailConsommations[2].color');
  }
  .disc-cuisson::before {
    background-color: v-bind('detailConsommations[3].color');
  }
  .disc-electromenager::before {
    background-color: v-bind('detailConsommations[4].color');
  }
  .disc-eclairage::before {
    background-color: v-bind('detailConsommations[5].color');
  }
  .disc-multimedia::before {
    background-color: v-bind('detailConsommations[6].color');
  }
</style>
