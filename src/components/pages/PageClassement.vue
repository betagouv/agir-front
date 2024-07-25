<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Classement" />
    <h1 class="fr-h2">Mon classement</h1>
    <ol class="list-style-none">
      <li
        class="fr-grid-row align-items--center flex-space-between background--white fr-mb-2w border-radius--md shadow--light fr-p-2w"
        v-for="item in classementViewModel?.topTrois"
        :key="item.prenom"
      >
        <div class="fr-text--bold">
          {{ item.prenom }}
        </div>
        <div class="fr-grid-row align-items--center border border-radius--md fr-text--bold fr-p-1w">
          <span class="fr-mr-1v">{{ item.points }}</span> <img src="/ic_score.svg" alt="points" />
        </div>
      </li>
    </ol>
    <hr />
    <ul>
      <li
        class="fr-grid-row align-items--center flex-space-between background--white fr-mb-2w border-radius--md shadow--light fr-p-2w"
        v-for="(item, index) in classementViewModel?.utilisateursProche"
        :key="index"
      >
        <div class="fr-text--bold">
          <span class="border border-radius--md fr-text--bold fr-p-1w fr-mr-1w">{{ item.rang }}</span>
          {{ item.prenom }}
        </div>
        <div class="fr-grid-row align-items--center border border-radius--md fr-text--bold fr-p-1w">
          <span class="fr-mr-1v">{{ item.points }}</span> <img src="/ic_score.svg" alt="points" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    ClassementPresenterImpl,
    ClassementViewModel,
  } from '@/domaines/classement/adapters/classement.presenter.impl';
  import { ClassementRepositoryAxios } from '@/domaines/classement/adapters/classement.repository.axios';
  import { RecupererClassementNationalUsecase } from '@/domaines/classement/recupererClassementNational.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const classementViewModel = ref<ClassementViewModel>();

  onMounted(async () => {
    const idUtilisateur = utilisateurStore().utilisateur.id;
    const usecase = new RecupererClassementNationalUsecase(new ClassementRepositoryAxios());
    await usecase.execute(idUtilisateur, new ClassementPresenterImpl(vm => (classementViewModel.value = vm)));
  });
</script>
