<template>
  <Onglet
    v-if="serviceConsommationLinkyViewModel"
    label-aria="Sélection de votre intervalle de consommation électrique"
    :tab-panel="['Par jour', 'Par mois']"
  >
    <template v-slot:tab-0>
      <LinkyGraphiqueDetail :consommationLinkyViewModel="serviceConsommationLinkyViewModel.consommationQuatorzeJours" />
    </template>
    <template v-slot:tab-1>
      <LinkyGraphiqueDetail :consommationLinkyViewModel="serviceConsommationLinkyViewModel.consommationAnnuelle" />
    </template>
  </Onglet>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import LinkyGraphiqueDetail from '@/components/custom/Linky/LinkyGraphiqueDetail.vue';
  import Onglet from '@/components/dsfr/Onglet.vue';
  import {
    ServiceConsommationLinkyViewModel,
    ServiceRechercheConsommationLinkyPresenterImpl,
  } from '@/domaines/serviceRecherche/linky/adapters/serviceRechercheConsommationLinky.presenter.impl';
  import { ServiceRechercheLinkyRepositoryAxios } from '@/domaines/serviceRecherche/linky/adapters/serviceRechercheLinky.repository.axios';
  import { RecupererConsommationElectriqueUsecase } from '@/domaines/serviceRecherche/linky/recupererConsommationElectrique.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const serviceConsommationLinkyViewModel = ref<ServiceConsommationLinkyViewModel>();

  onMounted(async () => {
    const recupererConsommationElectriqueUsecase = new RecupererConsommationElectriqueUsecase(
      new ServiceRechercheLinkyRepositoryAxios(),
    );
    await recupererConsommationElectriqueUsecase.execute(
      utilisateurStore().utilisateur.id,
      new ServiceRechercheConsommationLinkyPresenterImpl(vm => (serviceConsommationLinkyViewModel.value = vm)),
    );
  });
</script>
