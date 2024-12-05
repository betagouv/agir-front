<template>
  <div class="flex flex-column">
    <Stepper
      :titre="titre"
      :etape-actuelle="etapeActuelle"
      :etape-totale="etapeTotale"
      :fonction-retour="onClickRevenirEtapePrecedente"
    />
  </div>
</template>

<script setup lang="ts">
  import Stepper from '@/components/dsfr/Stepper.vue';

  defineProps<{
    titre: string;
    etapeTotale: number;
    etapeActuelle: number;
    onClickRevenirEtapePrecedente: () => void;
  }>();
</script>
