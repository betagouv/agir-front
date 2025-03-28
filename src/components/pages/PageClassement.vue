<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Classement" />
    <h1 class="fr-h2">Mon classement</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <p v-else-if="!classementViewModel">Problème de chargement de donées</p>
    <div v-else>
      <div
        v-for="badge in classementViewModel.badges"
        :key="badge.libelle"
        class="background--white shadow fr-col-12 fr-col-md-8 flex align-items--start fr-my-4w fr-p-1w fr-mb-2w"
      >
        <img :src="badge.illustration" alt="" class="badge--img" />
        <div class="fr-mt-1v fr-ml-2w">
          <p class="fr-h4 fr-mb-0">{{ badge.libelle }}</p>
          <p class="fr-mb-0">{{ badge.description }}</p>
        </div>
      </div>
      <Onglet
        :tab-panel="[`à ${classementViewModel.commune}`, 'en France']"
        label-aria="Sélection du classement national ou local"
      >
        <template v-slot:tab-0>
          <Classement :classement-view-model="classementViewModel.classementLocal" />
        </template>
        <template v-slot:tab-1>
          <Classement :classement-view-model="classementViewModel.classementNational" />
        </template>
      </Onglet>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Classement from '@/components/custom/Classement/Classement.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import Onglet from '@/components/dsfr/Onglet.vue';
  import {
    ClassementGlobalViewModel,
    ClassementPresenterImpl,
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
<style scoped>
  .badge--img {
    width: 4rem;
    height: 4rem;
  }
</style>
