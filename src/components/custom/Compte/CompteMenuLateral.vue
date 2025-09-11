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
            label: 'Me loger',
            url: RouteCompteName.THEMATIQUE,
            params: { thematiqueId: ThematiqueURL.logement },
            icon: 'fr-icon-account-circle-line',
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
