<template>
  <div class="fr-container">
    <AideDetail v-if="aide" :aide="aide" />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import AideDetail from '@/components/pages/AideDetail.vue';
  import { ChargementAidesAxiosRepository } from '@/domaines/aides/adapters/chargementAides.axios.repository';
  import { Aide } from '@/domaines/aides/chargementAides.usecase';
  import { PrevisualiserAideUsecase } from '@/domaines/aides/previsualiserAide.usecase';

  const aide = ref<Aide>();

  onMounted(async () => {
    const route = useRoute();
    const idArticle = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const usecase = new PrevisualiserAideUsecase(new ChargementAidesAxiosRepository());
    aide.value = await usecase.execute(idArticle);
  });
</script>
