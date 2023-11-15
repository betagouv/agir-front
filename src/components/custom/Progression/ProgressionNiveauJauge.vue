<template>
  <div
    class="fr-grid-row jauge-container"
    :aria-label="`Jauge de prochain niveau - ${valeurToWidth()} pourcent rempli`"
  >
    <div class="fr-text--xs fr-mb-0 fr-text--bold">PROCHAIN NIVEAU</div>
    <div class="jauge-background">
      <div
        class="jauge-remplissage"
        aria-hidden="true"
        :aria-valuenow="valeurToWidth"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ position: 'static', width: valeurToWidth() + '%' }"
      />
    </div>
    <div class="fr-grid-row">
      <span class="fr-text--bold">{{ valeur }}</span>
      <span>/ {{ objectif }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    valeur: {
      type: Number,
      required: true,
    },
    objectif: {
      type: Number,
      required: true,
    },
  });

  function valeurToWidth(): number {
    return (props.valeur / props.objectif) * 100;
  }
</script>

<style scoped>
  .jauge-container {
    display: flex;
    align-items: center;
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
    width: 50%;
    height: 12px;
    border-radius: 10px;
    max-width: var(--widthJaugeOnboarding);
  }

  .jauge-remplissage {
    background-color: var(--blue-france-sun-113-625);
    height: 100%;
    border-radius: 10px;
    border: 2px solid #fff;
  }
</style>
