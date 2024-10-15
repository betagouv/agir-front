<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-lg-7 fr-col-xl-8 fr-col-12 breakpoint-order-2">
        <div class="background--white fr-p-3w border border-radius--md">
          <CreationCompteFormulaireDepuisNGC />
        </div>
      </div>

      <div class="fr-col-12 fr-col-lg-5 fr-col-xl-4">
        <aside class="full-width background--vert border-radius--md fr-mb-2w text--white fr-px-4w fr-pt-2w fr-pb-1v">
          <p class="fr-text--xl fr-m-0 text--bold">Avec <span class="text--italic">J’agis...</span></p>
          <ul class="fr-ml-3w fr-p-0">
            <li>
              <strong class="text--bold">Réduisez votre empreinte</strong> carbone grâce à nos conseils
              ultra-personnalisés
            </li>
            <li>Obtenez des <strong class="text--bold">solutions locales</strong></li>
            <li>Découvrez les <strong class="text--bold">aides financières</strong> auxquelles vous avez droit</li>
            <li>Et bien plus encore...</li>
          </ul>
        </aside>
        <AsideNGC class="fr-hidden fr-unhidden-lg" />
      </div>
    </div>
    <AsideNGC class="fr-hidden-lg" />
  </div>
</template>

<script setup lang="ts">
  import AsideNGC from '@/components/custom/CreationCompte/AsideNGC.vue';
  import CreationCompteFormulaireDepuisNGC from '@/components/custom/CreationCompte/CreationCompteFormulaireDepuisNGC.vue';
</script>

<style scoped>
  @media (max-width: 991px) {
    .breakpoint-order-2 {
      order: 2;
    }
  }
</style>
