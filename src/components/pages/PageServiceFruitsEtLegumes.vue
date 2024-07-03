<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement en cours ...</div>
    <p v-else-if="!serviceFruitsEtLegumesViewModel">Problème de chargement de donées</p>
    <div v-else>
      <FilDAriane
        page-courante="Service : fruits et légumes"
        :page-hierarchie="[{ label: 'Vos services', url: RouteCoachName.SERVICES }]"
      />
      <h1 class="fr-h2">
        Les fruits et légumes pour le mois de
        {{ serviceFruitsEtLegumesViewModel.categories.find(elem => elem.estLaCategorieParDefaut)?.label }}
      </h1>
      <select class="fr-select" id="categories" name="categories" @input="updateMois">
        <option
          v-for="categorie in serviceFruitsEtLegumesViewModel.categories"
          :key="categorie.code"
          :value="categorie.code"
          :selected="categorie.estLaCategorieParDefaut"
        >
          {{ categorie.label }}
        </option>
      </select>
      <PageServiceTemplate :aside="serviceFruitsEtLegumesViewModel.aside">
        <ServiceListeFruitsEtLegumes
          titre="Peu consommateurs"
          sous-titre="Moins de 1 kg CO₂e par kg"
          :liste="serviceFruitsEtLegumesViewModel.peuConsommateurs"
        />
        <ServiceListeFruitsEtLegumes
          titre="Moyennement consommateurs"
          sous-titre="Entre 1 et 5 kg CO₂e par kg"
          :liste="serviceFruitsEtLegumesViewModel.moyennementConsommateurs"
        />
        <ServiceListeFruitsEtLegumes
          titre="Consommateurs"
          sous-titre="Plus de 5 kg CO₂e par kg"
          :liste="serviceFruitsEtLegumesViewModel.tresConsommateurs"
        />
      </PageServiceTemplate>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceListeFruitsEtLegumes from '@/components/custom/Service/ServiceListeFruitsEtLegumes.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    ServiceFruitsEtLegumesViewModel,
    ServiceRechercheFruitsEtLegumesPresenterImpl,
  } from '@/domaines/serviceRecherche/adapters/serviceRechercheFruitsEtLegumes.presenter.impl';
  import { ServiceRechercheFruitsEtLegumesAxios } from '@/domaines/serviceRecherche/adapters/serviceRechercheFruitsEtLegumes.repository.axios';
  import { RecupererServiceFruitsEtLegumesUsecase } from '@/domaines/serviceRecherche/recupererServiceFruitsEtLegumes.usecase';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const serviceFruitsEtLegumesViewModel = ref<ServiceFruitsEtLegumesViewModel>();

  const usecase = new RecupererServiceFruitsEtLegumesUsecase(new ServiceRechercheFruitsEtLegumesAxios());

  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      '',
      new ServiceRechercheFruitsEtLegumesPresenterImpl(vm => (serviceFruitsEtLegumesViewModel.value = vm)),
    );

    isLoading.value = false;
  });

  const updateMois = async (event: Event) => {
    const inputElement = event.target as HTMLInputElement;

    usecase.execute(
      utilisateurStore().utilisateur.id,
      inputElement.value,
      new ServiceRechercheFruitsEtLegumesPresenterImpl(vm => (serviceFruitsEtLegumesViewModel.value = vm)),
    );
  };
</script>
