<template>
  <section class="fr-container fr-mt-3w">
    <h1 class="fr-h2">Collectivités</h1>
    <p>
      Découvrez tous les contenus <strong>déjà disponibles</strong> pour les habitants de votre collectivité !<br />
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
          description="Saisissez la commune dont vous voulez extraire les statistiques J'agis"
          class="fr-mb-0 full-width"
          @submit="chargerCommunesEPCI"
          is-large
        />
      </div>

      <CarteSkeleton v-if="isLoadingListe" />
      <template v-else-if="communesViewmodel">
        <ul class="listeDeCommunes">
          <li v-for="commune in communesViewmodel.listeDeCommunes" :key="commune.codeInsee">
            <button class="fr-btn fr-btn--tertiary" @click="chargerDetailCollectivite(commune.codeInsee)">
              {{ commune.nom }}
            </button>
          </li>
        </ul>

        <Callout
          v-if="communesViewmodel.message"
          class="text--left"
          titre="Votre recherche"
          :texte="communesViewmodel.message"
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
  import { ChargementCommunesEPCIPresenterImpl } from '@/domaines/communes/adapters/chargementCommunesEPCI.presenter.impl';
  import { CommuneRepositoryAxios } from '@/domaines/communes/adapters/commune.repository.axios';
  import { ChargementCommunesEPCIUsecase } from '@/domaines/communes/chargementCommunesEPCIUsecase';
  import { CommunesEPCIViewModel } from '@/domaines/communes/ports/chargementCommunesEPCI.presenter';

  const route = useRoute();
  const router = useRouter();

  let communesViewmodel = ref<CommunesEPCIViewModel>();
  // let detailCommunaute = ref<any>({});
  const isLoadingListe = ref<boolean>(false);
  const isLoadingDetail = ref<boolean>(false);

  const chargementCommunesEPCIUsecase = new ChargementCommunesEPCIUsecase(new CommuneRepositoryAxios());
  // const recupererDonneesCollectivitesParInseeUsecase = new RecupererDonneesCollectivitesParInsee(
  //   new DonneesCollectivitesRepositoryAxios(),
  // );

  if (route.query?.insee) {
    chargerDetailCollectivite(route.query.insee as string);
  }

  async function chargerCommunesEPCI(nom: string) {
    if (nom.trim() === '') {
      communesViewmodel.value = { listeDeCommunes: [], message: '' };
      return;
    }

    isLoadingListe.value = true;

    await chargementCommunesEPCIUsecase
      .execute(nom, new ChargementCommunesEPCIPresenterImpl(nom, vm => (communesViewmodel.value = vm)))
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
  .listeDeCommunes {
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
