<template>
  <CompteSkeleton page-courante="Logement">
    <CompteLogementFormulaire v-if="logementViewModel" :logement-view-model="logementViewModel" />
  </CompteSkeleton>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import CompteLogementFormulaire from '@/components/custom/Compte/CompteLogementFormulaire.vue';
  import { LogementViewModel } from '@/logement/ports/logement.presenter';
  import { RecupererInformationLogementUseCase } from '@/logement/recupererInformationLogement.usecase';
  import { utilisateurStore } from '@/store/utilisateur';
  import { LogementPresenterImpl } from '@/logement/adapters/logement.presenter.impl';
  import { LogementRepositoryAxios } from '@/logement/adapters/logement.repository.axios';

  const logementViewModel = ref<LogementViewModel>();

  onMounted(() => {
    const usecase = new RecupererInformationLogementUseCase(new LogementRepositoryAxios());

    usecase.execute(
      utilisateurStore().utilisateur.id,
      new LogementPresenterImpl(viewModel => (logementViewModel.value = viewModel)),
    );
  });
</script>
