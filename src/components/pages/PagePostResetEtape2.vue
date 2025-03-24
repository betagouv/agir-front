<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-lg-8 fr-mx-auto fr-mb-0 background--white fr-p-6w border border-radius--md">
      <div class="fr-grid-row fr-grid-row--gutters align-items--start flex-center fr-mb-1w">
        <div class="fr-col-12 fr-col-md-8 fr-pr-md-3w">
          <h1 class="fr-h2">Merci pour votre soutien !</h1>
          <p>
            Vous avez fait partie des <span class="text--bold">premiers utilisateurs</span> à tester ce nouveau service,
            à nous faire vos retours, et nous permettre de nous améliorer.
          </p>
          <p>
            Pour cela, nous aimerions vous remercier avec <span class="text--bold">ce badge</span> et 200
            <img src="/ic_score.svg" alt="points" /> pour commencer cette
            <span class="text--bold">nouvelle aventure</span>...
          </p>
          <div class="badge flex align-items--center fr-my-4w fr-p-1w">
            <img src="/badge-pionnier.png" alt="" />
            <div>
              <p class="fr-h4 fr-mb-0">Pionnier</p>
              <p class="fr-mb-0">Présent depuis les premiers jours</p>
            </div>
          </div>
        </div>
        <div class="fr-col-12 fr-col-sm-6 fr-col-md-4 fr-pt-4w">
          <img src="/badge-pionnier-illustration.png" alt="" class="illustration full-width" />
        </div>
      </div>
      <div
        class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left"
      >
        <button class="fr-btn fr-icon-arrow-right-line fr-btn--icon-right" @click="terminerReset">
          Récolter 200&nbsp;<img src="/ic_score.svg" alt="points" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { FermerMessageResetUsecase } from '@/domaines/compte/fermerMessageReset.usecase';
  import { RouteCommuneName } from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';

  const router = useRouter();

  const fermerMessageResetUsecase = new FermerMessageResetUsecase(new UtilisateurRepositoryAxios());

  async function terminerReset() {
    await fermerMessageResetUsecase.execute(utilisateurStore().utilisateur.id);
    await router.push({ name: RouteCommuneName.ACCUEIL });
  }
</script>

<style scoped>
  .badge {
    border: 1px solid var(--blue-france-950-100);
    background-color: rgba(245, 245, 254, 0.3);
  }

  .badge > img {
    width: 5rem;
    height: 5rem;
  }

  .illustration {
    object-fit: contain;
  }
</style>
