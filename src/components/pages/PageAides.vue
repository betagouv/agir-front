<template>
  <div class="fr-container fr-pb-3w">
    <FilDAriane page-courante="Vos aides" />
    <div v-if="isLoading">Chargement ...</div>
    <div v-else-if="!aides">Une erreur est survenue</div>
    <Aides v-else :aidesGroupesParCategorie="aides" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { ChargementAidesPresenterImpl } from '@/aides/adapters/chargementAides.presenter.impl';
  import { chargementAidesAxiosRepository } from '@/aides/adapters/chargementAidesAxiosRepository';
  import ChargementAidesUsecase from '@/aides/chargementAides.usecase';
  import { AidesViewModel } from '@/aides/ports/chargementAides.presenter';
  import Aides from '@/components/custom/Aides/Aides.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { PublierEvenemntRepositoryAxios } from '@/shell/adapters/publierEvenemnt.repository.axios';

  const aides = ref<AidesViewModel>();
  const isLoading = ref<boolean>(true);

  onMounted(async () => {
    const { id: utilisateurId } = utilisateurStore().utilisateur;
    const usecase = new ChargementAidesUsecase(
      new chargementAidesAxiosRepository(),
      new PublierEvenemntRepositoryAxios(),
    );
    await usecase.execute(
      utilisateurId,
      new ChargementAidesPresenterImpl(aidesViewModel => (aides.value = aidesViewModel)),
    );
    isLoading.value = false;
  });
</script>
