<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Classement" />
    <h1 class="fr-h2">Mon classement</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <p v-else-if="!classementViewModel">Problème de chargement de donées</p>
    <Onglet
      v-else
      label-aria="Sélection du classement national ou local"
      :tab-panel="[`à ${classementViewModel.commune}`, 'en France']"
    >
      <template v-slot:tab-0>
        <Classement :classement-view-model="classementViewModel.classementLocal" />
      </template>
      <template v-slot:tab-1>
        <Classement :classement-view-model="classementViewModel.classementNational" />
      </template>
    </Onglet>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Classement from '@/components/custom/Classement/Classement.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import Onglet from '@/components/dsfr/Onglet.vue';
  import {
    ClassementPresenterImpl,
    ClassementGlobalViewModel,
  } from '@/domaines/classement/adapters/classement.presenter.impl';
  import { ClassementRepositoryAxios } from '@/domaines/classement/adapters/classement.repository.axios';
  import { RecupererClassementUsecase } from '@/domaines/classement/recupererClassement.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const classementViewModel = ref<ClassementGlobalViewModel>();

  onMounted(async () => {
    const idUtilisateur = utilisateurStore().utilisateur.id;
    const usecase = new RecupererClassementUsecase(new ClassementRepositoryAxios());
    await usecase.execute(idUtilisateur, new ClassementPresenterImpl(vm => (classementViewModel.value = vm)));
    isLoading.value = false;
  });
</script>
