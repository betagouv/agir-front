<template>
  <section v-if="serviceRecherchePresDeChezNousViewModel" class="full-height">
    <div class="flex flex-space-between align-items--center fr-mb-3w">
      <h2 class="fr-h3 fr-mb-0">Mes commerces</h2>
      <div>
        <router-link
          :to="{
            name: RouteServiceName.FRUITS_ET_LEGUMES,
            params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url },
          }"
          class="fr-link"
        >
          Voir tout
        </router-link>
      </div>
    </div>

    <ul class="flex flex-column list-style-none fr-p-0 fr-m-0" style="gap: 1rem">
      <li
        v-for="suggestion in (
          serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats
        ).suggestions"
        :key="suggestion.titre"
      >
        <ServiceCarteDsfr
          :suggestionsServiceViewModel="suggestion"
          style-carte="fr-card--horizontal fr-card--horizontal-tier"
        />
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import ServiceCarteDsfr from '@/components/custom/Service/ServiceCarteDSFR.vue';
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
