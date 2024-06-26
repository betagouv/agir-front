<template>
  <nav class="print-hidden fr-grid-row fr-grid-row--middle fr-mt-0 fr-background-action-high--blue-france fr-p-2w">
    <span class="fr-icon-layout-grid-fill text--white text--bold fr-col fr-mr-2w">Vos services</span>
    <ul class="fr-grid-row service__list fr-col-10 list-style-none fr-p-0">
      <li class="fr-p-0 fr-col" v-for="service in servicesViewModels" :key="service.contenu">
        <router-link
          v-if="service.id === 'linky'"
          :to="{ name: RouteCoachName.SERVICES_LINKY }"
          class="service__link fr-text--xs text--black-light background--white border-radius--md fr-p-2v fr-mb-0"
        >
          <div class="fr-grid-row flex-column">
            {{ service.titre }}
            <span class="fr-text--bold">{{ service.contenu }}</span>
          </div>
        </router-link>
        <a
          v-else
          role="link"
          :href="service.url"
          target="_blank"
          class="service__link service__link--externe fr-text--xs text--black-light background--white border-radius--md fr-p-2v fr-mb-0"
        >
          <div class="fr-grid-row flex-column">
            {{ service.titre }}
            <span class="fr-text--bold">{{ service.contenu }}</span>
          </div>
        </a>
      </li>
      <li class="fr-grid-row fr-grid-row--middle fr-p-0">
        <router-link class="fr-mb-0 add__service fr-text--sm text--white" :to="{ name: RouteCoachName.SERVICES }">
          + Ajouter des services
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { ServicePresenterImpl, ServiceViewModel } from '@/domaines/services/adapters/service.presenter.impl';
  import { ServiceRepositoryAxios } from '@/domaines/services/adapters/service.repository.axios';
  import { RecupererServiceActifsUsecase } from '@/domaines/services/recupererServiceActifs.usecase';
  import { ServiceEvent, ServiceEventBusImpl } from '@/domaines/services/serviceEventBusImpl';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { utilisateurStore } from '@/store/utilisateur';

  const servicesViewModels = ref<ServiceViewModel[]>();

  const mapValuesServicesViewmodel = (services: ServiceViewModel[]) => {
    servicesViewModels.value = services;
  };
  const utilisateurId: string = utilisateurStore().utilisateur.id;
  const recupererServicesActifs = new RecupererServiceActifsUsecase(new ServiceRepositoryAxios());
  const servicePresenterImpl = new ServicePresenterImpl(mapValuesServicesViewmodel);
  recupererServicesActifs.execute(utilisateurId, servicePresenterImpl);
  const subscriberName = 'Services';

  onMounted(() => {
    ServiceEventBusImpl.getInstance().subscribe(subscriberName, ServiceEvent.SERVICE_SUPPRIME, () => {
      recupererServicesActifs.execute(utilisateurId, servicePresenterImpl);
    });

    ServiceEventBusImpl.getInstance().subscribe(subscriberName, ServiceEvent.SERVICE_INSTALLE, () => {
      recupererServicesActifs.execute(utilisateurId, servicePresenterImpl);
    });
  });

  onUnmounted(() => {
    ServiceEventBusImpl.getInstance().unsubscribeToAllEvents(subscriberName);
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

  .service__link--externe {
    position: relative;
    padding-right: 2rem !important;
  }

  .service__link--externe::after {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    margin-top: -0.5rem;
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
