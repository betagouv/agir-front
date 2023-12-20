<template>
  <div />
</template>
<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { AuthentifierUtilisateurFranceConnectUsecase } from '@/authentification/authentifierUtilisateurFranceConnect.usecase';
  import { UtilisateurRepositoryAxios } from '@/authentification/adapters/utilisateur.repository.axios';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  import { sendIdNGC } from '@/bilan/middleware/pendingSimulation';
  import { RouteCoachName } from '@/router/coach/routes';

  onMounted(async () => {
    const route = useRoute();
    let token = '';
    if (typeof route.query.token === 'string') {
      token = route.query.token;
    }
    const usecase = new AuthentifierUtilisateurFranceConnectUsecase(
      new UtilisateurRepositoryAxios(),
      new SessionRepositoryStore()
    );
    const store = utilisateurStore();
    usecase.execute(token).then(() => {
      const requestedRoute = sessionStorage.getItem('requestedRoute');
      sessionStorage.removeItem('requestedRoute');
      router.push(requestedRoute || { name: RouteCoachName.COACH, state: { utilisateur: store.utilisateur.nom } });
      sendIdNGC();
    });
  });
</script>
