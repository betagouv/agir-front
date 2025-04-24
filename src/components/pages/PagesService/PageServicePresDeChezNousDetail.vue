<template>
  <div class="fr-container fr-pb-4w" v-if="detailServiceViewModel">
    <router-link
      class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-icon-arrow-left-line fr-pl-0 fr-my-2w"
      :to="{ path: useNavigationStore().pagePrecedente.path, query: useNavigationStore().pagePrecedente.query }"
    >
      Retour
    </router-link>
    <img class="display-block fr-mb-2w" alt="" v-if="detailServiceViewModel?.img" :src="detailServiceViewModel?.img" />
    <div class="fr-mt-auto">
      <span
        v-if="detailServiceViewModel.tag"
        :class="`fr-tag fr-text--xs fr-mr-2w ${detailServiceViewModel.tag.style}`"
      >
        {{ detailServiceViewModel.tag.label }}
      </span>
    </div>
    <h1 class="fr-mt-2w">{{ detailServiceViewModel.titre }}</h1>
    <p v-if="detailServiceViewModel.description">{{ detailServiceViewModel.description }}</p>
    <div class="map-container" v-if="detailServiceViewModel.position">
      <LMap
        :useGlobalLeaflet="false"
        ref="map"
        :zoom="100"
        :center="[detailServiceViewModel.position.latitude, detailServiceViewModel.position.longitude]"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></LTileLayer>
        <LMarker :lat-lng="[detailServiceViewModel.position?.latitude, detailServiceViewModel.position?.longitude]" />
      </LMap>
    </div>
    <h2 class="fr-h3 fr-mt-4w">Détails</h2>
    <div class="fr-grid-row flex-column fr-mb-4w">
      <span v-if="detailServiceViewModel.heuresOuvertures" class="fr-icon-time-line text--bleu">
        <span class="fr-ml-1w text--black"> {{ detailServiceViewModel.heuresOuvertures }}</span>
      </span>
      <span v-if="detailServiceViewModel.adresse" class="fr-icon-map-pin-2-line text--bleu fr-mt-1w">
        <span class="fr-ml-1w text--black"> {{ detailServiceViewModel.adresse }}</span>
      </span>
      <span v-if="detailServiceViewModel.telephone" class="fr-icon-phone-line text--bleu fr-mt-1w">
        <span class="fr-ml-1w text--black"> {{ detailServiceViewModel.telephone }}</span>
      </span>
    </div>
    <a class="fr-link width--auto" :href="detailServiceViewModel.siteWeb" target="_blank" rel="noopener noreferrer"
      >En savoir plus</a
    >
  </div>
</template>

<script setup lang="ts">
  import 'leaflet/dist/leaflet.css';
  import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { ServiceRecherchePresDeChezNousAxios } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.repository.axios';
  import {
    DetailServiceViewModel,
    ServiceRecherchePresDeChezNousPresenterDetailImpl,
  } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNousDetail.presenter.impl';
  import { RecupererDetailServicePresDeChezNousUsecase } from '@/domaines/serviceRecherche/presDeChezNous/recupererDetailServicePresDeChezNous.usecase';
  import { useNavigationStore } from '@/store/navigationStore';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const detailServiceViewModel = ref<DetailServiceViewModel>();

  const usecase = new RecupererDetailServicePresDeChezNousUsecase(new ServiceRecherchePresDeChezNousAxios());

  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      useRoute().params.id as string,
      new ServiceRecherchePresDeChezNousPresenterDetailImpl(vm => (detailServiceViewModel.value = vm)),
    );

    isLoading.value = false;
  });
</script>
<style scoped>
  .map-container {
    height: 50vh;
    width: 70%;
  }

  .leaflet-container * {
    background-image: none;
  }
</style>
