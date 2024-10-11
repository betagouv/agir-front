<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane :page-courante="pageCourante" />
    <div class="background--white fr-p-4w border border-radius--md">
      <div class="fr-grid-row fr-mb-4w">
        <h1 class="fr-h2 fr-mb-0 fr-col">Mon profil</h1>
      </div>
      <div class="fr-grid-row">
        <div class="fr-col-lg-4 fr-col-12">
          <div class="full-height fr-grid-row flex-column flex-space-between">
            <CompteMenuLateral class="fr-mb-6w" />
            <button
              class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-logout-box-r-line fr-btn--lg fr-mr-auto"
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

<script setup lang="ts">
  import Cookies from 'js-cookie';
  import CompteMenuLateral from '@/components/custom/Compte/CompteMenuLateral.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';

  const store = utilisateurStore();

  defineProps<{ pageCourante: string }>();

  const logout = () => {
    store.reset();
    Cookies.remove('bearer');
    router.replace('/');
  };
</script>
