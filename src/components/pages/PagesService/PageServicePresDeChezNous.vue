<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement en cours ...</div>
    <div v-else>
      <FilDAriane
        page-courante="Service : Près de chez nous"
        :page-hierarchie="[{ label: 'Univers - En cuisine', url: `${RouteUniversName.UNIVERS}/alimentation` }]"
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
            :options="(serviceRecherchePresDeChezNousViewModel as ServiceRechercheViewModelBase).categories"
            @update="updateType"
          />
          à proximité de chez vous
        </h1>
        <p>Produits locaux, bio, de saisons et vendeurs de vrac, pour une cuisine savoureuse et responsable</p>
        <PageServiceTemplate :aside="(serviceRecherchePresDeChezNousViewModel as ServiceRechercheViewModelBase).aside">
          <div
            class="text--center"
            v-if="
              (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelSansResultats)
                .aucunResultat
            "
          >
            <img src="/service_aucun_resultat.svg" height="250" alt="" />
            <p class="fr-text--lg">😢 Aucun résultat n’est encore disponible pour votre localisation</p>
          </div>
          <div v-else>
            <section
              v-if="
                serviceRecherchePresDeChezNousViewModel &&
                (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats)
                  .favoris
              "
            >
              <ServiceFavoris
                titre="Mes lieux favoris"
                :services-recherche-favoris-view-model="
                  (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats)
                    .favoris!
                "
              />
            </section>
            <section>
              <h2>Suggestions</h2>
              <ServiceListeCarte
                :suggestions-service-view-model="
                  (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats)
                    .suggestions
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
    ServiceRecherchePresDeChezNousPresenterImpl,
    ServiceRecherchePresDeChezNousViewModel,
    ServiceRecherchePresDeChezNousViewModelAvecResultats,
    ServiceRecherchePresDeChezNousViewModelSansResultats,
  } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.presenter.impl';
  import { ServiceRecherchePresDeChezNousAxios } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.repository.axios';
  import { RecupererServicePresDeChezNousUsecase } from '@/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';
  import { RouteUniversName } from '@/router/univers/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const serviceRecherchePresDeChezNousViewModel = ref<ServiceRecherchePresDeChezNousViewModel>();

  const usecase = new RecupererServicePresDeChezNousUsecase(new ServiceRecherchePresDeChezNousAxios());

  const serviceErreur = ref<string | null>(null);

  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      '',
      new ServiceRecherchePresDeChezNousPresenterImpl(
        vm => (serviceRecherchePresDeChezNousViewModel.value = vm),
        error => (serviceErreur.value = error),
      ),
    );

    isLoading.value = false;
  });

  const updateType = async (type: string) => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      type,
      new ServiceRecherchePresDeChezNousPresenterImpl(
        vm => (serviceRecherchePresDeChezNousViewModel.value = vm),
        error => (serviceErreur.value = error),
      ),
    );
    isLoading.value = false;
  };
</script>
