<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement en cours ...</div>
    <p v-else-if="!serviceRechercheViewModel">Problème de chargement de donées</p>
    <div v-else>
      <FilDAriane
        page-courante="Service : Près de chez nous"
        :page-hierarchie="[{ label: 'Vos services', url: RouteCoachName.SERVICES }]"
      />
      <select class="fr-select" id="categories" name="categories" @input="updateFiltre">
        <option
          v-for="categorie in serviceRechercheViewModel.categories"
          :key="categorie.code"
          :value="categorie.code"
          :selected="categorie.estLaCategorieParDefaut"
        >
          {{ categorie.label }}
        </option>
      </select>
      <h1 class="fr-h2">à proximité de chez vous</h1>
      <p>Produits locaux, bio, de saisons et vendeurs de vrac, pour une cuisine savoureuse et responsable</p>
      <PageServiceTemplate :aside="serviceRechercheViewModel.aside">
        <section v-if="serviceRechercheViewModel.favoris">
          <ServiceCarousel :services-recherche-favoris-view-model="serviceRechercheViewModel.favoris" />
        </section>
        <section v-if="serviceRechercheViewModel.suggestions" class="fr-py-6w">
          <ServiceListeCarte :suggestions-service-view-model="serviceRechercheViewModel.suggestions" />
        </section>
      </PageServiceTemplate>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceCarousel from '@/components/custom/Service/ServiceCarousel.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    ServiceRecherchePresDeChezNousPresenterImpl,
    ServiceRecherchePresDeChezNousViewModel,
  } from '@/domaines/serviceRecherche/adapters/serviceRecherchePresDeChezNous.presenter.impl';
  import { ServiceRecherchePresDeChezNousAxios } from '@/domaines/serviceRecherche/adapters/serviceRecherchePresDeChezNous.repository.axios';
  import { RecupererServicePresDeChezNousUsecase } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const serviceRechercheViewModel = ref<ServiceRecherchePresDeChezNousViewModel>();

  const usecase = new RecupererServicePresDeChezNousUsecase(new ServiceRecherchePresDeChezNousAxios());

  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      '',
      new ServiceRecherchePresDeChezNousPresenterImpl(vm => (serviceRechercheViewModel.value = vm)),
    );

    isLoading.value = false;
  });

  const updateFiltre = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    usecase.execute(
      utilisateurStore().utilisateur.id,
      inputElement.value,
      new ServiceRecherchePresDeChezNousPresenterImpl(vm => (serviceRechercheViewModel.value = vm)),
    );
  };
</script>
