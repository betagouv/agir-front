<template>
  <section>
    <div class="flex flex-space-between align-items--center flex-wrap">
      <slot name="titre" />
      <p class="text--italic">avec <img alt="manger bouger" class="fr-ml-2w" src="/logo-manger-bouger.svg" /></p>
    </div>

    <ul v-if="serviceRecettesViewModel" class="fr-grid-row fr-grid-row--gutters fr-mb-2w list-style-none">
      <li
        v-for="suggestion in serviceRecettesViewModel?.suggestions"
        :key="suggestion.titre"
        class="fr-col-12 fr-col-sm-6 fr-col-md-3"
      >
        <ServiceCarteDsfr :suggestionsServiceViewModel="suggestion" :options="{ descriptionDesactive: true }" />
      </li>
    </ul>

    <div>
      <router-link
        :to="{
          name: RouteServiceName.RECETTES,
          params: {
            thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
          },
        }"
        class="fr-link"
        >Voir toutes les recettes
      </router-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import ServiceCarteDsfr from '@/components/custom/Service/ServiceCarteDSFR.vue';
  import {
    ServiceRechercheRecettesPresenterImpl,
    ServiceRechercheRecettesViewModel,
  } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.presenter.impl';
  import { ServiceRechercheRecettesAxios } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.repository.axios';
  import { RecupererServiceRecettesUsecase } from '@/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RouteServiceName } from '@/router/services/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    parametreDeRecherche: string;
  }>();
  const isLoading = ref<boolean>(true);
  const serviceRecettesViewModel = ref<ServiceRechercheRecettesViewModel>();

  const usecase = new RecupererServiceRecettesUsecase(new ServiceRechercheRecettesAxios());

  let nombreMaxResultats = 4;

  onMounted(() => {
    lancerRecherche();
  });

  const lancerRecherche = async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      props.parametreDeRecherche,
      nombreMaxResultats,
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
