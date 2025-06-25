<template>
  <div>
    <div class="cercle-vert"></div>

    <p class="completion flex flex-column align-items--center text--center text--bold fr-mb-0 text--lh-1">
      <span class="text--4xl">{{ tonnes }}</span>
      <span class="fr-text--lg fr-mb-0 display-block">tonnes</span>
      <span class="text--normal" aria-label="de CO2 équivalent par an">de CO2e par an</span>
    </p>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="progress-bar-incurve"
      width="113"
      height="39"
      viewBox="0 0 113 39"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="degrade_progressbar" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ACECAE" />
          <stop offset="0.466" stop-color="#FFD793" />
          <stop offset="1" stop-color="#F97483" />
        </linearGradient>

        <linearGradient id="degrade_goutte" x1="9.74" y1="0.76" x2="7" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#005545" />
          <stop offset="1" stop-color="#001712" />
        </linearGradient>
      </defs>

      <path
        ref="arcProgressionPath"
        d="M3 36C13.002 16.3993 33.2053 3 56.5 3C79.7947 3 99.998 16.3993 110 36"
        stroke="url(#degrade_progressbar)"
        stroke-width="6"
        stroke-linecap="round"
      />

      <g v-if="dropPosition">
        <g :transform="`translate(${dropPosition.x}, ${dropPosition.y}) rotate(${dropRotation})`">
          <path
            d="M4.13184 0.130859L7.34024 7.131C8.41172 9.46879 6.70347 12.1309 4.13184 12.1309V12.1309C1.5602 12.1309 -0.148048 9.46879 0.923437 7.131L4.13184 0.130859Z"
            fill="url(#degrade_goutte)"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed, watch } from 'vue';

  const props = defineProps<{ tonnes: number }>();

  const TONNES_POUR_ATTEINDRE_100POURCENT = 12;
  const DELTA_TANGENTE = 0.5;

  const arcProgressionPath = ref<SVGPathElement>();
  const dropPosition = ref<{ x: number; y: number } | null>(null);
  const dropRotation = ref<number>(0);

  const arcTotalLength = computed(() => {
    return arcProgressionPath.value?.getTotalLength();
  });

  const calculerPositionGoutte = () => {
    if (!arcTotalLength.value || !arcProgressionPath.value) return;

    const path = arcProgressionPath.value;

    const userTonnesBornees = Math.max(0, Math.min(props.tonnes, TONNES_POUR_ATTEINDRE_100POURCENT));
    const pourcentageProgressBar = userTonnesBornees / TONNES_POUR_ATTEINDRE_100POURCENT;
    const avancementSurPath = arcTotalLength.value * pourcentageProgressBar;

    const pointPrecedent = path?.getPointAtLength(Math.max(0, avancementSurPath - DELTA_TANGENTE));
    const point = path?.getPointAtLength(avancementSurPath);
    const pointSuivant = path?.getPointAtLength(Math.min(arcTotalLength.value, avancementSurPath + DELTA_TANGENTE));

    const angleDeduit =
      Math.atan2(pointSuivant.y - pointPrecedent.y, pointSuivant.x - pointPrecedent.x) * (180 / Math.PI);

    dropPosition.value = { x: point.x, y: point.y };
    dropRotation.value = angleDeduit;
  };

  watch(() => props.tonnes, calculerPositionGoutte);

  onMounted(() => {
    calculerPositionGoutte();
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
    right: 0.2rem;
    bottom: 15%;
  }
</style>
