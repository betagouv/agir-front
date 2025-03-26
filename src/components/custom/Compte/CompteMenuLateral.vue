<template>
  <MenuLateral
    :liens="[
      { label: 'Mes informations', url: RouteCompteName.MON_COMPTE },
      { label: 'Mon logement', url: RouteCompteName.LOGEMENT },
      { label: 'Mieux vous connaître', url: RouteCompteName.MIEUX_VOUS_CONNAITRE },
      { label: 'Options avancées', url: RouteCompteName.OPTIONS_AVANCEES },
    ]"
  />
</template>

<script lang="ts" setup>
  import MenuLateral from '@/components/dsfr/MenuLateral.vue';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>
