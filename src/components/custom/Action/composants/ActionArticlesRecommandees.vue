<template>
  <section
    v-if="actionBaseViewModel.articlesRecommandes.length > 0 || !estConnecte"
    class="fr-my-4w fr-mx-0 fr-mx-md-2w"
  >
    <h2>Pour aller plus loin</h2>

    <Callout class="fr-py-2w fr-px-3w" v-if="!estConnecte">
      <template #texte>
        <div class="flex align-items--center">
          <span class="fr-icon-user-line fr-pr-2w" />
          <p>
            <router-link class="fr-link" :to="{ name: RouteCompteName.CREATION_COMPTE }"
              >Créez votre compte</router-link
            >
            ou
            <router-link class="fr-link" :to="{ name: RouteCommuneName.AUTHENTIFICATION }">connectez-vous</router-link>
            pour accéder à l’ensemble des articles disponibles pour vous
          </p>
        </div>
      </template>
    </Callout>

    <div class="fr-grid-row fr-grid-row--gutters" v-if="actionBaseViewModel.articlesRecommandes.length > 0">
      <div
        v-for="article in actionBaseViewModel.articlesRecommandes"
        :key="article.titre"
        class="fr-col-12 fr-col-sm-6 fr-col-md-4"
      >
        <CarteDsfr :titre="article.titre" :image="article.image" :to="{ path: article.url }" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Callout from '@/components/dsfr/Callout.vue';
  import CarteDsfr from '@/components/dsfr/CarteDsfr.vue';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';
  import { RouteCommuneName } from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();

  const estConnecte = computed(() => utilisateurStore().estConnecte);
</script>
