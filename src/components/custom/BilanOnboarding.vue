<template>
  <div class="fr-p-3w background--white border-radius--lg">
    <div class="legende fr-text--sm fr-text--bold fr-mb-1v">
      <span class="fr-pl-2w">Faible</span>
      <span class="fr-pr-2w">Très fort</span>
    </div>
    <div class="fr-col-7 fr-ml-auto">
      <div class="legende--jauge fr-grid-row fr-text--sm">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </div>
    </div>
    <div
      v-for="item in [
        { label: '🛒 Consommation', value: 1 },
        { label: '🛒 Consommation', value: 2 },
        { label: '🛒 Consommation', value: 3 },
        { label: '🛒 Consommation', value: 4 },
      ]"
      :key="item.label"
      class="fr-grid-row fr-grid-row--middle"
    >
      <div class="fr-col-5">
        <span class="text--xs fr-text--bold">{{ item.label }}</span>
      </div>
      <div class="fr-col-7">
        <BarreDeProgression
          :label="item.label"
          :value="item.value"
          :valueMax="4"
          :couleur="calculerCouleurJauge(item.value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';
  import { calculerCouleurJauge } from '@/shell/calculerCouleurJauge';
</script>

<style scoped>
  .legende {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    max-width: var(--widthJaugeOnboarding);
  }

  .legende--jauge {
    justify-content: space-between;
    margin-left: auto;
    max-width: var(--widthJaugeOnboarding);
  }

  .legende span::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 11px;
    width: 11px;
    border-radius: 50%;
  }

  .legende span:first-child::before {
    left: 0;
    background: #a3a3cd;
  }

  .legende span:nth-child(2)::before {
    right: 0;
    background-color: var(--blue-france-sun-113-625);
  }
</style>
y
