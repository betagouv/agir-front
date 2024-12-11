<template>
  <div class="fr-container">
    <FilDAriane
      page-courante="Service : recettes"
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

    <ServiceSkeletonConditionnel :is-loading="isLoading" :view-model-existe="serviceRecettesViewModel !== undefined">
      <h1 class="fr-h2">
        Recettes
        <ServiceSelect
          id="mois"
          :options="serviceRecettesViewModel!.categories"
          @update="updateType"
          label="Choisir un type"
        />
      </h1>

      <PageServiceTemplate :aside="serviceRecettesViewModel!.aside">
        <section v-if="serviceRecettesViewModel!.favoris" class="fr-pb-6w">
          <ServiceFavoris
            titre="Mes recettes favorites"
            :services-recherche-favoris-view-model="serviceRecettesViewModel!.favoris"
          />
        </section>
        <section v-if="serviceRecettesViewModel!.suggestions">
          <h2 class="fr-h3">Suggestions</h2>
          <ServiceListeCarte :suggestions-service-view-model="serviceRecettesViewModel!.suggestions" />
          <button
            v-if="serviceRecettesViewModel!.plusDeResultatsDisponibles"
            class="fr-link text--underline"
            @click="chargerPlusDeRecettes()"
          >
            Voir plus de recettes
          </button>
        </section>
      </PageServiceTemplate>
    </ServiceSkeletonConditionnel>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceFavoris from '@/components/custom/Service/ServiceFavoris.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import ServiceSkeletonConditionnel from '@/components/custom/Service/ServiceSkeletonConditionnel.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    ServiceRechercheRecettesViewModel,
    ServiceRechercheRecettesPresenterImpl,
  } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.presenter.impl';
  import { ServiceRechercheRecettesAxios } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.repository.axios';
  import { RecupererServiceRecettesUsecase } from '@/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const isLoadingMore = ref<boolean>(false);
  const serviceRecettesViewModel = ref<ServiceRechercheRecettesViewModel>();

  const usecase = new RecupererServiceRecettesUsecase(new ServiceRechercheRecettesAxios());

  let nombreMaxResultats = 10;
  const typeDeRecettes = ref<string>('saison');

  onMounted(() => {
    lancerRecherche();
  });

  const lancerRecherche = async () => {
    isLoading.value = true;
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      typeDeRecettes.value,
      nombreMaxResultats,
      new ServiceRechercheRecettesPresenterImpl(vm => {
        serviceRecettesViewModel.value = vm;
      }),
    );
    isLoading.value = false;
  };

  const chargerPlusDeRecettes = async () => {
    isLoadingMore.value = true;
    nombreMaxResultats += 10;
    await lancerRecherche();
    isLoadingMore.value = false;
  };

  const updateType = (type: string) => {
    nombreMaxResultats = 10;
    typeDeRecettes.value = type;
    lancerRecherche();
  };
</script>
