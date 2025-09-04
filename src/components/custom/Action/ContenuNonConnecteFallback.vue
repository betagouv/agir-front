<template>
  <div class="fr-p-3w contenu-indisponible">
    <h2>Inscrivez-vous pour accéder à ce {{ contenu }} !</h2>
    <p>
      Ce {{ contenu }} n'est pas encore disponible au grand public ! Vous pouvez vous inscrire à <i>J'agis</i> pour en
      bénéficier en avant-première.
    </p>

    <div class="fr-btns-group fr-btns-group--inline">
      <router-link class="fr-btn" :to="{ name: RouteCompteName.CREATION_COMPTE }">Créer mon compte</router-link>
      <router-link
        class="fr-btn fr-btn--tertiary fr-btn--tertiary-no-outline"
        :to="{ name: RouteCommuneName.AUTHENTIFICATION }"
        >Me connecter</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouteCommuneName } from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';

  withDefaults(
    defineProps<{
      contenu: string;
    }>(),
    { contenu: 'contenu' },
  );
</script>

<style scoped>
  .contenu-indisponible {
    background-color: rgb(145 0 0 / 3%);
    border: 1px solid #f8e5e5;
  }

  .contenu-indisponible h2 {
    position: relative;
    padding-left: 2rem;
  }

  .contenu-indisponible h2::before {
    content: '';
    background-image: url(/icons/system/lock-unlock-fill--rouge.svg);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    position: absolute;
    left: -0.5rem;
    width: 2rem;
    height: 100%;
  }
</style>
