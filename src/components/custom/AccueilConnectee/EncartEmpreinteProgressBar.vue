<template>
  <div>
    <div class="cercle-vert"></div>
    <div class="completion flex flex-column align-items--center">
      <div class="text--bold fr-mb-1w">
        <span class="text--4xl fr-pl-1v">{{ progression }}</span>
        <span class="fr-text--lg">%</span>
      </div>
      <router-link
        :to="{ name: RouteBilanCarboneName.BILAN_CARBONE }"
        class="fr-link fr-link--icon-right full-width fr-icon-arrow-right-line text--white"
        >Compléter
      </router-link>
    </div>

    <svg
      class="progress-bar-incurve"
      width="113"
      height="39"
      viewBox="0 0 113 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 36C13.002 16.3993 33.2053 3 56.5 3C79.7947 3 99.998 16.3993 110 36"
        stroke="#ACECAE"
        stroke-width="6"
        stroke-linecap="round"
      />

      <path
        ref="arcProgressionPath"
        d="M3 36C13.002 16.3993 33.2053 3 56.5 3C79.7947 3 99.998 16.3993 110 36"
        stroke="#69D36C"
        stroke-width="6"
        stroke-linecap="round"
        :stroke-dasharray="arcTotalLength"
        :stroke-dashoffset="arcAvancement"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { RouteBilanCarboneName } from '@/router/bilanCarbone/routes';

  const props = defineProps<{ progression: number }>();

  const MINIMUM_PROGRESSION_AFFICHE = 5;

  const arcProgressionPath = ref<SVGPathElement>();
  const arcTotalLength = computed(() => {
    return arcProgressionPath.value?.getTotalLength();
  });

  const arcAvancement = computed(() => {
    if (!arcTotalLength.value) {
      return 0;
    }

    if (props.progression < MINIMUM_PROGRESSION_AFFICHE) {
      return arcTotalLength.value * (1 - MINIMUM_PROGRESSION_AFFICHE / 100);
    }

    return arcTotalLength.value * (1 - props.progression / 100);
  });
</script>

<style scoped>
  .cercle-vert {
    z-index: 1;
    width: 7.8rem;
    height: 7.8rem;
    border-radius: 50%;
    background-color: var(--custom-background-vert);
    position: absolute;
    bottom: -1rem;
    right: 0;
    clip-path: inset(0 0 50% 0);
  }

  .progress-bar-incurve {
    position: absolute;
    right: 0;
    bottom: 95%;
    z-index: 2;
    margin-right: 6px;
  }

  .completion {
    position: absolute;
    z-index: 3;
    right: 0.5rem;
    bottom: 23%;
  }
</style>
