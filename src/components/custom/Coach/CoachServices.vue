<template>
  <div>
    <h3>Mes services</h3>
    <ul class="list-style-none fr-mt-6w">
      <li>
        <ServiceLink
          :url="RouteServiceName.SERVICE_FRUITS_ET_LEGUMES"
          label="Fruits et légumes de saison"
          picto="/cerise.png"
          :legende="moisCourant"
        />
      </li>
      <li class="fr-mt-2w">
        <ServiceLink
          :url="RouteServiceName.PROXIMITE"
          label="Mes commerces de proximité"
          picto="/commerce.png"
          :legende="moisCourant"
        />
      </li>
      <li class="fr-mt-2w">
        <ServiceLink
          :url="RouteServiceName.RECETTES"
          label="Recettes saines et équilibrées"
          picto="/omelette.png"
          :legende="moisCourant"
        />
      </li>
    </ul>
    <p>Retrouvez plus de services dans vos univers...</p>
  </div>
</template>

<script setup lang="ts">
  import ServiceLink from '@/components/custom/Service/ServiceLink.vue';
  import { RouteServiceName } from '@/router/services/routes';

  const determineMoisCourant = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    const moisEnFrancais = new Intl.DateTimeFormat('fr-FR', options).format(date);

    return moisEnFrancais.charAt(0).toUpperCase() + moisEnFrancais.slice(1);
  };

  const moisCourant = determineMoisCourant();
</script>
