<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement en cours ...</div>
    <p v-else-if="!serviceRecettesViewModel">Problème de chargement de donées</p>
    <div v-else>
      <FilDAriane
        page-courante="Service : recettes"
        :page-hierarchie="[{ label: 'Univers - En cuisine', url: `/${RouteUniversName.UNIVERS}/alimentation` }]"
      />
      <h1 class="fr-h2">
        Recettes
        <ServiceSelect
          id="mois"
          :options="serviceRecettesViewModel.categories"
          @update="updateType"
          label="Choisir un type"
        />
      </h1>
      <PageServiceTemplate :aside="serviceRecettesViewModel.aside">
        <section v-if="serviceRecettesViewModel.favoris" class="fr-pb-6w">
          <ServiceFavoris
            titre="Mes recettes favorites"
            :services-recherche-favoris-view-model="serviceRecettesViewModel.favoris"
          />
        </section>
        <section v-if="serviceRecettesViewModel.suggestions">
          <h2>Suggestions</h2>
          <ServiceListeCarte :suggestions-service-view-model="serviceRecettesViewModel.suggestions" />
          <button
            v-if="serviceRecettesViewModel.plusDeResultatsDisponibles"
            class="fr-link text--underline"
            @click="chargerPlusDeRecettes()"
          >
            Voir plus de recettes
          </button>
        </section>
      </PageServiceTemplate>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceFavoris from '@/components/custom/Service/ServiceFavoris.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    ServiceRechercheRecettesViewModel,
    ServiceRechercheRecettesPresenterImpl,
  } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.presenter.impl';
  import { ServiceRechercheRecettesAxios } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.repository.axios';
  import { RecupererServiceRecettesUsecase } from '@/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';
  import { RouteUniversName } from '@/router/univers/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const serviceRecettesViewModel = ref<ServiceRechercheRecettesViewModel>();
  const typeDeRecettes = ref<string>('saison');
  const usecase = new RecupererServiceRecettesUsecase(new ServiceRechercheRecettesAxios());
  let nombreMaxResultats = 10;
  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      typeDeRecettes.value,
      nombreMaxResultats,
      new ServiceRechercheRecettesPresenterImpl(vm => (serviceRecettesViewModel.value = vm)),
    );

    isLoading.value = false;
  });

  const chargerPlusDeRecettes = () => {
    nombreMaxResultats += 10;
    usecase.execute(
      utilisateurStore().utilisateur.id,
      typeDeRecettes.value,
      nombreMaxResultats,
      new ServiceRechercheRecettesPresenterImpl(vm => (serviceRecettesViewModel.value = vm)),
    );
  };

  const updateType = (type: string) => {
    nombreMaxResultats = 10;
    typeDeRecettes.value = type;
    usecase.execute(
      utilisateurStore().utilisateur.id,
      type,
      nombreMaxResultats,
      new ServiceRechercheRecettesPresenterImpl(vm => (serviceRecettesViewModel.value = vm)),
    );
  };
</script>
