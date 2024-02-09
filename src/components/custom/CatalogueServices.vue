<template>
  <FilDAriane page-courante="Services" />
  <h1 class="fr-h2">Liste des services</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-3">
      <h2 class="fr-h4">Filtres</h2>
      <InputCheckbox
        class="fr-mt-1w"
        id="thematiques"
        label="Catégories affichées"
        :options="optionsCheckbox"
        @update="handleValueChange"
      />
    </div>
    <div class="fr-col-12 fr-col-lg-9">
      <div v-for="service in serviceCatalogueViewModels.catalogue" :key="service.id">
        <div v-if="service.thematiques.some(thematique => categoriesActives.includes(thematique))">
          <ServiceCard
            :id="service.id"
            :icon="service.icon"
            :image="service.image"
            :thematiques="service.thematiques"
            :estEnConstruction="service.estEnConstruction"
            :estInstalle="service.estInstalle"
            :titre="service.titre"
            :nombreInstallation="service.nombreInstallation"
            :description="service.description"
            :sousDescription="service.sousDescription"
            @refresh-catalogue-services="refreshCatalogueServices"
            class="fr-mb-2w"
          />
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
  import ServiceCard from '@/components/custom/Service/ServiceCard.vue';

  const props = defineProps<{ serviceCatalogueViewModels: ServiceCatalogueViewModel }>();

  const emit = defineEmits<{
    (event: 'refreshCatalogueServices'): void;
  }>();

  const refreshCatalogueServices = () => emit('refreshCatalogueServices');

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
