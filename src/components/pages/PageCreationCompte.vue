<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
      <div class="fr-col-12 fr-col-lg-7">
        <CreationCompteAccroche />
      </div>
      <div class="fr-col-12 fr-col-lg-5">
        <div class="fr-mb-0 background--white fr-p-3w border border-radius--md">
          <CreationCompteFormulaire />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CreationCompteFormulaire from '@/components/custom/CreationCompte/CreationCompteFormulaire.vue';
  import CreationCompteAccroche from '@/components/custom/CreationCompte/CreationCompteAccroche.vue';
</script>
