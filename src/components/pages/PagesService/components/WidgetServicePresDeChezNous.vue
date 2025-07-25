<template>
  <section v-if="serviceRecherchePresDeChezNousViewModel" class="full-height">
    <div class="flex flex-space-between flex-wrap align-items--center fr-mb-1w">
      <h2 class="fr-h3 fr-mb-0">Mes commerces</h2>
      <div>
        <router-link
          :to="{
            name: RouteServiceName.PROXIMITE,
            params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).url },
          }"
          class="fr-link"
        >
          Voir tous les commerces
        </router-link>
      </div>
    </div>

    <ul
      class="fr-grid-row fr-grid-row--gutters list-style-none full-width fr-m-0"
      v-if="!serviceRecherchePresDeChezNousViewModel.aucunResultat"
    >
      <li
        v-for="suggestion in (
          serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats
        ).suggestions"
        :key="suggestion.titre"
        :class="`fr-col-sm-${12 / nombreDeCartesParLigne} fr-col`"
      >
        <ServiceCarteHeaderAlternatif
          :suggestionsServiceViewModel="suggestion"
          style-carte="fr-card--horizontal fr-card--horizontal-tier fr-card--sm"
        />
      </li>
    </ul>
    <div v-else class="text--center fr-pt-md-5w">
      <img alt="" height="250" src="/service_aucun_resultat.svg" />
      <p class="fr-text--lg">
        <span aria-hidden="true">😢 </span>Aucun résultat n’est encore disponible pour votre localisation
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import ServiceCarteHeaderAlternatif from '@/components/custom/Service/ServiceCarteHeaderAlternatif.vue';
  import {
    ServiceRecherchePresDeChezNousPresenterImpl,
    ServiceRecherchePresDeChezNousViewModel,
    ServiceRecherchePresDeChezNousViewModelAvecResultats,
  } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.presenter.impl';
  import { ServiceRecherchePresDeChezNousAxios } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.repository.axios';
  import { RecupererServicePresDeChezNousUsecase } from '@/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RouteServiceName } from '@/router/services/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    nombreDeCartesParLigne: number;
  }>();

  const isLoading = ref<boolean>(true);
  const serviceRecherchePresDeChezNousViewModel = ref<ServiceRecherchePresDeChezNousViewModel>();
  const usecase = new RecupererServicePresDeChezNousUsecase(new ServiceRecherchePresDeChezNousAxios());

  onMounted(() => {
    lancerRecherche();
  });

  async function lancerRecherche() {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      '',
      2,
      new ServiceRecherchePresDeChezNousPresenterImpl(
        vm => (serviceRecherchePresDeChezNousViewModel.value = vm),
        () => {},
      ),
    );

    isLoading.value = false;
  }
</script>

<style scoped>
  h2 {
    font-weight: normal;
    font-size: 1.75rem;
  }
</style>
