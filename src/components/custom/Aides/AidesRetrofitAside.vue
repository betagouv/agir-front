<template>
  <CarteInfo>
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Données utilisées pour l’estimation
    </p>
    <ul>
      <li>
        Code postal : <span class="fr-text--bold">{{ codePostal }} {{ ville }}</span>
      </li>
      <li>
        Revenu fiscal de référence : <span class="fr-text--bold">{{ revenuFiscal }} </span> <br />
        <span v-if="revenuFiscal === null">⚠️ Donnée à compléter</span>
      </li>
      <li>
        Nombre de parts fiscales : <span class="fr-text--bold">{{ nombreDePartsFiscales }}</span>
      </li>
    </ul>
    <div class="fr-grid-row flex-center" v-if="revenuFiscal === null">
      <span class="fr-text--bold">Pour estimer vos aides</span>
      <router-link
        class="fr-btn display-block text--center full-width"
        :to="{ name: RouteAidesName.RETROFIT_FORMULAIRE }"
      >
        Compléter vos données
      </router-link>
    </div>
    <router-link
      v-else
      class="fr-link fr-icon-arrow-right-line fr-link--icon-right text--black-light"
      :to="{ name: RouteAidesName.RETROFIT_FORMULAIRE }"
    >
      Modifier ces données
    </router-link>
  </CarteInfo>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import { RouteAidesName } from '@/router/aides/routeAidesName';

  defineProps<{
    codePostal: string;
    ville: string;
    revenuFiscal: number | null;
    nombreDePartsFiscales: number;
  }>();
</script>
