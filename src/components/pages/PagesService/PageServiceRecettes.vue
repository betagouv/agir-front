<template>
  <div class="fr-container">
    <ServiceSkeletonConditionnel :is-loading="isLoading" :view-model-existe="serviceRecettesViewModel !== undefined">
      <PageServiceTemplate :aside="serviceRecettesViewModel!.aside">
        <h1 class="fr-h2">
          Recettes
          <ServiceSelect
            id="mois"
            :options="serviceRecettesViewModel!.categories"
            @update="updateType"
            label="Choisir un type"
          />
        </h1>

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
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceFavoris from '@/components/custom/Service/ServiceFavoris.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import ServiceSkeletonConditionnel from '@/components/custom/Service/ServiceSkeletonConditionnel.vue';
  import {
    ServiceRechercheRecettesViewModel,
    ServiceRechercheRecettesPresenterImpl,
  } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.presenter.impl';
  import { ServiceRechercheRecettesAxios } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.repository.axios';
  import { RecupererServiceRecettesUsecase } from '@/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const isLoadingMore = ref<boolean>(false);
  const serviceRecettesViewModel = ref<ServiceRechercheRecettesViewModel>();

  const usecase = new RecupererServiceRecettesUsecase(new ServiceRechercheRecettesAxios());

  let nombreMaxResultats = 9;
  const typeDeRecettes = ref<string>('saison');

  onMounted(() => {
    lancerRecherche();
  });

  const lancerRecherche = async () => {
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
    nombreMaxResultats += 9;
    await lancerRecherche();
    isLoadingMore.value = false;
  };

  const updateType = (type: string) => {
    nombreMaxResultats = 9;
    typeDeRecettes.value = type;
    lancerRecherche();
  };
</script>
