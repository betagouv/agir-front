<template>
  <form @submit.prevent="submitEtapeAlimentation">
    <BoutonRadio
      class="fr-mb-2w"
      legende="En règle générale, vous mangez plutôt"
      name="repas"
      legende-size="l"
      orientation="vertical"
      :options="[
        { label: 'Aucun', value: 'vegan' },
        { label: 'Entre 1 et 3 fois par semaine', value: 'vege' },
        { label: 'Entre 4 à 6 fois par semaine', value: 'tout' },
        { label: 'Au moins 7 fois par semaine (au moins 1 repas sur 2)', value: 'viande' },
      ]"
      col=""
      v-model="viewModel.repas"
      :default-value="viewModel.repas"
    />
    <button class="fr-link fr-icon-arrow-left-line fr-link--icon-left fr-mr-4w" @click="retourEtapePrecedente">
      Précédent
    </button>
    <button class="fr-btn" :disabled="isButtonDisabled">Continuer</button>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import { onboardingStore } from '@/store/onboarding';

  const onBoardingStore = onboardingStore();

  const viewModel = ref<{
    repas: string;
  }>({
    repas: onBoardingStore.etapeAlimentation.repas,
  });

  const emit = defineEmits(['submitEtape', 'retourEtapePrecedente']);

  const isButtonDisabled = computed(() => {
    return Object.values(viewModel.value).some(value => !value);
  });

  const submitEtapeAlimentation = () => {
    onBoardingStore.setEtapeAlimentation({
      repas: viewModel.value.repas,
      done: true,
    });

    emit('submitEtape');
  };

  const retourEtapePrecedente = () => {
    emit('retourEtapePrecedente');
  };
</script>
