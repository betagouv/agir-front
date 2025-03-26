<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-lg-8 fr-mx-auto fr-mb-0 background--white fr-p-2w fr-p-md-6w border border-radius--md">
      <h1 class="fr-h2">Merci pour votre soutien&nbsp;!</h1>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-12 fr-col-md-8">
          <p>
            Vous avez fait partie des <span class="text--bold">premiers utilisateurs</span> à tester ce nouveau service,
            à nous faire vos retours, et nous permettre de nous améliorer.
          </p>
          <p>
            Pour cela, nous aimerions vous remercier avec <span class="text--bold">ce badge</span> et 200
            <img alt="points" src="/ic_score.svg" /> pour commencer cette
            <span class="text--bold">nouvelle aventure</span>...
          </p>
        </div>
        <div class="fr-hidden fr-unhidden-lg fr-col-4">
          <div class="flex align-items--baseline">
            <img alt="" src="/badge-pionnier-illustration.webp" width="140" />
          </div>
        </div>
      </div>
      <div class="badge fr-col-12 fr-col-md-8 flex align-items--start fr-my-4w fr-p-1w">
        <img alt="" src="/badge-pionnier.webp" />
        <div class="fr-mt-1w fr-ml-2w">
          <p class="fr-h4 fr-mb-0">Pionnier</p>
          <p class="fr-mb-0">Présent depuis les premiers jours</p>
        </div>
      </div>
      <div class="flex flex-end">
        <button class="fr-btn fr-icon-arrow-right-line fr-btn--icon-right" @click="continuer()">
          Continer avec 200&nbsp;<img alt="points" src="/ic_score.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { RouteCommuneName } from '@/router';

  const router = useRouter();
  const continuer = async () => {
    await router.push({ name: RouteCommuneName.ACCUEIL });
  };
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
