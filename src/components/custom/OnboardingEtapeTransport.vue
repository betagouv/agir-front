<template>
  <form @submit.prevent="submitEtapetransport">
    <h3 class="fr-h4">Quels sont vos principaux moyens de transport du quotidien ?</h3>
    <InputCheckbox :options="options" v-model="viewModel.transports" :default-values="viewModel.transports" />
    <h3 class="fr-h4">Combien de vols en avion avez-vous fait dernièrement ?</h3>
    <InputNumberHorizontal
      label="Vols en avion sur les 12 derniers mois"
      name="nombre-vol-avion"
      class="fr-mb-2w"
      v-model="viewModel.avion"
      :default-value="viewModel.avion"
    />
    <button class="fr-btn" :disabled="!(viewModel.transports.length > 0) || !(viewModel.avion.length > 0)">
      Continuer
    </button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputCheckbox from '@/components/custom/InputCheckbox.vue';
  import InputNumberHorizontal from '@/components/custom/InputNumberHorizontal.vue';
  import { onboardingStore } from '@/store/onboarding';

  const onBoardingStore = onboardingStore();

  const viewModel = ref<{
    avion: string;
    transports: string[];
  }>({
    avion: onBoardingStore.etapeTransport.avion.toString(),
    transports: onBoardingStore.etapeTransport.transports,
  });

  const options = [
    { id: 'voiture', label: '🚙 Voiture' },
    { id: 'moto', label: '🛵 Scooter ou moto' },
    { id: 'pied', label: '🚶🏻 Marche à pied' },
    { id: 'velo', label: '🚴 Vélo' },
    { id: 'commun', label: '🚃 Métro, train, bus' },
  ];

  const emit = defineEmits(['submitEtape']);

  const submitEtapetransport = () => {
    onBoardingStore.setEtapeTransport({
      avion: Number(viewModel.value.avion),
      transports: viewModel.value.transports,
      done: true,
    });

    emit('submitEtape');
  };
</script>
