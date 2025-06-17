<template>
  <h2 class="fr-h3">Ma consommation</h2>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-md-6 fr-col-12">
      <div class="shadow">
        <div class="position--relative full-width full-height fr-px-2w fr-py-3w">
          <Doughnut :data="data" :options="options" ref="chartRef" aria-hidden="true" />
          <div
            aria-hidden="true"
            v-for="(item, index) in donneesConsommation"
            :key="item.label"
            class="emoji-bubble"
            :style="bubbleStyle(index, item.color)"
          >
            {{ item.emoji }}
          </div>
          <p class="texte-au-centre fr-mb-0">
            <span class="display-block text--bold text--3xl fr-mb-1w">2823€</span>
            consommés
            <span class="display-block text--gris-light">par an</span>
          </p>
        </div>

        <ul class="fr-px-2w list-style-none liste-categories fr-pb-3w">
          <li
            v-for="categorie in donneesConsommation"
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
    </div>
    <div class="fr-col-md-6 fr-col-12">
      <div class="shadow"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
  } from 'chart.js';
  import { nextTick, onMounted, ref } from 'vue';
  import { Doughnut } from 'vue-chartjs';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

  const chartRef = ref();
  const chartSize = ref<{ height: number; width: number }>({ height: 0, width: 0 });

  const donneesConsommation = [
    { color: '#FF9239', emoji: '🔥', id: 'chauffage', label: 'Chauffage', value: 0.59, pourcentage: '59%' },
    { color: '#98CCFF', emoji: '🛁', id: 'eau-chaude', label: 'Eau chaude', value: 0.24, pourcentage: '24%' },
    { color: '#77F2B2', emoji: '✳️', id: 'autres', label: 'Autres', value: 0.07, pourcentage: '7%' },
    { color: '#A8C6E5', emoji: '🍳', id: 'cuisson', label: 'Cuisson', value: 0.03, pourcentage: '3%' },
    { color: '#AEF372', emoji: '🧺', id: 'electromenager', label: 'Électroménager', value: 0.03, pourcentage: '3%' },
    { color: '#FFC739', emoji: '💡', id: 'eclairage', label: 'Éclairage', value: 0.02, pourcentage: '2%' },
    { color: '#C1BEFF', emoji: '📺', id: 'multimedia', label: 'Multimédia', value: 0.02, pourcentage: '2%' },
  ];

  const data = {
    labels: donneesConsommation.map(c => c.label),
    datasets: [
      {
        data: donneesConsommation.map(c => c.value),
        backgroundColor: donneesConsommation.map(c => c.color),
        borderRadius: 10,
        spacing: 2,
      },
    ],
  };

  const options = {
    events: [],
    cutout: '90%',
    radius: '80%',
    plugins: {
      legend: {
        display: false,
      },
    },
    emojiLabels: ['🔥', '🛁', '✳️', '🍳', '🧺', '📺', '💡'],
  };

  onMounted(async () => {
    await nextTick();
    chartSize.value = {
      height: chartRef.value.$el.clientHeight,
      width: chartRef.value.$el.clientWidth,
    };
  });

  const bubbleStyle = (index: number, color: string) => {
    const radius = Math.max(chartSize.value.width, chartSize.value.height) / 2 - 5;
    const total = donneesConsommation.reduce((sum, item) => sum + item.value, 0);

    const valueBefore = donneesConsommation.slice(0, index).reduce((sum, item) => sum + item.value, 0);
    const currentValue = donneesConsommation[index].value;

    const angle = ((valueBefore + currentValue / 2) / total) * 2 * Math.PI - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      backgroundColor: color,
      'z-index': donneesConsommation.length - index,
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
    background-color: v-bind('donneesConsommation[0].color');
  }
  .disc-eau-chaude::before {
    background-color: v-bind('donneesConsommation[1].color');
  }
  .disc-autres::before {
    background-color: v-bind('donneesConsommation[2].color');
  }
  .disc-cuisson::before {
    background-color: v-bind('donneesConsommation[3].color');
  }
  .disc-electromenager::before {
    background-color: v-bind('donneesConsommation[4].color');
  }
  .disc-eclairage::before {
    background-color: v-bind('donneesConsommation[5].color');
  }
  .disc-multimedia::before {
    background-color: v-bind('donneesConsommation[6].color');
  }
</style>
