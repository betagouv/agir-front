<template>
  <h2 class="fr-h3">Renseignez votre collectivité</h2>
  <div class="flex flex-column gap--small width--fit-content full-width">
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
          <button class="fr-tag" href="#" @click="onCollectiviteClick(ville.insee)">
            {{ ville.nom }}
          </button>
        </li>
      </ul>
    </div>

    <CarteSkeleton v-if="isLoadingListe" />
    <template v-else-if="resultatRechercheCollectivitesViewmodel">
      <ul class="listeDeCollectivites fr-my-2w">
        <li
          v-for="collectivite in resultatRechercheCollectivitesViewmodel.listeDeCollectivites"
          :key="collectivite.codeInsee"
        >
          <button class="fr-btn fr-btn--tertiary" @click="onCollectiviteClick(collectivite.codeInsee)">
            {{ collectivite.nom }}
          </button>
        </li>
      </ul>

      <Callout
        v-if="resultatRechercheCollectivitesViewmodel.message"
        :texte="resultatRechercheCollectivitesViewmodel.message"
        :icone-information="true"
        titre="Votre recherche"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import Callout from '@/components/dsfr/Callout.vue';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  import { ChercherCollectivitesPresenterImpl } from '@/domaines/collectivites/adapters/chercherCollectivites.presenter.impl';
  import { CollectiviteRepositoryAxios } from '@/domaines/collectivites/adapters/collectivite.repository.axios';
  import { ChercherCollectivitesUsecase } from '@/domaines/collectivites/chercherCollectivites.usecase';
  import { RechercheDeCollectiviteViewModel } from '@/domaines/collectivites/ports/chercherCollectivites.presenter';

  const props = defineProps<{ onCollectiviteClick: (insee: string) => void; onSearch: () => void }>();

  const villesADisposition: { nom: string; insee: string }[] = [
    { nom: 'Lille', insee: '59350' },
    { nom: 'CA du Pays Basque', insee: '200067106' },
    { nom: 'CU du Grand Reims', insee: '200067213' },
    { nom: "Métropole d'Aix-Marseille-Provence", insee: '200054807' },
  ];

  const isLoadingListe = ref<boolean>(false);

  let resultatRechercheCollectivitesViewmodel = ref<RechercheDeCollectiviteViewModel>();
  const chercherCollectivitesUsecase = new ChercherCollectivitesUsecase(new CollectiviteRepositoryAxios());

  async function chercherCollectivites(recherche: string) {
    props.onSearch();

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

  const onCollectiviteClick = (insee: string) => {
    props.onCollectiviteClick(insee);
    resultatRechercheCollectivitesViewmodel.value = undefined;
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

  button {
    justify-content: center;
  }
</style>
