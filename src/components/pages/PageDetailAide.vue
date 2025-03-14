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
  import { RecupererDetailAideUsecase } from '@/domaines/aides/recupererDetailAide.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const aide = ref<Aide>();

  onMounted(async () => {
    const route = useRoute();
    const idAide = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const usecase = new RecupererDetailAideUsecase(new ChargementAidesAxiosRepository());
    aide.value = await usecase.execute(utilisateurStore().utilisateur.id, idAide);
  });
</script>
