<template>
  <div class="jauge-container" :aria-label="`Jauge de ${libelle} - ${valeurToWidth(valeur)} rempli`">
    <div class="fr-text--sm fr-mb-0 fr-text--bold">{{ libelle }}</div>
    <div class="jauge-background fr-ml-5v">
      <div
        class="jauge-remplissage"
        aria-hidden="true"
        :aria-valuenow="valeurToWidth(valeur)"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ position: 'static', width: valeurToWidth(valeur) + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    valeur: {
      type: Number,
      required: true,
      validator: (value: number) => value >= 0 && value <= 4,
    },
    libelle: {
      type: String,
      required: true,
    },
  });

  function valeurToWidth(valeur) {
    switch (valeur) {
      case 1:
        return 6;
      case 2:
        return 35;
      case 3:
        return 70;
      case 4:
        return 100;
    }
  }

  function valeurToColor(valeur) {
    switch (valeur) {
      case 1:
        return '#2B126C';
      case 2:
        return '#6C1E4E';
      case 3:
        return '#962B44';
      case 4:
        return '#E32416';
    }
  }
</script>

<style scoped>
  :root {
  }
  .jauge-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .jauge-background {
    background: linear-gradient(0deg, #dddddd, #dddddd), linear-gradient(0deg, #d9d9d9, #d9d9d9);
    width: 100%;
    height: 20px;
    border-radius: 10px;
    max-width: var(--widthJaugeOnboarding);
  }

  .jauge-remplissage {
    --jauge-color: v-bind(valeurToColor(props.valeur));
    background: linear-gradient(270deg, var(--jauge-color) 0%, #000091 100%), linear-gradient(0deg, #ffffff, #ffffff);
    height: 100%;
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 1);
  }
</style>
