<template>
  <div v-if="detailServiceViewModel" class="fr-container fr-pb-4w">
    <router-link
      class="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-left fr-icon-arrow-left-line fr-pl-0 fr-my-2w"
      to="/thematique/consommer/service/longue-vie-aux-objets"
    >
      Retour
    </router-link>
    <img v-if="detailServiceViewModel.img" :src="detailServiceViewModel.img" alt="" />
    <div class="fr-mt-auto">
      <span
        v-if="detailServiceViewModel.tag"
        :class="`fr-tag fr-text--xs fr-mr-2w ${detailServiceViewModel.tag.style}`"
      >
        {{ detailServiceViewModel.tag.label }}
      </span>
    </div>
    <h1 class="fr-h2 fr-mt-2w">{{ detailServiceViewModel.titre }}</h1>
    <p v-if="detailServiceViewModel.description">{{ detailServiceViewModel.description }}</p>
    <div v-if="detailServiceViewModel.position" class="map-container">
      <LMap
        ref="map"
        :center="[detailServiceViewModel.position.latitude, detailServiceViewModel.position.longitude]"
        :useGlobalLeaflet="false"
        :zoom="100"
      >
        <LTileLayer
          layer-type="base"
          name="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
    <a
      v-if="detailServiceViewModel.siteWeb"
      :href="detailServiceViewModel.siteWeb"
      class="fr-link width--auto"
      rel="noopener noreferrer"
      target="_blank"
      >En savoir plus</a
    >

    <a :href="urlModification" class="fr-btn fr-btn--secondary" rel="noopener noreferrer" target="_blank"
      >Proposer une modification</a
    >
  </div>
</template>

<script lang="ts" setup>
  import 'leaflet/dist/leaflet.css';
  import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet';
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { ServiceRechercheLongueVieAuxObjetsAxios } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.repository.axios';
  import {
    DetailServiceViewModel,
    ServiceRechercheLongueVieAuxObjetsPresenterDetailImpl,
  } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjetsDetail.presenter.impl';
  import { RecupererDetailServiceLongueVieAuxObjetsUsecase } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererDetailServiceLongueVieAuxObjets.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const detailServiceViewModel = ref<DetailServiceViewModel>();

  const usecase = new RecupererDetailServiceLongueVieAuxObjetsUsecase(new ServiceRechercheLongueVieAuxObjetsAxios());

  const urlModification = computed(() => {
    return `https://tally.so/r/3xMqd9?Nom=${detailServiceViewModel.value?.titre}&Ville=&Adresse=${detailServiceViewModel.value?.adresse?.replace(',', '')}`;
  });

  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      useRoute().params.id as string,
      new ServiceRechercheLongueVieAuxObjetsPresenterDetailImpl(vm => (detailServiceViewModel.value = vm)),
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
