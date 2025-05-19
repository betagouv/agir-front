<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-lg-7 fr-col-xl-8 fr-col-12 breakpoint-order-2">
        <div class="background--white fr-p-3w border">
          <CreationCompteFormulaireDepuisNGC />
        </div>
      </div>

      <div class="fr-col-12 fr-col-lg-5 fr-col-xl-4">
        <aside class="full-width background--vert fr-mb-2w text--white fr-px-2w fr-pt-2w fr-pb-1w">
          <h3 class="fr-h4 fr-mb-1w text--bold text--white">Avec <span class="text--italic">J’agis...</span></h3>
          <ul class="fr-p-0 list-style-none">
            <li class="fr-mb-1w">
              🌱 <strong class="text--bold">Réduisez votre empreinte</strong> carbone grâce à nos conseils
              ultra-personnalisés
            </li>
            <li class="fr-mb-1v">🇫🇷 Obtenez des <strong class="text--bold">solutions locales</strong></li>
            <li class="fr-mb-1v">
              💶 Découvrez les <strong class="text--bold">aides financières</strong> auxquelles vous avez droit
            </li>
            <li class="fr-mb-1v">Et bien plus encore...</li>
          </ul>
        </aside>
        <AsideNGC class="fr-hidden fr-unhidden-lg" />
      </div>
    </div>
    <AsideNGC class="fr-hidden-lg" />
  </div>
</template>

<script lang="ts" setup>
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
