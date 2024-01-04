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
    <div class="background--white fr-p-4w border border-radius--md">
      <div class="fr-grid-row fr-mb-4w">
        <h1 class="fr-h2 fr-mb-0 fr-col">Votre profil</h1>
        <button class="fr-btn fr-btn--lg fr-mr-auto" @click="logout">Se déconnecter</button>
      </div>
      <PageCompteFormulaire
        v-if="compteUtlisateurViewModel"
        :compte-utlisateur-view-model="compteUtlisateurViewModel"
      />
    </div>
    <div class="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
      <div class="fr-col">
        <div class="fr-mt-2w">
          <router-link :to="{ name: RouteCompteName.MODIFIER_MOT_DE_PASSE }">Modifier mon mot de passe</router-link>
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
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  import PageCompteFormulaire from '@/components/custom/PageCompteFormulaire.vue';
  import PageCompteSuppression from '@/components/pages/PageCompteSuppression.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import { PublierEvenemntRepositoryAxios } from '@/shell/adapters/publierEvenemnt.repository.axios';
  import Cookies from 'js-cookie';
  import { RouteCompteName } from '@/router/compte/routeCompteName';

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

  const logout = () => {
    store.reset();
    Cookies.remove('bearer');
    router.replace('/');
  };
</script>
