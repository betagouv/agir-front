<template>
  <CompteSkeleton page-courante="Mon Compte">
    <CompteFormulaire v-if="compteUtlisateurViewModel" :compte-utlisateur-view-model="compteUtlisateurViewModel" />
  </CompteSkeleton>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import CompteFormulaire from '@/components/custom/Compte/CompteFormulaire.vue';
  import {
    ChargerProfileUtilisateurUsecase,
    ProfileUtilisateurRepositoryAxiosImpl,
  } from '@/profileUtilisateur/chargerProfileUtilisateur.usecase';
  import {
    ProfileUtilisateurPresenterImpl,
    ProfileUtilisateurViewModel,
  } from '@/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
  import { Evenemement } from '@/shell/ports/publierEvenement.repository';
  import { PublierEvenemntRepositoryAxios } from '@/shell/adapters/publierEvenemnt.repository.axios';

  const compteUtlisateurViewModel = ref<ProfileUtilisateurViewModel | null>(null);
  const store = utilisateurStore();

  onMounted(async () => {
    const usecase = new ChargerProfileUtilisateurUsecase(new ProfileUtilisateurRepositoryAxiosImpl());
    const idUtilisateur = store.utilisateur.id;
    await usecase.execute(
      idUtilisateur,
      new ProfileUtilisateurPresenterImpl(viewModel => {
        compteUtlisateurViewModel.value = viewModel;
      }),
    );

    const publierEvenementRepository = new PublierEvenemntRepositoryAxios();
    await publierEvenementRepository.publierEvenement(idUtilisateur, Evenemement.COMPTE_CONSULTE);
  });
</script>
