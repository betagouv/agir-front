<template>
  <div />
</template>
<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { AuthentifierUtilisateurFranceConnectUsecase } from '@/domaines/authentification/authentifierUtilisateurFranceConnect.usecase';
  import router from '@/router';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { utilisateurStore } from '@/store/utilisateur';

  onMounted(async () => {
    const route = useRoute();
    let token = '';
    if (typeof route.query.token === 'string') {
      token = route.query.token;
    }
    const usecase = new AuthentifierUtilisateurFranceConnectUsecase(
      new UtilisateurRepositoryAxios(),
      new SessionRepositoryStore(),
    );
    const store = utilisateurStore();
    usecase.execute(token).then(() => {
      const requestedRoute = sessionStorage.getItem('requestedRoute');
      sessionStorage.removeItem('requestedRoute');
      router.push(requestedRoute || { name: RouteCoachName.COACH, state: { utilisateur: store.utilisateur.nom } });
    });
  });
</script>
