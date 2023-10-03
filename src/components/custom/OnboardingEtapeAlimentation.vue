<template>
  <form @submit.prevent="submitEtapeAlimentation">
    <BoutonRadio
      class="fr-mb-2w"
      legende="En règle générale, aux repas, vous êtes plutôt"
      name="repas"
      :options="[
        { label: 'Un peu de tout : Viande 1 ou 2 fois par semaine', value: 'tout' },
        { label: 'Végétarien : Sans produits laitiers, c’est dur', value: 'vege' },
        { label: 'J’adore la viande : Un repas sans viande, ce n’est pas un repas', value: 'viande' },
        { label: 'Végan : Rien d’animal dans mon assiette', value: 'vegan' },
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
