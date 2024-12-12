<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement en cours ...</div>
    <div v-else>
      <FilDAriane
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
        page-courante="Service : Près de chez nous"
      />
      <div v-if="serviceErreur">
        <h1>Service indisponible</h1>
        <p>{{ serviceErreur }}</p>
      </div>
      <div v-else>
        <h1 class="fr-h2">
          <ServiceSelect
            id="categories"
            :options="(serviceRecherchePresDeChezNousViewModel as ServiceRechercheViewModelBase).categories"
            label="Choisir une catégorie"
            @update="updateType"
          />
          à proximité de chez moi
        </h1>
        <p>Produits locaux, bio, de saisons et vendeurs de vrac, pour une cuisine savoureuse et responsable</p>
        <PageServiceTemplate :aside="(serviceRecherchePresDeChezNousViewModel as ServiceRechercheViewModelBase).aside">
          <div
            v-if="
              (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelSansResultats)
                .aucunResultat
            "
            class="text--center"
          >
            <img alt="" height="250" src="/service_aucun_resultat.svg" />
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
                :services-recherche-favoris-view-model="
                  (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats)
                    .favoris!
                "
                titre="Mes lieux favoris"
              />
            </section>
            <section>
              <h2 class="fr-h3">Suggestions</h2>
              <ServiceListeCarte
                :suggestions-service-view-model="
                  (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats)
                    .suggestions
                "
              />
              <button
                v-if="
                  (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats)
                    .plusDeResultatsDisponibles
                "
                class="fr-link text--underline"
                @click="chargerPlusDeResultats()"
              >
                Voir plus de résultats
              </button>
            </section>
          </div>
        </PageServiceTemplate>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
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
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const serviceRecherchePresDeChezNousViewModel = ref<ServiceRecherchePresDeChezNousViewModel>();

  const usecase = new RecupererServicePresDeChezNousUsecase(new ServiceRecherchePresDeChezNousAxios());

  const serviceErreur = ref<string | null>(null);
  let nombreMaxResultats = 10;
  const typeDeRecherche = ref<string>('');

  async function lancerRecherche() {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      typeDeRecherche.value,
      nombreMaxResultats,
      new ServiceRecherchePresDeChezNousPresenterImpl(
        vm => (serviceRecherchePresDeChezNousViewModel.value = vm),
        error => (serviceErreur.value = error),
      ),
    );

    isLoading.value = false;
  }

  onMounted(async () => {
    await lancerRecherche();
  });

  const chargerPlusDeResultats = () => {
    nombreMaxResultats += 10;
    lancerRecherche();
  };

  const updateType = (type: string) => {
    nombreMaxResultats = 10;
    typeDeRecherche.value = type;
    lancerRecherche();
  };
</script>
