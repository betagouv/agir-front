<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement en cours ...</div>
    <p v-else-if="!serviceRecherchePresDeChezNousViewModel">Problème de chargement de donées</p>
    <div v-else>
      <FilDAriane
        page-courante="Service : Près de chez nous"
        :page-hierarchie="[{ label: 'Univers - En cuisine', url: `${RouteUniversName.UNIVERS}/alimentation` }]"
      />
      <h1 class="fr-h2">
        <ServiceSelect
          id="categories"
          label="Choisir une catégorie"
          :options="serviceRecherchePresDeChezNousViewModel.categories"
          @update="updateType"
        />
        à proximité de chez vous
      </h1>
      <p>Produits locaux, bio, de saisons et vendeurs de vrac, pour une cuisine savoureuse et responsable</p>
      <PageServiceTemplate :aside="serviceRecherchePresDeChezNousViewModel.aside">
        <section v-if="serviceRecherchePresDeChezNousViewModel.favoris">
          <ServiceCarousel :services-recherche-favoris-view-model="serviceRecherchePresDeChezNousViewModel.favoris" />
        </section>
        <section v-if="serviceRecherchePresDeChezNousViewModel.suggestions" class="fr-py-6w">
          <ServiceListeCarte :suggestions-service-view-model="serviceRecherchePresDeChezNousViewModel.suggestions" />
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
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    ServiceRecherchePresDeChezNousPresenterImpl,
    ServiceRecherchePresDeChezNousViewModel,
  } from '@/domaines/serviceRecherche/adapters/serviceRecherchePresDeChezNous.presenter.impl';
  import { ServiceRecherchePresDeChezNousAxios } from '@/domaines/serviceRecherche/adapters/serviceRecherchePresDeChezNous.repository.axios';
  import { RecupererServicePresDeChezNousUsecase } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';
  import { RouteUniversName } from '@/router/univers/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const serviceRecherchePresDeChezNousViewModel = ref<ServiceRecherchePresDeChezNousViewModel>();

  const usecase = new RecupererServicePresDeChezNousUsecase(new ServiceRecherchePresDeChezNousAxios());

  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      '',
      new ServiceRecherchePresDeChezNousPresenterImpl(vm => (serviceRecherchePresDeChezNousViewModel.value = vm)),
    );

    isLoading.value = false;
  });

  const updateType = (type: string) => {
    usecase.execute(
      utilisateurStore().utilisateur.id,
      type,
      new ServiceRecherchePresDeChezNousPresenterImpl(vm => (serviceRecherchePresDeChezNousViewModel.value = vm)),
    );
  };
</script>
