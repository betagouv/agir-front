<template>
  <section class="fr-container fr-mt-3w">
    <h1 class="fr-h2">Collectivités</h1>
    <p>
      Découvrez tous les contenus <span class="text--bold">déjà disponibles</span> pour les habitants de votre
      collectivité !<br />
      Les informations sont incomplètes ? Contactez-nous en bas de page.
    </p>
  </section>

  <section class="fr-container fr-my-6w">
    <h2 class="fr-h3">Renseignez votre collectivité</h2>
    <div class="flex flex-column flex-center gap--small fr-mb-8w text--center width--fit-content">
      <div class="position--relative">
        <InputSearchBar
          id="champDeRecherche"
          name="champDeRecherche"
          placeholder="Nom de la collectivité"
          label="Nom de la collectivité"
          description="Saisissez la collectivité dont vous voulez extraire les statistiques J'agis"
          class="fr-mb-0 full-width"
          @submit="chercherCollectivites"
          is-large
        />
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
          class="text--left"
          titre="Votre recherche"
          :texte="resultatRechercheCollectivitesViewmodel.message"
        />
      </template>
    </div>
  </section>

  <section class="fr-container full-width fr-mb-6w">
    <LandingCollectivite />
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import LandingCollectivite from '@/components/custom/Landing/LandingCollectivite.vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import Callout from '@/components/dsfr/Callout.vue';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  // import { DonneesCollectivitesPresenterImpl } from '@/domaines/collectivites/adapters/donneesCollectivites.presenter.impl';
  // import { DonneesCollectivitesRepositoryAxios } from '@/domaines/collectivites/adapters/donneesCollectivites.repository.axios';
  // import { RecupererDonneesCollectivitesParInsee } from '@/domaines/collectivites/recupererDonneesCollectivitesParInsee.usecase';
  import { ChercherCollectivitesPresenterImpl } from '@/domaines/collectivites/adapters/chercherCollectivites.presenter.impl';
  import { CollectiviteRepositoryAxios } from '@/domaines/collectivites/adapters/collectivite.repository.axios';
  import { ChercherCollectivitesUsecase } from '@/domaines/collectivites/chercherCollectivites.usecase';
  import { RechercheDeCollectiviteViewModel } from '@/domaines/collectivites/ports/chercherCollectivites.presenter';

  const route = useRoute();
  const router = useRouter();

  let resultatRechercheCollectivitesViewmodel = ref<RechercheDeCollectiviteViewModel>();
  // let detailCommunaute = ref<any>({});
  const isLoadingListe = ref<boolean>(false);
  const isLoadingDetail = ref<boolean>(false);

  const chercherCollectivitesUsecase = new ChercherCollectivitesUsecase(new CollectiviteRepositoryAxios());
  // const recupererDonneesCollectivitesParInseeUsecase = new RecupererDonneesCollectivitesParInsee(
  //   new DonneesCollectivitesRepositoryAxios(),
  // );

  if (route.query?.insee) {
    chargerDetailCollectivite(route.query.insee as string);
  }

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
    isLoadingDetail.value = true;

    // detailCommunaute.value = recupererDonneesCollectivitesParInseeUsecase.execute(
    //   insee,
    //   new DonneesCollectivitesPresenterImpl(),
    // );
    await router.replace({ path: '/collectivitesEPCI', query: { insee } });

    isLoadingDetail.value = false;
  }
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
