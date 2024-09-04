<template>
  <section>
    <p class="text--center">
      <img class="display-block fr-mx-auto fr-mb-2w" src="/ic_linky_en_attente.svg" height="130" alt="" />
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
