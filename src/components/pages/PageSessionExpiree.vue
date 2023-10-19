<template>
  <h1 class="text--center">Votre session a expiré veuillez vous reconnecter</h1>
  <Authentification :premiere-connexion="false" />
</template>

<script setup lang="ts">
  import Authentification from '@/components/Authentification.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import Cookies from 'js-cookie';
  utilisateurStore().reset();
  Cookies.remove('bearer');
</script>
