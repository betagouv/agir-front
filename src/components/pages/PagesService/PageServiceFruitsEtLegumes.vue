<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement en cours ...</div>
    <p v-else-if="!serviceFruitsEtLegumesViewModel">Problème de chargement de donées</p>
    <div v-else>
      <FilDAriane
        page-courante="Service : fruits et légumes"
        :page-hierarchie="
          useRoute().params.thematiqueId
            ? [
                {
                  label: `${MenuThematiques.getFromUrl(useRoute().params.thematiqueId as string).labelDansLeMenu}`,
                  url: `/thematique/${useRoute().params.thematiqueId}`,
                },
              ]
            : []
        "
      />

      <h1 class="fr-h2">
        Les fruits et légumes pour le mois de
        <ServiceSelect
          id="mois"
          :options="serviceFruitsEtLegumesViewModel.categories"
          @update="updateMois"
          label="Choisir un mois"
        />
      </h1>

      <PageServiceTemplate :aside="serviceFruitsEtLegumesViewModel.aside">
        <Onglet label-aria="Sélection de fruits ou légumes" :tab-panel="['Fruits', 'Légumes']">
          <template v-slot:tab-0>
            <h2 class="fr-h3">Les fruits</h2>
            <ServiceListeFruitsEtLegumes
              v-if="serviceFruitsEtLegumesViewModel.fruits.peuConsommateurs.length > 0"
              titre="Peu consommateurs"
              sous-titre="Moins de 1 kg CO₂e par kg"
              :liste="serviceFruitsEtLegumesViewModel.fruits.peuConsommateurs"
            />
            <ServiceListeFruitsEtLegumes
              v-if="serviceFruitsEtLegumesViewModel.fruits.moyennementConsommateurs.length > 0"
              titre="Moyennement consommateurs"
              sous-titre="Entre 1 et 5 kg CO₂e par kg"
              :liste="serviceFruitsEtLegumesViewModel.fruits.moyennementConsommateurs"
            />
            <ServiceListeFruitsEtLegumes
              v-if="serviceFruitsEtLegumesViewModel.fruits.tresConsommateurs.length > 0"
              titre="Consommateurs"
              sous-titre="Plus de 5 kg CO₂e par kg"
              :liste="serviceFruitsEtLegumesViewModel.fruits.tresConsommateurs"
            />
          </template>
          <template v-slot:tab-1>
            <h2 class="fr-h3">Les légumes</h2>
            <ServiceListeFruitsEtLegumes
              v-if="serviceFruitsEtLegumesViewModel.legumes.peuConsommateurs.length > 0"
              titre="Peu consommateurs"
              sous-titre="Moins de 1 kg CO₂e par kg"
              :liste="serviceFruitsEtLegumesViewModel.legumes.peuConsommateurs"
            />
            <ServiceListeFruitsEtLegumes
              v-if="serviceFruitsEtLegumesViewModel.legumes.moyennementConsommateurs.length > 0"
              titre="Moyennement consommateurs"
              sous-titre="Entre 1 et 5 kg CO₂e par kg"
              :liste="serviceFruitsEtLegumesViewModel.legumes.moyennementConsommateurs"
            />
            <ServiceListeFruitsEtLegumes
              v-if="serviceFruitsEtLegumesViewModel.legumes.tresConsommateurs.length > 0"
              titre="Consommateurs"
              sous-titre="Plus de 5 kg CO₂e par kg"
              :liste="serviceFruitsEtLegumesViewModel.legumes.tresConsommateurs"
            />
          </template>
        </Onglet>
      </PageServiceTemplate>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceListeFruitsEtLegumes from '@/components/custom/Service/ServiceListeFruitsEtLegumes.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import Onglet from '@/components/dsfr/Onglet.vue';
  import {
    ServiceFruitsEtLegumesViewModel,
    ServiceRechercheFruitsEtLegumesPresenterImpl,
  } from '@/domaines/serviceRecherche/fruitsEtLegumes/adapters/serviceRechercheFruitsEtLegumes.presenter.impl';
  import { ServiceRechercheFruitsEtLegumesAxios } from '@/domaines/serviceRecherche/fruitsEtLegumes/adapters/serviceRechercheFruitsEtLegumes.repository.axios';
  import { RecupererServiceFruitsEtLegumesUsecase } from '@/domaines/serviceRecherche/fruitsEtLegumes/recupererServiceFruitsEtLegumes.usecase';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
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

  const updateMois = (mois: string) => {
    usecase.execute(
      utilisateurStore().utilisateur.id,
      mois,
      new ServiceRechercheFruitsEtLegumesPresenterImpl(vm => (serviceFruitsEtLegumesViewModel.value = vm)),
    );
  };
</script>
