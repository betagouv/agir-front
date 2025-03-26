<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-lg-8 fr-mx-auto fr-mb-0 background--white fr-p-6w border confetti">
      <div class="fr-grid-row fr-grid-row--gutters align-items--center flex-center fr-mt-4w fr-mb-1w">
        <div class="fr-col-12 fr-col-md-8 fr-pr-md-3w">
          <h1 class="fr-h2">Il y a du nouveau sur J’agis !</h1>
          <p>
            Nous avons écouté vos retours et concocté une toute
            <span class="text--bold">nouvelle version</span> du service.
          </p>
          <p>
            <span class="text--bold">Personnalisez votre expérience</span> en quelques questions et obtenez des
            <span class="text--bold">idées d’actions</span> concrètes, avec tous les
            <span class="text--bold">outils</span>, <span class="text--bold">adresses</span> et
            <span class="text--bold">aides financières</span> pour y arriver !
          </p>
        </div>
        <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
          <img alt="" class="full-width img" src="/pop-in-v2-illustration.svg" />
        </div>
      </div>
      <div
        class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left fr-mt-5w"
      >
        <router-link
          :to="{ name: RouteResetName.RESET_2 }"
          class="fr-btn fr-btn--secondary fr-icon-arrow-right-line fr-btn--icon-right"
        >
          Continuer
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { FermerMessageResetUsecase } from '@/domaines/compte/fermerMessageReset.usecase';
  import { RouteResetName } from '@/router/reset/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  onMounted(async () => {
    const fermerMessageResetUsecase = new FermerMessageResetUsecase(new UtilisateurRepositoryAxios());
    await fermerMessageResetUsecase.execute(utilisateurStore().utilisateur.id, ActionsEventBus.getInstance());
  });
</script>

<style scoped>
  .confetti {
    background-image: url('/confetti.svg');
    background-repeat: no-repeat;
    background-size: 100%;
  }
</style>
