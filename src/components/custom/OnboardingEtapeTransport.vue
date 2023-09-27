<template>
  <form @submit.prevent="submitEtapetransport">
    <h3 class="fr-h4">Quels sont vos principaux moyens de transport du quotidien ?</h3>
    <InputCheckbox :options="options" v-model="viewModel.typeTransports" />
    <h3 class="fr-h4">Combien de vols en avion avez-vous fait dernièrement ?</h3>
    <InputNumberHorizontal
      label="Vols en avion sur les 12 derniers mois"
      name="nombre-vol-avion"
      class="fr-mb-2w"
      v-model="viewModel.nombreVols"
    />
    <button class="fr-btn" :disabled="!(viewModel.typeTransports.length > 0) || !(viewModel.nombreVols.length > 0)">
      Continuer
    </button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputCheckbox from '@/components/custom/InputCheckbox.vue';
  import InputNumberHorizontal from '@/components/custom/InputNumberHorizontal.vue';

  const viewModel = ref<{
    nombreVols: string;
    typeTransports: string[];
  }>({
    nombreVols: '0',
    typeTransports: [],
  });

  const options = [
    { id: 'voiture', label: '🚙 Voiture' },
    { id: 'scooter', label: '🛵 Scooter ou moto' },
    { id: 'marche', label: '🚶🏻 Marche à pied' },
    { id: 'velo', label: '🚴 Vélo' },
    { id: 'transport', label: '🚃 Métro, train, bus' },
  ];

  const emit = defineEmits(['submitEtape']);

  const submitEtapetransport = () => {
    console.log(viewModel.value); // value to setOnBoardingStore
    emit('submitEtape');
  };
</script>
