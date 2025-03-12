<template>
  <section v-if="serviceFruitsEtLegumesViewModel.length > 0">
    <div class="flex flex-space-between align-items--center fr-mb-3w flex-wrap">
      <h2 class="fr-h3 fr-mb-0">
        Les fruits et légumes de
        <span class="text--bleu">{{ moisCourantLabel }}</span>
      </h2>
      <router-link
        class="fr-link fr-mr-1w"
        :to="{
          name: RouteServiceName.FRUITS_ET_LEGUMES,
          params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url },
        }"
        >Voir tout
      </router-link>
    </div>
    <div class="flex">
      <ul class="fr-grid-row list-style-none">
        <li
          v-for="item in serviceFruitsEtLegumesViewModel"
          :key="item.nom"
          class="fr-col-6 fr-col-lg-4 fr-pb-1w fr-pr-1w"
        >
          <div class="flex flex-space-between shadow--light background--white border--gris fr-p-3v">
            <span class="fr-ellipsis">{{ item.nom }}</span>
            <img v-if="item.urlImage" :src="item.urlImage" alt="" height="22" />
          </div>
        </li>
      </ul>
    </div>
  </section>
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
