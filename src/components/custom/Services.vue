<template>
  <nav class="fr-grid-row fr-grid-row--middle fr-mt-0 fr-background-action-high--blue-france fr-p-2w">
    <span class="fr-icon-layout-grid-fill text--white text--bold fr-col fr-mr-2w">Vos services</span>
    <ul class="fr-grid-row service__list fr-col-10 list-style-none fr-p-0">
      <li class="fr-p-0 fr-col" v-for="service in servicesViewModels" :key="service.contenu">
        <a
          v-if="service.isUrlExterne"
          role="link"
          :href="service.url"
          target="_blank"
          class="service__link fr-text--xs text--black-light background--white border-radius--md fr-p-2v fr-mb-0"
        >
          <div class="fr-grid-row flex-column">
            {{ service.titre }}
            <span class="fr-text--bold">{{ service.contenu }}</span>
          </div>
        </a>
        <router-link
          v-else
          :to="service.url"
          class="service__link fr-text--xs text--black-light background--white border-radius--md fr-p-2v fr-mb-0"
        >
          <div class="fr-grid-row flex-column">
            {{ service.titre }}
            <span class="fr-text--bold">{{ service.contenu }}</span>
          </div>
        </router-link>
      </li>
      <li class="fr-grid-row align-items--center fr-p-0">
        <router-link class="fr-mb-0 add__service fr-text--sm text--white" :to="{ name: 'services' }">
          + Ajouter des services
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { ServicePresenterImpl, ServiceViewModel } from '@/services/adapters/service.presenter.impl';
  import { RecupererServiceActifsUsecase } from '@/services/recupererServiceActifs.usecase';
  import { ServiceRepositoryAxios } from '@/services/adapters/service.repository.axios';
  import { onMounted, ref } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ServiceEvent, ServiceEventBusImpl } from '@/services/serviceEventBusImpl';
  const servicesViewModels = ref<ServiceViewModel[]>();

  const mapValuesServicesViewmodel = (services: ServiceViewModel[]) => {
    servicesViewModels.value = services;
  };
  const utilisateurId: string = utilisateurStore().utilisateur.id;
  const recupererServicesActifs = new RecupererServiceActifsUsecase(new ServiceRepositoryAxios());
  const servicePresenterImpl = new ServicePresenterImpl(mapValuesServicesViewmodel);
  recupererServicesActifs.execute(utilisateurId, servicePresenterImpl);
  onMounted(() => {
    ServiceEventBusImpl.getInstance().subscribe(ServiceEvent.SERVICE_SUPPRIME, () => {
      recupererServicesActifs.execute(utilisateurId, servicePresenterImpl);
    });

    ServiceEventBusImpl.getInstance().subscribe(ServiceEvent.SERVICE_INSTALLE, () => {
      recupererServicesActifs.execute(utilisateurId, servicePresenterImpl);
    });
  });
</script>

<style scoped>
  .service__link {
    background-image: none;
    display: block;
  }
  .service__link:hover {
    background-color: white;
    color: var(--blue-france-sun-113-625);
  }
  .fr-col {
    flex: none;
  }

  .service__list {
    gap: 1rem;
  }

  .add__service {
    display: block;
    border: 1px solid white;
    padding: 6px 8px;
    text-decoration: none;
    background-image: none;
  }

  .fr-icon-layout-grid-fill:before {
    opacity: 0.5;
    margin-right: 1rem;
  }
</style>
