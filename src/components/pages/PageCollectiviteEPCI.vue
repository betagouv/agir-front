<template>
  <section class="fr-container fr-mt-3w">
    <h1 class="fr-h2">Collectivités</h1>
    <p>
      Découvrez tous les contenus <span class="text--bold">déjà disponibles</span> pour les habitants de votre
      collectivité&nbsp;!<br />
      Les informations sont incomplètes&nbsp;? Contactez-nous en bas de page.
    </p>
  </section>

  <section class="fr-container fr-my-6w">
    <CollectivitesInseeRecherche :on-search="onSearch" :on-collectivite-click="chargerDetailCollectivite" />

    <CarteSkeleton v-if="isLoadingDetail" />
    <CollectiviteRecapitulatif
      v-else-if="donneesCollectivitesInseeViewModel"
      :collectivite-insee-view-model="donneesCollectivitesInseeViewModel"
    />
  </section>

  <section class="fr-container full-width fr-mb-6w">
    <LandingCollectivite />
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import CollectiviteRecapitulatif from '@/components/custom/CollectivitesContenus/CollectiviteRecapitulatif.vue';
  import CollectivitesInseeRecherche from '@/components/custom/CollectivitesContenus/CollectivitesInseeRecherche.vue';
  import LandingCollectivite from '@/components/custom/Landing/LandingCollectivite.vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import { SimulerAideVeloRepositoryAxios } from '@/domaines/aides/adapters/simulerAideVelo.repository.axios';
  import { DonneesCollectivitesRepositoryAxios } from '@/domaines/collectivites/adapters/donneesCollectivites.repository.axios';
  import { DonneesCollectivitesInseePresenterImpl } from '@/domaines/collectivites/adapters/donneesCollectivitesInsee.presenter.impl';
  import { DonneesCollectivitesInseeViewModel } from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';
  import { RecupererDonneesCollectivitesInsee } from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';
  import { RouteCollectiviteName } from '@/router/collectivites/routes';
  import { trackClick } from '@/shell/matomo';

  const route = useRoute();
  const router = useRouter();

  let donneesCollectivitesInseeViewModel = ref<DonneesCollectivitesInseeViewModel>();
  const isLoadingDetail = ref<boolean>(false);

  const recupererDonneesCollectivitesInsee = new RecupererDonneesCollectivitesInsee(
    new DonneesCollectivitesRepositoryAxios(),
    new SimulerAideVeloRepositoryAxios(),
  );

  onMounted(() => {
    if (route.query?.insee) {
      chargerDetailCollectivite(route.query.insee as string);
    }

    window.addEventListener('popstate', () => {
      location.reload();
    });
  });

  async function chargerDetailCollectivite(insee: string) {
    trackCollectivitesClick(insee);

    isLoadingDetail.value = true;

    await recupererDonneesCollectivitesInsee
      .execute(insee, new DonneesCollectivitesInseePresenterImpl(vm => (donneesCollectivitesInseeViewModel.value = vm)))
      .then(async () => {
        await router.push({ name: RouteCollectiviteName.CONTENUS, query: { insee } });
      })
      .finally(() => {
        isLoadingDetail.value = false;
      });
  }

  const trackCollectivitesClick = insee => {
    trackClick('Collectivité', `Code INSEE : ${insee}`);
  };

  const onSearch = () => {
    donneesCollectivitesInseeViewModel.value = undefined;
  };
</script>

<style scoped>
  .propositions li:first-letter {
    text-transform: capitalize;
  }

  section > div {
    justify-self: center;
    width: 100%;
  }

  button {
    justify-content: center;
  }
</style>
