<template>
  <MenuLateral
    :liens="[
      { label: 'Vos informations', url: RouteCompteName.MON_COMPTE },
      { label: 'Votre logement', url: RouteCompteName.LOGEMENT },
      { label: 'Mieux vous connaître', url: RouteCompteName.MIEUX_VOUS_CONNAITRE },
      { label: 'Vos défis', url: RouteCompteName.DEFIS },
      { label: 'Options avancées', url: RouteCompteName.OPTIONS_AVANCEES },
    ]"
  />
</template>

<script setup lang="ts">
  import MenuLateral from '@/components/dsfr/MenuLateral.vue';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
</script>
