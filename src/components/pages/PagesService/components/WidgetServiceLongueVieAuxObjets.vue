<template>
  <div class="flex flex-space-between align-items--center">
    <h2>
      Où {{ props.parametreDeRecherche.categorie }} à <span class="text--bold">{{ props.commune }}</span> ?
    </h2>
  </div>

  <ul
    v-if="serviceRechercheLongueVieAuxObjetsViewModel"
    class="fr-grid-row fr-grid-row--gutters fr-mb-2w list-style-none"
  >
    <li
      v-for="suggestion in (
        serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats
      ).suggestions"
      :key="suggestion.titre"
      class="fr-col-sm-6 fr-col"
    >
      <ServiceCarteHeaderAlternatif :suggestionsServiceViewModel="suggestion" />
    </li>
  </ul>
  <router-link
    :to="{
      name: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
      params: {
        thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
      },
      query: { type: parametreDeRecherche.categorie, sous_catagorie: parametreDeRecherche.sous_catagorie },
    }"
    class="text--bleu"
    >Voir tous les lieux
  </router-link>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import ServiceCarteHeaderAlternatif from '@/components/custom/Service/ServiceCarteHeaderAlternatif.vue';
  import {
    ServiceRechercheLongueVieAuxObjetsPresenterImpl,
    ServiceRechercheLongueVieAuxObjetsViewModel,
    ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats,
  } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.presenter.impl';
  import { ServiceRechercheLongueVieAuxObjetsAxios } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.repository.axios';
  import { RecupererServiceLongueVieAuxObjetsUsecase } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RouteServiceName } from '@/router/services/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const serviceRechercheLongueVieAuxObjetsViewModel = ref<ServiceRechercheLongueVieAuxObjetsViewModel>();
  const props = defineProps<{
    commune: string;
    parametreDeRecherche: {
      categorie: string;
      sous_catagorie?: string;
    };
  }>();

  const usecase = new RecupererServiceLongueVieAuxObjetsUsecase(new ServiceRechercheLongueVieAuxObjetsAxios());
  const serviceErreur = ref<string | null>(null);

  let nombreMaxResultats = 4;

  onMounted(() => {
    lancerRecherche();
  });

  async function lancerRecherche(): Promise<void> {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      props.parametreDeRecherche,
      nombreMaxResultats,
      new ServiceRechercheLongueVieAuxObjetsPresenterImpl(
        vm => {
          serviceRechercheLongueVieAuxObjetsViewModel.value = vm;
        },
        error => (serviceErreur.value = error),
      ),
    );
    isLoading.value = false;
  }
</script>

<style scoped>
  h2 {
    font-weight: normal;
    font-size: 1.75rem;
  }
</style>
