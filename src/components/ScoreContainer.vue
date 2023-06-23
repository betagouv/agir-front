<template>
  <div style="display: flex" class="fr-tile__desc">
    <img src="../../public/leaf.svg" alt="leaf-logo" />
    <p style="font-size: 12px; margin-left: 5px">{{ scoreValue }} points</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "ScoreContainer",
  props: {
    scoreValue: {},
  },
};
</script>

<style scoped></style>
