<template>
  <FilDAriane
    page-courante="Acheter un vélo"
    :page-hierarchie="[{label: 'Aides fincancières', url: 'mes-aides'}]"
  />
  <AidesResultat />
</template>

<script setup lang="ts">
  import FilDAriane from "@/components/dsfr/FilDAriane.vue";
  import AidesResultat from "@/components/custom/AidesResultat.vue";

  defineProps<{
    titre: string
  }>();
</script>