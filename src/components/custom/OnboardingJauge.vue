<template>
  <div class="jauge-container" :aria-label="`Jauge de ${libelle} - ${valeurToWidth(valeur)} rempli`">
    <div class="fr-text--sm fr-mb-0 fr-text--bold fr-mr-5v">{{ libelle }}</div>
    <div class="jauge-background">
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
        return '#A3A3CD';
      case 2:
        return '#8080BC';
      case 3:
        return '#5C5CAB';
      case 4:
        return '#000091';
    }
  }
</script>

<style scoped>
  .jauge-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    .jauge-container {
      flex-direction: row;
      align-items: center;
    }
  }

  .jauge-background {
    background-color: #dddddd;
    width: 100%;
    height: 20px;
    border-radius: 10px;
    max-width: var(--widthJaugeOnboarding);
  }

  .jauge-remplissage {
    --jauge-color: v-bind(valeurToColor(props.valeur));
    background-color: var(--jauge-color);
    height: 100%;
    border-radius: 10px;
    border: 2px solid #fff;
  }
</style>
