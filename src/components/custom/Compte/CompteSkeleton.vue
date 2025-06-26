<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane :page-courante="pageCourante" />
    <div class="background--white fr-p-4w border">
      <div class="fr-grid-row fr-mb-4w">
        <h1 class="fr-h2 fr-mb-0 fr-col">Mon profil</h1>
      </div>
      <div class="fr-grid-row">
        <div class="fr-col-lg-4 fr-col-12 fr-mb-4w fr-mb-md-0">
          <div class="full-height flex flex-column flex-space-between">
            <CompteMenuLateral />
            <button
              class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-logout-box-r-line fr-btn--lg fr-mr-auto position--sticky bottom-1 fr-mt-2w"
              @click="logout"
            >
              Se déconnecter
            </button>
          </div>
        </div>
        <div class="fr-col-lg-8 fr-col-12">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import CompteMenuLateral from '@/components/custom/Compte/CompteMenuLateral.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { DeconnecterUtilisateurUsecase } from '@/domaines/authentification/deconnecterUtilisateur.usecase';
  import { sessionAppRawDataStorage } from '@/shell/appRawDataStorage';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{ pageCourante: string }>();

  const utilisateurId = utilisateurStore().utilisateur.id;
  const seDeconnecterUsecase = new DeconnecterUtilisateurUsecase(
    new UtilisateurRepositoryAxios(),
    new SessionRepositoryStore(),
    sessionAppRawDataStorage,
  );

  const logout = async () => {
    await seDeconnecterUsecase.execute(utilisateurId, url => (window.location.href = url));
  };
</script>

<style scoped>
  .position--sticky {
    position: sticky;
  }

  .bottom-1 {
    bottom: 1rem;
  }
</style>
