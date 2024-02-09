<template>
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
      <ServiceCard
        v-for="service in servicesFiltres"
        :key="service.id"
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
        class="fr-mb-2w"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { ServiceCatalogueViewModel } from '@/services/adapters/serviceCatalogue.presenter.impl';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import ServiceCard from '@/components/custom/Service/ServiceCard.vue';

  const props = defineProps<{ serviceCatalogueViewModels: ServiceCatalogueViewModel }>();

  const optionsCheckbox = props.serviceCatalogueViewModels.filtreThematiques.map(option => ({
    id: option,
    label: option,
    checked: true,
  }));

  const categoriesActives = ref<string[]>([]);
  categoriesActives.value = optionsCheckbox.filter(({ checked }) => checked).map(({ id }) => id);

  const servicesFiltres = computed(() => {
    return props.serviceCatalogueViewModels.catalogue.filter(service =>
      service.thematiques.some(thematique => categoriesActives.value.includes(thematique))
    );
  });

  const handleValueChange = value => (categoriesActives.value = value);
</script>
