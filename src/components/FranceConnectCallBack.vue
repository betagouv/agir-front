<template>
  <div />
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  onMounted(async () => {
    const route = useRoute();
    let token = '';
    console.log(route.query);
    /*if (typeof route.query.token === 'string') {
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
    });*/
  });
</script>
