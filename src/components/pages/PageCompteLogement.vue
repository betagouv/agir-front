<template>
  <CompteSkeleton page-courante="Logement">
    <CompteLogementFormulaire v-if="logementViewModel" :logement-view-model="logementViewModel" />
  </CompteSkeleton>
</template>
<script setup lang="ts">
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import CompteLogementFormulaire from '@/components/custom/Compte/CompteLogementFormulaire.vue';
  import { onMounted, ref } from 'vue';
  import {
    LogementViewModel,
    RecupererInformationLogementPresenterImpl,
    RecupererInformationLogementUseCase,
  } from '@/logement/recupererInformationLogement.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const logementViewModel = ref<LogementViewModel | null>();
  onMounted(() => {
    const usecase = new RecupererInformationLogementUseCase();
    usecase.execute(
      utilisateurStore().utilisateur.id,
      new RecupererInformationLogementPresenterImpl(viewModel => {
        logementViewModel.value = viewModel;
      }),
    );
  });
</script>
