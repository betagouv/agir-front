<template>
  <div class="fr-container">
    <BoutonRetourAutomatique class="fr-mt-2w" />

    <AideDetail v-if="aide" :aide="aide" />
  </div>
</template>
<script lang="ts" setup>
  import { useHead } from '@unhead/vue';
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import BoutonRetourAutomatique from '@/components/custom/BoutonRetourAutomatique.vue';
  import AideDetail from '@/components/pages/AideDetail.vue';
  import { ChargementAidesAxiosRepository } from '@/domaines/aides/adapters/chargementAides.axios.repository';
  import { Aide } from '@/domaines/aides/chargementAides.usecase';
  import { ConsulterAideEnModeNonConnecteUsecase } from '@/domaines/aides/consulterAideEnModeNonConnecte.usecase';
  import { RecupererDetailAideUsecase } from '@/domaines/aides/recupererDetailAide.usecase';
  import useHeadProperties from '@/shell/useHeadProperties';
  import { utilisateurStore } from '@/store/utilisateur';

  const aide = ref<Aide>();

  useHead({
    ...useHeadProperties,
    title: computed(() => aide.value?.titre && `${aide.value.titre}`),
  });

  onMounted(async () => {
    const route = useRoute();
    const idAide = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    if (utilisateurStore().utilisateur.id) {
      const usecase = new RecupererDetailAideUsecase(new ChargementAidesAxiosRepository());
      aide.value = await usecase.execute(utilisateurStore().utilisateur.id, idAide);
    } else {
      const usecase = new ConsulterAideEnModeNonConnecteUsecase(new ChargementAidesAxiosRepository());
      aide.value = await usecase.execute(idAide);
    }
  });
</script>
