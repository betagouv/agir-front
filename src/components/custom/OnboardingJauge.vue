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
  defineProps({
    valeur: {
      type: Number,
      required: true,
      validator: value => value >= 0 && value <= 4,
    },
    libelle: {
      type: String,
      required: true,
    },
  });

  function valeurToWidth(valeur) {
    return (valeur / 4) * 100;
  }
</script>

<style scoped>
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
    background: linear-gradient(270deg, #e42313 0%, #000091 100%), linear-gradient(0deg, #ffffff, #ffffff);
    height: 100%;
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 1);
  }
</style>
