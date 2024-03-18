<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane :page-courante="pageCourante" />
    <div class="background--white fr-p-4w border border-radius--md">
      <div class="fr-grid-row fr-mb-4w">
        <h1 class="fr-h2 fr-mb-0 fr-col">Votre profil</h1>
        <button class="fr-btn fr-btn--lg fr-mr-auto" @click="logout">Se déconnecter</button>
      </div>
      <div class="fr-grid-row">
        <div class="fr-col-lg-4 fr-col-12">
          <CompteMenuLateral />
        </div>
        <div class="fr-col-lg-8 fr-col-12">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import CompteMenuLateral from '@/components/custom/Compte/CompteMenuLateral.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import Cookies from 'js-cookie';
  import router, { RouteCommuneName } from '@/router';
  import { sessionAppRawDataStorage } from '@/shell/cache/appRawDataStorage';

  const store = utilisateurStore();

  defineProps<{ pageCourante: string }>();

  const logout = async () => {
    sessionAppRawDataStorage.clearAllItems();
    store.reset();
    Cookies.remove('bearer');
    await router.replace({ name: RouteCommuneName.ACCUEIL });
  };
</script>
