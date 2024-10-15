<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-md-8 fr-col-12 fr-mx-auto">
        <div class="background--white fr-p-3w border border-radius--md">
          <CreationCompteFormulaireDepuisNGC />
        </div>
      </div>

      <div class="fr-grid-row fr-col-md-4 fr-col-12">
        <aside>
          <div class="background--vert border-radius--md fr-mb-2w text--white fr-px-4w fr-pt-2w fr-pb-1v">
            <p class="fr-text--xl fr-m-0">
              <span class="text--bold"> Avec <span class="text--italic">J’agis...</span> </span>
            </p>
            <ul class="fr-ml-4w fr-p-0">
              <li>
                <span class="text--bold">Réduisez votre empreinte</span> carbone grâce à nos conseils
                ultra-personnalisés
              </li>
              <li>Obtenez des <span class="text--bold">solutions locales</span></li>
              <li>Découvrez les <span class="text--bold">aides financières</span> auxquelles vous avez droit</li>
              <li>Et bien plus encore...</li>
            </ul>
          </div>
        </aside>
        <aside>
          <div class="background--white background-image-header border-radius--md fr-mb-2w fr-px-4w fr-pt-2w fr-pb-1v">
            <p class="fr-text--xl text--bold">Envie d'en savoir plus ?</p>
            <router-link class="fr-btn fr-btn--secondary" :to="{ path: '/' }">Découvrir</router-link>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CreationCompteFormulaireDepuisNGC from '@/components/custom/CreationCompte/CreationCompteFormulaireDepuisNGC.vue';
</script>

<style>
  .background-image-header {
    --height-background-img-mobile: 20rem;

    background-image: url('/hp-background-header.webp');
    background-repeat: no-repeat;
    background-size: 200px;
    background-position: right bottom;
  }
</style>
