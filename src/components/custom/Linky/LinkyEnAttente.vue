<template>
  <section>
    <p class="text--center">
      <!-- !! IMAGE A METTRE ICI !! FORMAT MAQUETTE PNG PAS BON -->
      <!-- <img class="display-block fr-mx-auto fr-mb-2w" src="XXX" height="XXX" alt="" /> -->
      <!-- !! IMAGE A METTRE ICI !! -->
      Votre service est en cours de connexion.<br />
      <strong>Revenez plus tard</strong> pour consulter vos données.
    </p>
    <CarteInfo>
      <LinkyExplicationAleatoire />
    </CarteInfo>
  </section>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import LinkyExplicationAleatoire from '@/components/custom/Linky/LinkyExplicationAleatoire.vue';
</script>
