<template>
  <FilDAriane page-courante="Services" :page-hierarchie="[{ label: 'Coach', url: 'coach' }]" />
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-3">
      <span class="fr-h4">Filtres</span>
      <InputCheckbox
        class="fr-mt-1w"
        id="thematiques"
        label="Catégories affichées"
        :options="optionsCheckbox"
        @update="handleValueChange"
      />
    </div>
    <div class="fr-col-12 fr-col-lg-9">
      <h1 class="fr-h2">Services</h1>
      <p>Transformez vos trajets en actes éco-responsables pour préserver la planète.</p>
      <p>
        Rejoignez notre programme d'amélioration de l'impact environnemental sur vos déplacements quotidiens et soyez un
        héros pour l'environnement !
      </p>
      <div
        v-for="serviceCatalogueViewModel in serviceCatalogueViewModels.catalogue"
        :key="serviceCatalogueViewModel.id"
      >
        <div
          v-if="serviceCatalogueViewModel.thematiques.some(thematique => categoriesActives.includes(thematique))"
          class="fr-p-2w fr-mb-2w background--white border border-radius--md"
        >
          <div class="fr-grid-row fr-col-12">
            <div class="fr-hidden fr-unhidden-md fr-mr-1w">
              <img class="img-icon-rounded" :src="serviceCatalogueViewModel.icon" alt="" width="70" height="70" />
            </div>
            <div class="fr-grid-row flex-space-between flex-column fr-ml-1w fr-ml-md-0">
              <div class="fr-mb-1v fr-m-md-0">
                <span
                  v-for="thematique in serviceCatalogueViewModel.thematiques"
                  :key="thematique"
                  class="fr-mr-1w fr-text--bold text--xs text--lh-0"
                >
                  {{ thematique }}
                </span>
              </div>
              <span class="fr-mb-1v fr-m-md-0 fr-text--bold fr-text--xl text--lh-1">{{
                serviceCatalogueViewModel.titre
              }}</span>
              <span class="fr-m-md-0 fr-text--xs fr-text-mention--grey fr-icon-group-line fr-icon--xs">
                {{ serviceCatalogueViewModel.nombreInstallation }}
              </span>
            </div>
            <div class="fr-grid-row--top fr-grid-row--right fr-grid-row fr-ml-auto">
              <button
                v-if="serviceCatalogueViewModel.estInstalle"
                class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-remove-line fr-btn--sm"
              >
                Enlever
              </button>
              <button v-else class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-download-line fr-btn--sm">
                Installer
              </button>
            </div>
          </div>

          <div class="fr-grid-row fr-col-12 fr-mt-2w">
            <div class="fr-col-6">
              <img class="img-illustration" :src="serviceCatalogueViewModel.image" alt="" />
            </div>
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
  </div>
</template>
<script setup lang="ts">
  import { ServiceCatalogueViewModel } from '@/services/adapters/serviceCatalogue.presenter.impl';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import { ref } from 'vue';

  const props = defineProps<{
    serviceCatalogueViewModels: ServiceCatalogueViewModel;
  }>();

  const optionsCheckbox = props.serviceCatalogueViewModels.filtreThematiques.map(option => ({
    id: option,
    label: option,
    checked: true,
  }));

  const categoriesActives = ref<string[]>([]);
  categoriesActives.value = optionsCheckbox.filter(({ checked }) => checked).map(({ id }) => id);

  const handleValueChange = value => {
    categoriesActives.value = value;
  };
</script>
<style scoped>
  .img-icon-rounded {
    display: block;
    border-radius: 10px;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 18, 0.16);
  }

  .img-illustration {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    max-height: 300px;
  }
</style>
