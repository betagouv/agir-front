<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement en cours ...</div>
    <p v-else-if="!serviceRechercheViewModel">Problème de chargement de donées</p>
    <PageServiceComposant v-else :service-recherche-view-model="serviceRechercheViewModel" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import PageServiceComposant from '@/components/custom/Service/PageServiceComposant.vue';
  import {
    ServiceRecherchePresenterImpl,
    ServiceRechercheViewModel,
  } from '@/domaines/serviceRecherche/adapters/serviceRecherche.presenter.impl';
  import { ServiceRechercheAxios } from '@/domaines/serviceRecherche/adapters/serviceRecherche.repository.axios';
  import { RecupererServiceRechercheUsecase } from '@/domaines/serviceRecherche/recupererServiceRecherche.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const serviceRechercheViewModel = ref<ServiceRechercheViewModel>();

  onMounted(async () => {
    const usecase = new RecupererServiceRechercheUsecase(new ServiceRechercheAxios());
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      'proximite',
      new ServiceRecherchePresenterImpl(vm => (serviceRechercheViewModel.value = vm)),
    );

    isLoading.value = false;
  });
</script>
