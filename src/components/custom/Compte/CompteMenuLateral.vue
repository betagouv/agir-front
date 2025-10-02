<template>
  <MenuLateral
    :sections="[
      {
        titre: 'Mon compte',
        liens: [{ label: 'Mon profil', url: RouteCompteName.MON_COMPTE, icon: 'fr-icon-account-circle-line' }],
      },
      {
        titre: 'Mes réponses',
        liens: [
          {
            label: 'Me nourrir',
            url: RouteCompteName.THEMATIQUE,
            params: { thematiqueId: ThematiqueURL.alimentation },
            icon: 'fr-icon-seedling-line',
          },
          {
            label: 'Me loger',
            url: RouteCompteName.THEMATIQUE,
            params: { thematiqueId: ThematiqueURL.logement },
            icon: 'fr-icon-home-4-line',
          },
          {
            label: 'Me déplacer',
            url: RouteCompteName.THEMATIQUE,
            params: { thematiqueId: ThematiqueURL.transports },
            icon: 'fr-icon-bike-line',
          },
          {
            label: 'Mes achats',
            url: RouteCompteName.THEMATIQUE,
            params: { thematiqueId: ThematiqueURL.consommation },
            icon: 'fr-icon-tv-line',
          },
          { label: 'Mes réponses', url: RouteCompteName.MES_REPONSES, icon: 'fr-icon-account-circle-line' },
        ],
      },
    ]"
  />
</template>

<script lang="ts" setup>
  import MenuLateral from '@/components/dsfr/MenuLateral.vue';
  import { ThematiqueURL } from '@/domaines/thematiques/MenuThematiques';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>
