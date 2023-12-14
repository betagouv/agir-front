<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane
      page-courante="Mon Compte"
      :page-hierarchie="[
        {
          label: 'Coach',
          url: 'coach',
        },
      ]"
    />
    <div class="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
      <div class="fr-col fr-col-lg-8">
        <h1 class="fr-h2">Mon Compte</h1>
        <PageCompteFormulaire
          v-if="compteUtlisateurViewModel"
          :compte-utlisateur-view-model="compteUtlisateurViewModel"
        />
        <div class="fr-mt-2w">
          <router-link :to="{ name: 'modifier-mot-de-passe' }">Modifier mon mot de passe</router-link>
        </div>
        <PageCompteSuppression class="fr-mt-4w" />
      </div>
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
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';

  const compteUtlisateurViewModel = ref<CompteUtlisateurViewModel | null>(null);

  function mapValueCompte(viewModel: CompteUtlisateurViewModel) {
    compteUtlisateurViewModel.value = viewModel;
  }

  onMounted(async () => {
    const usecase = new ChargerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore()
    );
    const store = utilisateurStore();
    const idUtilisateur = store.utilisateur.id;
    await usecase.execute(idUtilisateur, new CompteUtilisateurPresenterImpl(mapValueCompte));
  });
</script>
