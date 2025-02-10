<template>
  <div class="flex flex-space-between align-items--center">
    <h2 class="fr-h3">Où {{ props.parametreDeRecherche }} près de chez moi ?</h2>
  </div>
  <ServiceListeCarte
    v-if="serviceRechercheLongueVieAuxObjetsViewModel"
    :suggestions-service-view-model="
      (serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats)
        .suggestions
    "
  />
  <router-link
    :to="{
      name: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
      params: {
        thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
      },
    }"
    >Voir tous les lieux
  </router-link>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
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
    parametreDeRecherche: string;
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
<style scoped></style>
