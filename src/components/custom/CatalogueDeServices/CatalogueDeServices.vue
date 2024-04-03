<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-3">
      <h2 class="fr-h4">Filtres</h2>
      <InputCheckbox
        class="fr-mt-1w"
        id="thematiques"
        label="Catégories affichées"
        :options="serviceCatalogueViewModels.filtreThematiques"
        @update="handleValueChange"
      />
    </div>
    <div class="fr-col-12 fr-col-lg-9">
      <CatalogueDeServicesCarte
        v-for="service in servicesFiltres"
        :key="service.id"
        :service="service"
        :utilisateur-id="props.utilisateurId"
        @update:est-installe="updateServiceEstInstalle"
        class="fr-mb-2w"
      />
    </div>
  </div>
  <Teleport to="body">
    <Modale
      label="Modale de paramétrage du service Linky"
      id="linky"
      :radius="false"
      :is-footer-actions="false"
      size="m"
    >
      <template v-slot:contenu>
        <ServiceModaleParametreLinky service-id="linky" />
      </template>
    </Modale>
    <button class="fr-btn fr-hidden" data-fr-opened="false" aria-controls="linky">
      Modale paramétrage du service linky
    </button>
  </Teleport>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import {
    ServiceCatalogueViewModel,
    ServiceCatalogueViewModelItem,
  } from '@/services/adapters/serviceCatalogue.presenter.impl';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import CatalogueDeServicesCarte from '@/components/custom/CatalogueDeServices/CatalogueDeServicesCarte.vue';
  import Modale from '@/components/custom/Modale/Modale.vue';
  import ServiceModaleParametreLinky from '@/components/custom/Linky/ServiceModaleParametreLinky.vue';

  const props = defineProps<{ serviceCatalogueViewModels: ServiceCatalogueViewModel; utilisateurId: string }>();

  const categoriesActives = ref<string[]>([]);

  const servicesFiltres = computed(() => {
    if (categoriesActives.value.length === 0) {
      return props.serviceCatalogueViewModels.catalogue;
    }

    return props.serviceCatalogueViewModels.catalogue.filter(service =>
      service.thematiques.some(thematique => categoriesActives.value.includes(thematique)),
    );
  });

  const handleValueChange = value => (categoriesActives.value = value);

  const emit = defineEmits<{ (e: 'update:estInstalle', value: ServiceCatalogueViewModelItem): void }>();
  const updateServiceEstInstalle = (service: ServiceCatalogueViewModelItem) => {
    emit('update:estInstalle', service);
  };
</script>
