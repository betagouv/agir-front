<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-4" v-for="risque in risques" :key="risque.nom">
      <div class="background--white shadow full-height">
        <div class="fr-p-2w position--relative full-height">
          <h4 class="fr-h6" v-text="risque.nom" />
          <span
            v-if="risque.badge"
            :class="`fr-badge ${risque.badge?.class} fr-badge--no-icon`"
            v-text="risque.badge?.label"
          />
          <img class="illustration-risque" :src="risque.illustration" alt="" />
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
    position: absolute;
    width: 38px;
    height: 38px;
    bottom: 1rem;
    right: 1rem;
  }

  .badge--tres-fort {
    background-color: #ffc0b8;
    color: #7b0000;
  }

  .badge--fort {
    background-color: #ffe9e6;
    color: #ce0500;
  }

  .badge--moyen {
    background-color: #fceeac;
    color: #b34000;
  }

  .badge--faible {
    background-color: #ecfcac;
    color: #424f00;
  }

  .badge--tres-faible {
    background-color: #f1faf2;
    color: #006207;
  }
</style>
