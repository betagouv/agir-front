<template>
  <div class="fr-container">
    <router-link
      :to="{ path: useNavigationStore().pagePrecedente.path }"
      class="fr-btn fr-btn--icon-left fr-btn--tertiary-no-outline fr-icon-arrow-left-line fr-pl-0"
    >
      Retour
    </router-link>
    <AideDetail v-if="aide" :aide="aide" />
  </div>
</template>
<script lang="ts" setup>
  import { useHead } from '@unhead/vue';
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import AideDetail from '@/components/pages/AideDetail.vue';
  import { ChargementAidesAxiosRepository } from '@/domaines/aides/adapters/chargementAides.axios.repository';
  import { Aide } from '@/domaines/aides/chargementAides.usecase';
  import { ConsulterAideEnModeNonConnecteUsecase } from '@/domaines/aides/consulterAideEnModeNonConnecte.usecase';
  import { RecupererDetailAideUsecase } from '@/domaines/aides/recupererDetailAide.usecase';
  import { useNavigationStore } from '@/store/navigationStore';
  import { utilisateurStore } from '@/store/utilisateur';

  const aide = ref<Aide>();

  useHead({
    title: computed(() => aide.value?.titre && `${aide.value.titre} - J'agis`),
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
