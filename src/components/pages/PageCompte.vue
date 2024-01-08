<template>
  <CompteSkeleton page-courante="Mon Compte">
    <CompteFormulaire v-if="compteUtlisateurViewModel" :compte-utlisateur-view-model="compteUtlisateurViewModel" />
  </CompteSkeleton>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import { ChargerCompteUtilisateurUsecase } from '@/compte/chargerCompteUtilisateur.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import {
    CompteUtilisateurPresenterImpl,
    CompteUtlisateurViewModel,
  } from '@/compte/adapters/compteUtilisateur.presenter.impl';
  import { utilisateurStore } from '@/store/utilisateur';
  import CompteFormulaire from '@/components/custom/Compte/CompteFormulaire.vue';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import { PublierEvenemntRepositoryAxios } from '@/shell/adapters/publierEvenemnt.repository.axios';

  const compteUtlisateurViewModel = ref<CompteUtlisateurViewModel | null>(null);
  const store = utilisateurStore();

  function mapValueCompte(viewModel: CompteUtlisateurViewModel) {
    compteUtlisateurViewModel.value = viewModel;
  }

  onMounted(async () => {
    const usecase = new ChargerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore(),
      new PublierEvenemntRepositoryAxios()
    );
    const idUtilisateur = store.utilisateur.id;
    await usecase.execute(idUtilisateur, new CompteUtilisateurPresenterImpl(mapValueCompte));
  });
</script>
