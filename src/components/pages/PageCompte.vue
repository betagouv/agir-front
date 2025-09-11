<template>
  <CompteSkeleton page-courante="Mon profil">
    <CompteFormulaire v-if="compteUtlisateurViewModel" :compte-utlisateur-view-model="compteUtlisateurViewModel" />
  </CompteSkeleton>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import CompteFormulaire from '@/components/custom/Compte/CompteFormulaire.vue';
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import {
    ProfileUtilisateurPresenterImpl,
    ProfileUtilisateurViewModel,
  } from '@/domaines/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
  import {
    ChargerProfileUtilisateurUsecase,
    ProfileUtilisateurRepositoryAxiosImpl,
  } from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';
  import { PublierEvenemntRepositoryAxios } from '@/shell/adapters/publierEvenemnt.repository.axios';
  import { Evenemement } from '@/shell/ports/publierEvenement.repository';
  import { utilisateurStore } from '@/store/utilisateur';

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
