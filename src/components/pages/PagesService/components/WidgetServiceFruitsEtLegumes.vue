<template>
  <div v-if="serviceFruitsEtLegumesViewModel.length > 0" class="fr-container">
    <div class="flex flex-space-between">
      <h2 class="fr-h2">
        Les fruits et légumes pour le mois de
        <span class="text--bleu">{{ moisCourantLabel }}</span>
      </h2>
      <div>
        <router-link
          :to="{
            name: RouteServiceName.FRUITS_ET_LEGUMES,
            params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url },
          }"
          >Voir tout
        </router-link>
      </div>
    </div>
    <div class="flex">
      <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-mb-4w">
        <li v-for="item in serviceFruitsEtLegumesViewModel" :key="item.nom" class="fr-col-6 fr-col-md-4">
          <div class="fr-grid-row flex-space-between shadow--light background--white border--gris fr-p-2w">
            <span>{{ item.nom }}</span>
            <img :src="item.urlImage" alt="" height="24" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { DateTimeTypeScript } from '@/DateTime';
  import { ServiceRechercheFruitsEtLegumesAxios } from '@/domaines/serviceRecherche/fruitsEtLegumes/adapters/serviceRechercheFruitsEtLegumes.repository.axios';
  import {
    ServiceFruitsEtLegumesDetailWidgetViewModel,
    ServiceRechercheFruitsEtLegumesWidgetPresenterImpl,
  } from '@/domaines/serviceRecherche/fruitsEtLegumes/adapters/serviceRechercheFruitsEtLegumesWidget.presenter.impl';
  import { RecupererServiceFruitsEtLegumesUsecase } from '@/domaines/serviceRecherche/fruitsEtLegumes/recupererServiceFruitsEtLegumes.usecase';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RouteServiceName } from '@/router/services/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const usecase = new RecupererServiceFruitsEtLegumesUsecase(new ServiceRechercheFruitsEtLegumesAxios());
  const mois = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];
  const moisCourant = new DateTimeTypeScript().now().getMonth();
  const moisCourantLabel = mois[moisCourant];
  const serviceFruitsEtLegumesViewModel = ref<ServiceFruitsEtLegumesDetailWidgetViewModel[]>([]);
  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      'mars',
      new ServiceRechercheFruitsEtLegumesWidgetPresenterImpl(vm => (serviceFruitsEtLegumesViewModel.value = vm)),
    );

    isLoading.value = false;
  });
</script>
