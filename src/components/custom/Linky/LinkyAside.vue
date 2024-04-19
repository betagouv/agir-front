<template>
  <CarteVierge v-if="!estActif" class="fr-mb-2w">
    <h2 class="fr-h4">Paramétrage</h2>
    <p class="fr-mb-0">
      <button class="fr-link" data-fr-opened="false" aria-controls="linkyModale">Paramétrer le service Linky</button>
    </p>
  </CarteVierge>
  <CarteExplication>
    <LinkyExplicationAleatoire class="fr-mt-2w" />
  </CarteExplication>
</template>

<script setup lang="ts">
  import CarteVierge from '@/components/CarteVierge.vue';
  import CarteExplication from '@/components/custom/CarteExplication.vue';
  import LinkyExplicationAleatoire from '@/components/custom/Linky/LinkyExplicationAleatoire.vue';

  defineProps<{
    estActif: boolean;
  }>();
</script>
