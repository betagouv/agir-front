<template>
  <MenuLateral
    :liens="[
      { label: 'Vos informations', url: RouteCompteName.MON_COMPTE },
      { label: 'Options avancées', url: RouteCompteName.OPTIONS_AVANCEES },
      { label: 'Mieux vous connaître', url: RouteCompteName.MIEUX_VOUS_CONNAITRE },
    ]"
  />
</template>

<script setup lang="ts">
  import MenuLateral from '@/components/dsfr/MenuLateral.vue';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>
