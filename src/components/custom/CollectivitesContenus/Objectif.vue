<template>
  <div class="objectif-card text--white border-radius--md fr-p-5w position--relative">
    <div class="width-container">
      <h2 class="fr-h3 text--white text--lh-0 fr-pt-2w fr-pb-1v">Prochain objectif :</h2>
      <p class="fr-mb-2w fr-text--lg">{{ objectifInscription }} inscrits sur J'agis dans votre commune</p>
      <BarreDeProgression
        label=""
        :value="nombreInscription"
        :value-max="objectifInscription"
        couleur="green"
        class="fr-mb-4w"
      />
      <slot></slot>
    </div>

    <img class="objectif-card--img" src="/nouveau_parcours_escaliers.svg" alt="" />
  </div>
</template>

<script setup lang="ts">
  // TODO: Unused mais sera peut-être utilisé dans le nouveau parcours
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';

  defineProps<{
    objectifInscription: number;
    nombreInscription: number;
  }>();
</script>

<style scoped>
  .objectif-card {
    background: linear-gradient(to left, #80af52, #05312c);
  }

  .objectif-card--img {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 110%;
  }

  .width-container {
    width: 60%;
  }
</style>
