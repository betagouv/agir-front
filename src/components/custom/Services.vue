<template>
  <div
    class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle text--center fr-background-action-high--blue-france text--white fr-p-3w"
  >
    <span class="text--center text--bold fr-mr-4w">Aujourd'hui</span>
    <div class="fr-col fr-px-1v" v-for="service in services" :key="service.label">
      <a
        role="link"
        :href="service.url"
        :target="service.isUrlExterne ? '_blank' : '_self'"
        class="service__link fr-text--xs fr-text--bold text--black-light fr-grid-row fr-grid-row--middle background--white border-radius--md fr-mr-2w fr-px-2v fr-p-1v"
      >
        {{ service.label }}
      </a>
    </div>
    <router-link class="fr-text--sm fr-m-0 text--center" :to="{ name: 'coach' }">
      + Ajouter d'autres services
    </router-link>
  </div>
</template>
<script setup lang="ts">
  interface ServiceViewModel {
    label: string;
    url: string;
    isUrlExterne: boolean;
  }

  const services: ServiceViewModel[] = [
    {
      label: '🥦 Recette gratin de brocoli !',
      url: '/',
      isUrlExterne: false,
    },
    {
      label: '⚡️ 58 kW consommé',
      url: '/',
      isUrlExterne: true,
    },
    {
      label: '🚗 Suivi du jour transport (à faire)',
      url: '/coach/suivi-du-jour',
      isUrlExterne: false,
    },
  ];
</script>
<style scoped>
  .service__link {
    background-image: none;
  }
  .service__link:hover {
    background-color: white;
    color: var(--blue-france-sun-113-625);
  }
  .fr-col {
    flex: none;
  }
</style>
