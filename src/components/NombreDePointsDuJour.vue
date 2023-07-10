<template>
  <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-card-item" id="tile-6538">
    <div style="align-items: flex-start; text-align: left" class="fr-tile__body">
      <h3 class="fr-tile__desc">Vos points du jour</h3>
      <div style="display: flex">
        <img src="/leaf.svg" alt="leaf-logo" />
        <p style="font-weight: bold; font-size: 1.5vh">+ {{ nombreDePointsDuJour }} points</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NombreDePointsDuJour",
  props: {
    nombreDePointsDuJour: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
