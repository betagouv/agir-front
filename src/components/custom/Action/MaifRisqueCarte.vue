<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-4" v-for="risque in risques" :key="risque.nom">
      <div class="background--white shadow full-height">
        <div class="background--gris illustration-risque">
          <img src="/maif-risque-defaut.webp" alt="" />
        </div>
        <div class="fr-p-2w">
          <h4 class="fr-h5" v-text="risque.nom" />
          <span
            v-if="risque.badge"
            :class="`fr-badge ${risque.badge?.class} fr-badge--no-icon`"
            v-text="risque.badge?.label"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { SimulateurMaifViewModel } from '@/domaines/simulationMaif/adapters/simulateurMaif.presenter.impl';

  defineProps<{
    risques: SimulateurMaifViewModel['risques'];
  }>();
</script>

<style scoped>
  .illustration-risque {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
  }

  .illustration-risque > img {
    height: fit-content;
    width: 50%;
  }
</style>
