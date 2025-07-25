<template>
  <section>
    <div class="flex flex-space-between align-items--center flex-wrap fr-mb-3w">
      <slot name="titre" />
      <p v-if="afficherMangerBouge" class="text--italic fr-mb-0">
        avec <img alt="manger bouger" class="fr-ml-2w" src="/logo-manger-bouger.svg" />
      </p>
      <router-link
        v-else
        :to="{
          name: RouteServiceName.RECETTES,
          params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url },
          query: { type: parametreDeRecherche.categorie, sous_catagorie: parametreDeRecherche.sous_catagorie },
        }"
        class="fr-link"
        >Voir tout
      </router-link>
    </div>

    <ul v-if="serviceRecettesViewModel" class="fr-grid-row fr-grid-row--gutters fr-mb-2w list-style-none">
      <li
        v-for="suggestion in serviceRecettesViewModel?.suggestions"
        :key="suggestion.titre"
        :class="`col-card fr-col-12 fr-col-sm-6 fr-col-md-${12 / props.nombreDeCartesParLigne}`"
      >
        <ServiceCarteImage :options="{ descriptionDesactive: true }" :suggestionsServiceViewModel="suggestion" />
      </li>
    </ul>

    <router-link
      v-if="afficherMangerBouge"
      :to="{
        name: RouteServiceName.RECETTES,
        params: {
          thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
        },
        query: {
          type: parametreDeRecherche.categorie,
          sous_catagorie: parametreDeRecherche.sous_catagorie,
        },
      }"
      class="fr-link"
      >Voir toutes les recettes
    </router-link>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import ServiceCarteImage from '@/components/custom/Service/ServiceCarteImage.vue';
  import {
    ServiceRechercheRecettesPresenterImpl,
    ServiceRechercheRecettesViewModel,
  } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.presenter.impl';
  import { ServiceRechercheRecettesAxios } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.repository.axios';
  import { RecupererServiceRecettesUsecase } from '@/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RouteServiceName } from '@/router/services/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = withDefaults(
    defineProps<{
      parametreDeRecherche: {
        categorie: string;
        sous_catagorie?: string;
      };
      nombreDeCartesParLigne?: number;
      afficherMangerBouge?: boolean;
    }>(),
    { nombreDeCartesParLigne: 4, afficherMangerBouge: true },
  );
  const isLoading = ref<boolean>(true);
  const serviceRecettesViewModel = ref<ServiceRechercheRecettesViewModel>();

  const usecase = new RecupererServiceRecettesUsecase(new ServiceRechercheRecettesAxios());

  onMounted(() => {
    lancerRecherche();
  });

  const lancerRecherche = async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      props.parametreDeRecherche,
      props.nombreDeCartesParLigne,
      new ServiceRechercheRecettesPresenterImpl(vm => {
        serviceRecettesViewModel.value = vm;
      }),
    );
    isLoading.value = false;
  };
</script>

<style scoped>
  h2 {
    font-weight: normal;
    font-size: 1.75rem;
  }
</style>
