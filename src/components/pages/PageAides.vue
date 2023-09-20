<template>
  <div v-if="isLoading">Chargement ...</div>
  <div v-else-if="!aides">Une erreur est survenue</div>
  <MesAides v-else :aidesGroupesParCategorie="aides" />
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { ChargementAidesPresenterImpl } from '@/aides/adapters/chargementAides.presenter.impl';
  import { ChargementAidesInMemoryRepository } from '@/aides/adapters/chargementAidesInMemory.repository';
  import ChargementAidesUsecase from '@/aides/chargementAides.usecase';
  import { AidesViewModel } from '@/aides/ports/chargementAides.presenter';
  import MesAides from '@/components/MesAides.vue';

  const aides = ref<AidesViewModel>();
  const isLoading = ref<boolean>(true);

  function mapAides(aidesViewModel: AidesViewModel) {
    aides.value = aidesViewModel;
  }

  onMounted(async () => {
    await new ChargementAidesUsecase(new ChargementAidesInMemoryRepository()).execute(new ChargementAidesPresenterImpl(mapAides));
    isLoading.value = false;
  });
</script>
