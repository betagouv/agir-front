<template>
  <MenuLateral
    :liens="[
      { label: 'Mes informations', url: RouteCompteName.MON_COMPTE },
      { label: 'Mon logement', url: RouteCompteName.LOGEMENT },
      { label: 'Mieux vous connaître', url: RouteCompteName.MIEUX_VOUS_CONNAITRE },
      { label: 'Mes actions', url: RouteCompteName.DEFIS },
      { label: 'Options avancées', url: RouteCompteName.OPTIONS_AVANCEES },
    ]"
  />
</template>

<script setup lang="ts">
  import MenuLateral from '@/components/dsfr/MenuLateral.vue';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>
