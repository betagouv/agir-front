<template>
  <CompteLogementFormulaire v-if="logementViewModel" :logement-view-model="logementViewModel" />
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import CompteLogementFormulaire from '@/components/custom/Compte/CompteLogementFormulaire.vue';
  import { LogementPresenterImpl } from '@/domaines/logement/adapters/logement.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { LogementViewModel } from '@/domaines/logement/ports/logement.presenter';
  import { RecupererInformationLogementUseCase } from '@/domaines/logement/recupererInformationLogement.usecase';
  import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    clefThematique: ClefThematiqueAPI;
  }>();

  const logementViewModel = ref<LogementViewModel>();

  onMounted(async () => {
    const usecase = new RecupererInformationLogementUseCase(new LogementRepositoryAxios());

    await usecase.execute(
      utilisateurStore().utilisateur.id,
      new LogementPresenterImpl(viewModel => (logementViewModel.value = viewModel)),
    );
  });
</script>
