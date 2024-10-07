<template>
  <Onglet
    v-if="serviceConsommationLinkyViewModel"
    label-aria="Sélection de votre intervalle de consommation électrique"
    :tab-panel="['Par jour', 'Par mois']"
    class="fr-mb-2w"
  >
    <template v-slot:tab-0>
      <LinkyGraphiqueDetail :consommationLinkyViewModel="serviceConsommationLinkyViewModel.consommationQuatorzeJours" />
    </template>
    <template v-slot:tab-1>
      <LinkyGraphiqueDetail :consommationLinkyViewModel="serviceConsommationLinkyViewModel.consommationAnnuelle" />
    </template>
  </Onglet>
  <CarteInfo>
    <LinkyExplicationAleatoire />
  </CarteInfo>
  <button @click="desactiverServiceLinky" class="fr-btn fr-btn--icon-left fr-btn--tertiary fr-icon-close-circle-fill">
    Désactiver le service
  </button>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import LinkyExplicationAleatoire from '@/components/custom/Linky/LinkyExplicationAleatoire.vue';
  import LinkyGraphiqueDetail from '@/components/custom/Linky/LinkyGraphiqueDetail.vue';
  import Onglet from '@/components/dsfr/Onglet.vue';
  import {
    ServiceConsommationLinkyViewModel,
    ServiceRechercheConsommationLinkyPresenterImpl,
  } from '@/domaines/serviceRecherche/linky/adapters/serviceRechercheConsommationLinky.presenter.impl';
  import { ServiceRechercheLinkyRepositoryAxios } from '@/domaines/serviceRecherche/linky/adapters/serviceRechercheLinky.repository.axios';
  import { RecupererConsommationElectriqueUsecase } from '@/domaines/serviceRecherche/linky/recupererConsommationElectrique.usecase';
  import { SeDesinscrireDuServiceUsecase } from '@/domaines/serviceRecherche/linky/seDesinscrireDuService.usecase';
  import { LinkyEventBusImpl } from '@/domaines/services/linkyEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const serviceConsommationLinkyViewModel = ref<ServiceConsommationLinkyViewModel>();
  const { id: utilisateurId } = utilisateurStore().utilisateur;

  onMounted(async () => {
    const recupererConsommationElectriqueUsecase = new RecupererConsommationElectriqueUsecase(
      new ServiceRechercheLinkyRepositoryAxios(),
    );
    await recupererConsommationElectriqueUsecase.execute(
      utilisateurId,
      new ServiceRechercheConsommationLinkyPresenterImpl(vm => (serviceConsommationLinkyViewModel.value = vm)),
    );
  });

  const desactiverServiceLinky = async () => {
    const seDesinscrireDuServiceUsecase = new SeDesinscrireDuServiceUsecase(
      new ServiceRechercheLinkyRepositoryAxios(),
      LinkyEventBusImpl.getInstance(),
    );
    await seDesinscrireDuServiceUsecase.execute(utilisateurId);
  };
</script>
