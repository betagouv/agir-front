<template>
  <CompteSkeleton page-courante="Mon Compte - Mon logement">
    <CompteLogementFormulaire v-if="logementViewModel" :logement-view-model="logementViewModel" />
  </CompteSkeleton>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import CompteLogementFormulaire from '@/components/custom/Compte/CompteLogementFormulaire.vue';
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import { LogementPresenterImpl } from '@/domaines/logement/adapters/logement.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { LogementViewModel } from '@/domaines/logement/ports/logement.presenter';
  import { RecupererInformationLogementUseCase } from '@/domaines/logement/recupererInformationLogement.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const logementViewModel = ref<LogementViewModel>();

  onMounted(() => {
    const usecase = new RecupererInformationLogementUseCase(new LogementRepositoryAxios());

    usecase.execute(
      utilisateurStore().utilisateur.id,
      new LogementPresenterImpl(viewModel => (logementViewModel.value = viewModel)),
    );
  });
</script>
