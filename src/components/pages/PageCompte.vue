<template>
  <h1 class="fr-h2">Mon Compte</h1>
  <div class="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
    <div class="fr-col fr-col-lg-8">
      <PageCompteFormulaire :compte-utlisateur-view-model="compteUtlisateurViewModel" />
      <PageCompteSuppression class="fr-mt-2w" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ChargerCompteUtilisateurUsecase } from '@/compte/chargerCompteUtilisateur.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import {
    CompteUtilisateurPresenterImpl,
    CompteUtlisateurViewModel,
  } from '@/compte/adapters/compteUtilisateur.presenter.impl';
  import { onMounted, ref } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import PageCompteFormulaire from '@/components/custom/PageCompteFormulaire.vue';
  import PageCompteSuppression from '@/components/pages/PageCompteSuppression.vue';

  let compteUtlisateurViewModel = ref<CompteUtlisateurViewModel>({
    id: '',
    nom: '',
    mail: '',
    codePostal: '',
  });
  function mapValueCompte(viewModel: CompteUtlisateurViewModel) {
    compteUtlisateurViewModel.value = viewModel;
  }
  onMounted(async () => {
    const usecase = new ChargerCompteUtilisateurUsecase(new CompteUtilisateurRepositoryImpl());
    const store = utilisateurStore();
    const idUtilisateur = store.utilisateur.id;
    usecase.execute(idUtilisateur, new CompteUtilisateurPresenterImpl(mapValueCompte));
  });
</script>
<style scoped></style>
