<template>
  <FilDAriane page-courante="Services" :page-hierarchie="[{ label: 'Coach', url: 'coach' }]" />
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-3">
      <h2 class="fr-h4">Filtres</h2>
      <p class="text--bold">Catégories affichées</p>
    </div>
    <div class="fr-col-12 fr-col-lg-9">
      <h1 class="fr-h2">Services</h1>
      <p>Transformez vos trajets en actes éco-responsables pour préserver la planète.</p>
      <p>
        Rejoignez notre programme d'amélioration de l'impact environnemental sur vos déplacements quotidiens et soyez un
        héros pour l'environnement !
      </p>
      <div
        class="fr-p-2w fr-mb-2w background--white border border-radius--md"
        v-for="serviceCatalogueViewModel in serviceCatalogueViewModels"
        :key="serviceCatalogueViewModel.id"
      >
        <div class="fr-grid-row">
          <div class="fr-col-md-1">
            <img :src="serviceCatalogueViewModel.icon" alt="" width="64" height="64" />
          </div>
          <div class="fr-ml-1w fr-ml-md-0">
            <div class="fr-grid-row">
              <span
                v-for="thematique in serviceCatalogueViewModel.thematiques"
                :key="thematique"
                class="fr-mr-1w fr-text--bold"
              >
                {{ thematique }}
              </span>
            </div>
            <p class="fr-m-0 fr-text--bold fr-text--xl">{{ serviceCatalogueViewModel.titre }}</p>
            <p class="fr-m-0 fr-text--xs fr-text-mention--grey fr-icon-group-line fr-icon--xs">
              {{ serviceCatalogueViewModel.nombreInstallation }}
            </p>
          </div>
        </div>

        <div class="fr-grid-row fr-col-12 fr-mt-1w">
          <div class="place-holder fr-col-6"></div>
          <div class="fr-col-5 fr-ml-2w">
            <p class="fr-text--bold">Ecowatt aide les Français à mieux consommer l’électricité.</p>
            <p>
              Véritable météo de l’électricité, Ecowatt qualifie en temps réel le niveau de consommation des Français.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ServiceCatalogueViewModel } from '@/services/adapters/serviceCatalogue.presenter.impl';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';

  defineProps<{
    serviceCatalogueViewModels: ServiceCatalogueViewModel[];
  }>();
</script>
<style scoped>
  .place-holder {
    width: 100%;
    background-color: #f6f6f6;
  }
</style>
