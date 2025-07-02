<template>
  <div class="fr-container">
    <BoutonRetourAutomatique class="fr-my-2w fr-pl-0" />

    <div class="fr-p-4w background--white shadow--light fr-mb-3w" v-if="detailServiceViewModel">
      <h1 class="fr-h2 fr-mb-2w">{{ detailServiceViewModel.titre }}</h1>

      <p class="flex align-items--center">
        <span
          v-if="detailServiceViewModel.tag"
          class="fr-tag fr-text--xs fr-mr-2w"
          :class="`${detailServiceViewModel.tag.style}`"
        >
          {{ detailServiceViewModel.tag.label }}
        </span>

        <span class="fr-sr-only">, situé au</span>

        <span v-if="detailServiceViewModel.adresse" class="fr-icon-map-pin-2-line text--bleu">
          <span class="fr-ml-1w text--black">{{ detailServiceViewModel.adresse }}</span>
        </span>
      </p>

      <div v-if="detailServiceViewModel.position" class="map-container fr-mb-4w">
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
          <LMarker :lat-lng="[detailServiceViewModel.position.latitude, detailServiceViewModel.position.longitude]" />
        </LMap>
      </div>

      <a :href="urlModification" class="fr-btn fr-btn--secondary" rel="noopener noreferrer" target="_blank"
        >Proposer une modification</a
      >
      <div v-if="detailServiceViewModel.sources && detailServiceViewModel.sources.length > 0" class="fr-mt-4w">
        <hr />
        <p v-if="detailServiceViewModel.sources.length === 1" class="fr-text--xs">
          <span class="fr-mr-1w text--bold">Source :</span>
          {{ detailServiceViewModel.sources[0] }}
        </p>
        <div v-else class="fr-text--xs">
          <p class="fr-mr-1w text--bold">Sources :</p>
          <ul>
            <li v-for="source in detailServiceViewModel.sources" :key="source">
              {{ source }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import 'leaflet/dist/leaflet.css';
  import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet';
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import BoutonRetourAutomatique from '@/components/custom/BoutonRetourAutomatique.vue';
  import { ServiceRechercheLongueVieAuxObjetsAxios } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.repository.axios';
  import {
    DetailLVAOViewModel,
    ServiceRechercheLongueVieAuxObjetsPresenterDetailImpl,
  } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjetsDetail.presenter.impl';
  import { RecupererDetailServiceLongueVieAuxObjetsUsecase } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererDetailServiceLongueVieAuxObjets.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const detailServiceViewModel = ref<DetailLVAOViewModel>();

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
