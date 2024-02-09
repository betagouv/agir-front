<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-3">
      <h2 class="fr-h4">Filtres</h2>
      <InputCheckbox
        class="fr-mt-1w"
        id="thematiques"
        label="Catégories affichées"
        :options="optionsThematiqueCheckbox"
        @update="handleValueChange"
      />
    </div>
    <div class="fr-col-12 fr-col-lg-9">
      <CatalogueDeServicesCarte
        v-for="service in servicesFiltres"
        :service="service"
        @update:est-installe="updateServiceEstInstalle"
        class="fr-mb-2w"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed } from 'vue';
  import {
    ServiceCatalogueViewModel,
    ServiceCatalogueViewModelItem,
  } from '@/services/adapters/serviceCatalogue.presenter.impl';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import CatalogueDeServicesCarte from '@/components/custom/CatalogueDeServices/CatalogueDeServicesCarte.vue';

  const props = defineProps<{ serviceCatalogueViewModels: ServiceCatalogueViewModel }>();

  const optionsThematiqueCheckbox = props.serviceCatalogueViewModels.filtreThematiques.map(option => ({
    id: option,
    label: option,
    checked: true,
  }));

  const categoriesActives = ref<string[]>([]);
  categoriesActives.value = optionsThematiqueCheckbox.filter(({ checked }) => checked).map(({ id }) => id);

  const servicesFiltres = computed(() => {
    return props.serviceCatalogueViewModels.catalogue.filter(service =>
      service.thematiques.some(thematique => categoriesActives.value.includes(thematique))
    );
  });

  const handleValueChange = value => (categoriesActives.value = value);

  const emit = defineEmits<{ (e: 'update:estInstalle', value: ServiceCatalogueViewModelItem): void }>();
  const updateServiceEstInstalle = (service: ServiceCatalogueViewModelItem) => {
    emit('update:estInstalle', service);
  };
</script>
