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
    <h2 class="fr-h3">Renseignez votre collectivité</h2>
    <div class="flex flex-column flex-center gap--small fr-mb-8w text--center width--fit-content">
      <InputSearchBar
        id="champDeRecherche"
        class="fr-mb-0 full-width"
        description="Saisissez la collectivité dont vous voulez extraire les statistiques J'agis"
        is-large
        label="Nom de la collectivité"
        name="champDeRecherche"
        placeholder="Nom de la collectivité"
        @submit="chercherCollectivites"
      />

      <div
        v-if="
          !resultatRechercheCollectivitesViewmodel ||
          resultatRechercheCollectivitesViewmodel?.listeDeCollectivites.length === 0
        "
        class="fr-grid-row fr-grid-row--middle fr-my-3w"
      >
        <p class="fr-mr-2w">Par exemple&nbsp;:</p>
        <ul class="fr-tags-group fr-mb-1w">
          <li v-for="ville in villesADisposition" :key="ville.insee">
            <button class="fr-tag" href="#" @click="chargerDetailCollectivite(ville.insee)">
              {{ ville.nom }}
            </button>
          </li>
        </ul>
      </div>

      <CarteSkeleton v-if="isLoadingListe" />
      <template v-else-if="resultatRechercheCollectivitesViewmodel">
        <ul class="listeDeCollectivites">
          <li
            v-for="collectivite in resultatRechercheCollectivitesViewmodel.listeDeCollectivites"
            :key="collectivite.codeInsee"
          >
            <button class="fr-btn fr-btn--tertiary" @click="chargerDetailCollectivite(collectivite.codeInsee)">
              {{ collectivite.nom }}
            </button>
          </li>
        </ul>

        <Callout
          v-if="resultatRechercheCollectivitesViewmodel.message"
          :texte="resultatRechercheCollectivitesViewmodel.message"
          class="text--left"
          titre="Votre recherche"
        />
      </template>
    </div>
  </section>

  <section class="fr-container full-width fr-mb-6w">
    <LandingCollectivite />
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import LandingCollectivite from '@/components/custom/Landing/LandingCollectivite.vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import Callout from '@/components/dsfr/Callout.vue';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  import { ChercherCollectivitesPresenterImpl } from '@/domaines/collectivites/adapters/chercherCollectivites.presenter.impl';
  import { CollectiviteRepositoryAxios } from '@/domaines/collectivites/adapters/collectivite.repository.axios';
  import { DonneesCollectivitesRepositoryAxios } from '@/domaines/collectivites/adapters/donneesCollectivites.repository.axios';
  import { DonneesCollectivitesInseePresenterImpl } from '@/domaines/collectivites/adapters/donneesCollectivitesInsee.presenter.impl';
  import { ChercherCollectivitesUsecase } from '@/domaines/collectivites/chercherCollectivites.usecase';
  import { RechercheDeCollectiviteViewModel } from '@/domaines/collectivites/ports/chercherCollectivites.presenter';
  import { DonneesCollectivitesInseeViewModel } from '@/domaines/collectivites/ports/donneesCollectivitesInsee.presenter';
  import { RecupererDonneesCollectivitesInsee } from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';
  import { trackClick } from '@/shell/matomo';

  const route = useRoute();
  const router = useRouter();
  const villesADisposition: { nom: string; insee: string }[] = [
    { nom: 'Lille', insee: '59350' },
    { nom: 'CA du Pays Basque', insee: '64431' },
    { nom: 'CU du Grand Nancy', insee: '54395' },
    { nom: 'Métropole de Marseille-Provence-Aix', insee: '13201' },
  ];

  let resultatRechercheCollectivitesViewmodel = ref<RechercheDeCollectiviteViewModel>();
  let donneesCollectivitesInseeViewModel = ref<DonneesCollectivitesInseeViewModel>();
  const isLoadingListe = ref<boolean>(false);
  const isLoadingDetail = ref<boolean>(false);

  const chercherCollectivitesUsecase = new ChercherCollectivitesUsecase(new CollectiviteRepositoryAxios());
  const recupererDonneesCollectivitesInsee = new RecupererDonneesCollectivitesInsee(
    new DonneesCollectivitesRepositoryAxios(),
  );

  onMounted(() => {
    if (route.query?.insee) {
      chargerDetailCollectivite(route.query.insee as string);
    }
  });

  async function chercherCollectivites(recherche: string) {
    if (recherche.trim() === '') {
      resultatRechercheCollectivitesViewmodel.value = { listeDeCollectivites: [], message: '' };
      return;
    }

    isLoadingListe.value = true;

    await chercherCollectivitesUsecase
      .execute(
        recherche,
        new ChercherCollectivitesPresenterImpl(vm => (resultatRechercheCollectivitesViewmodel.value = vm)),
      )
      .finally(() => {
        isLoadingListe.value = false;
      });
  }

  async function chargerDetailCollectivite(insee: string) {
    trackCollectivitesClick(insee);

    isLoadingDetail.value = true;

    await recupererDonneesCollectivitesInsee.execute(
      insee,
      new DonneesCollectivitesInseePresenterImpl(vm => (donneesCollectivitesInseeViewModel.value = vm)),
    );
    await router.replace({ path: '/collectivitesEPCI', query: { insee } });

    isLoadingDetail.value = false;
  }

  const trackCollectivitesClick = insee => {
    trackClick('Collectivité', `Code INSEE : ${insee}`);
  };
</script>

<style scoped>
  .listeDeCollectivites {
    list-style-type: none;
    padding: 0;

    display: flex;
    text-align: left;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

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
