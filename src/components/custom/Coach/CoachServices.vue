<template>
  <div>
    <h3>Mes services</h3>
    <ul class="list-style-none fr-mt-6w fr-pl-0">
      <li v-for="service in services?.services" :key="service.label" class="fr-mb-2w">
        <ServiceLink :url="service.url" :label="service.label" :picto="service.picto" :legende="service.legende" />
      </li>
    </ul>
    <p>Retrouvez plus de services dans vos thématiques...</p>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import ServiceLink from '@/components/custom/Service/ServiceLink.vue';
  import {
    ServiceRecherchePresenterImpl,
    ServicesRechercheViewModel,
  } from '@/domaines/serviceRecherche/catalogue/adapters/serviceRecherche.presenter.impl';
  import { ServiceRechercheRepositoryAxios } from '@/domaines/serviceRecherche/catalogue/adapters/serviceRecherche.repository.axios';
  import { RecupererServicesRecherchePageAccueilUsecase } from '@/domaines/serviceRecherche/catalogue/recupererServicesRecherchePageAccueil.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const services = ref<ServicesRechercheViewModel>();
  onMounted(async () => {
    const recupererServicesRecherchePageAccueilUsecase = new RecupererServicesRecherchePageAccueilUsecase(
      new ServiceRechercheRepositoryAxios(),
    );
    await recupererServicesRecherchePageAccueilUsecase.execute(
      utilisateurStore().utilisateur.id,
      new ServiceRecherchePresenterImpl(viewModel => {
        services.value = viewModel;
      }),
    );
  });
</script>
