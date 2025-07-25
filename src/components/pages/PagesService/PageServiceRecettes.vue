<template>
  <div class="fr-container">
    <ServiceSkeletonConditionnel :is-loading="pageEstEnChargement" :view-model-existe="viewModel !== undefined">
      <PageServiceTemplate :aside="viewModel!.aside">
        <h1 class="fr-h2">
          Recettes
          <ServiceSelect
            id="mois"
            :code-derniere-recherche-type="categorie"
            :options="viewModel!.categories"
            label="Choisir un type"
            @update="modifierType"
          />
        </h1>

        <section v-if="viewModel!.favoris" class="fr-pb-6w">
          <ServiceFavoris :services-recherche-favoris-view-model="viewModel!.favoris" titre="Mes recettes favorites" />
        </section>

        <section v-if="viewModel!.suggestions">
          <h2 class="fr-h3">Suggestions</h2>
          <ServiceListeCarte
            column-class="fr-col-12 fr-col-sm-6 fr-col-md-4"
            :is-recette="true"
            ref="serviceListeCarte"
            :suggestions-service-view-model="viewModel!.suggestions"
          />
          <ServiceSkeletonCartes v-if="cartesSontEnChargement" />
          <button
            v-if="viewModel!.plusDeResultatsDisponibles"
            class="fr-link text--underline"
            @click="chargerPlusDeCartesEtFocus()"
          >
            Voir plus de recettes
          </button>
        </section>
      </PageServiceTemplate>
    </ServiceSkeletonConditionnel>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, ref } from 'vue';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceFavoris from '@/components/custom/Service/ServiceFavoris.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import ServiceSkeletonCartes from '@/components/custom/Service/ServiceSkeletonCartes.vue';
  import ServiceSkeletonConditionnel from '@/components/custom/Service/ServiceSkeletonConditionnel.vue';
  import { useTypeQueryParams } from '@/composables/service/useTypeQueryParams';
  import {
    ServiceRechercheRecettesViewModel,
    ServiceRechercheRecettesPresenterImpl,
  } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.presenter.impl';
  import { ServiceRechercheRecettesAxios } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.repository.axios';
  import { RecupererServiceRecettesUsecase } from '@/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const serviceListeCarte = ref<InstanceType<typeof ServiceListeCarte>>();
  const usecase = new RecupererServiceRecettesUsecase(new ServiceRechercheRecettesAxios());
  const viewModel = ref<ServiceRechercheRecettesViewModel>();

  const {
    categorie,
    nombreDeResultats,
    pageEstEnChargement,
    cartesSontEnChargement,
    chargerPlusDeCartes,
    modifierType,
  } = useTypeQueryParams(lancerRecherche, 'saison');

  async function chargerPlusDeCartesEtFocus() {
    const ancienNombreDeResultats = nombreDeResultats.value;
    await chargerPlusDeCartes();

    await nextTick(() => {
      if (serviceListeCarte.value) {
        serviceListeCarte.value.focusCarteParIndex(ancienNombreDeResultats);
      }
    });
  }

  async function lancerRecherche() {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      { categorie: categorie.value },
      nombreDeResultats.value,
      new ServiceRechercheRecettesPresenterImpl(vm => {
        viewModel.value = vm;
      }),
    );
  }
</script>
