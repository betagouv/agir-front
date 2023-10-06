<template>
  <div class="fr-container">
    <div
      class="background--white border-radius--md border fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row--middle"
    >
      <div class="fr-col-10 fr-col-md-8 fr-p-3w fr-p-md-9w">
        <h1>Agir !</h1>
        <h2>L’accompagnement personnalisé pour réduire votre empreinte écologique</h2>
        <ul>
          <li>Mesurez les impacts de vos usages au quotidien</li>
          <li>Simulez des aides pertinentes adaptées à votre situation</li>
          <li>Testez vos connaissances</li>
        </ul>

        <div v-if="!isAuthentifie">
          <router-link class="fr-link" :to="{ name: 'pre-onboarding' }">Commencer !</router-link>
          <p class="fr-mt-3w">
            Déjà un compte ?
            <router-link class="fr-link" :to="{ name: 'authentification' }">Se connecter !</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { utilisateurStore } from '@/store/utilisateur';
  import { computed } from 'vue';

  const isAuthentifie = computed(() => {
    return utilisateurStore().utilisateur.nom.length > 0;
  });
</script>
