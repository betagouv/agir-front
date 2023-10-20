<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement ...</div>
    <div v-else-if="!aides">Une erreur est survenue</div>
    <Aides v-else :aidesGroupesParCategorie="aides" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { ChargementAidesPresenterImpl } from '@/aides/adapters/chargementAides.presenter.impl';
  import { chargementAidesAxiosCmsRepository } from '@/aides/adapters/chargementAidesAxiosCms.repository';
  import ChargementAidesUsecase from '@/aides/chargementAides.usecase';
  import { AidesViewModel } from '@/aides/ports/chargementAides.presenter';
  import Aides from '@/components/custom/Aides/Aides.vue';

  const aides = ref<AidesViewModel>();
  const isLoading = ref<boolean>(true);

  function mapAides(aidesViewModel: AidesViewModel) {
    aides.value = aidesViewModel;
  }

  onMounted(async () => {
    await new ChargementAidesUsecase(new chargementAidesAxiosCmsRepository()).execute(
      new ChargementAidesPresenterImpl(mapAides)
    );
    isLoading.value = false;
  });
</script>
