<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement en cours ...</div>
    <div v-else>
      <FilDAriane
        page-courante="Service : Longue vie aux objets"
        :page-hierarchie="[{ label: 'Univers - Mes achats', url: `/${RouteUniversName.UNIVERS}/consommation` }]"
      />
      <div v-if="serviceErreur">
        <h1>Service indisponible</h1>
        <p>{{ serviceErreur }}</p>
      </div>
      <div v-else>
        <h1 class="fr-h2">
          <ServiceSelect
            id="categories"
            label="Choisir une catégorie"
            :options="(serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheViewModelBase).categories"
            @update="updateType"
          />
          à proximité de chez moi
        </h1>
        <p>Produits locaux, bio, de saisons et vendeurs de vrac, pour une cuisine savoureuse et responsable</p>
        <PageServiceTemplate
          :aside="(serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheViewModelBase).aside"
        >
          <div
            class="text--center"
            v-if="
              (serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelSansResultats)
                .aucunResultat
            "
          >
            <img src="/service_aucun_resultat.svg" height="250" alt="" />
            <p class="fr-text--lg">😢 Aucun résultat n’est encore disponible pour votre localisation</p>
          </div>
          <div v-else>
            <section
              v-if="
                serviceRechercheLongueVieAuxObjetsViewModel &&
                (
                  serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats
                ).favoris
              "
            >
              <ServiceFavoris
                titre="Mes lieux favoris"
                :services-recherche-favoris-view-model="
                  (
                    serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats
                  ).favoris!
                "
              />
            </section>
            <section>
              <h2>Suggestions</h2>
              <ServiceListeCarte
                :suggestions-service-view-model="
                  (
                    serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats
                  ).suggestions
                "
              />
            </section>
          </div>
        </PageServiceTemplate>
      </div>
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
  import { ServiceRechercheViewModelBase } from '@/domaines/serviceRecherche/catalogue/adapters/serviceRechercheViewModel';
  import {
    ServiceRechercheLongueVieAuxObjetsPresenterImpl,
    ServiceRechercheLongueVieAuxObjetsViewModel,
    ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats,
    ServiceRechercheLongueVieAuxObjetsViewModelSansResultats,
  } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.presenter.impl';
  import { ServiceRechercheLongueVieAuxObjetsAxios } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.repository.axios';
  import { RecupererServiceLongueVieAuxObjetsUsecase } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
  import { RouteUniversName } from '@/router/univers/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const serviceRechercheLongueVieAuxObjetsViewModel = ref<ServiceRechercheLongueVieAuxObjetsViewModel>();

  const usecase = new RecupererServiceLongueVieAuxObjetsUsecase(new ServiceRechercheLongueVieAuxObjetsAxios());

  const serviceErreur = ref<string | null>(null);

  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      '',
      new ServiceRechercheLongueVieAuxObjetsPresenterImpl(
        vm => (serviceRechercheLongueVieAuxObjetsViewModel.value = vm),
        error => (serviceErreur.value = error),
      ),
    );

    isLoading.value = false;
  });

  const updateType = async (type: string) => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      type,
      new ServiceRechercheLongueVieAuxObjetsPresenterImpl(
        vm => (serviceRechercheLongueVieAuxObjetsViewModel.value = vm),
        error => (serviceErreur.value = error),
      ),
    );
    isLoading.value = false;
  };
</script>
