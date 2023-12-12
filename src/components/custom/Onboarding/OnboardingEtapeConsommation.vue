<template>
  <form @submit.prevent="submitEtapeConsommation">
    <BoutonRadio
      class="fr-mb-2w"
      legende="À quelle fréquence achetez-vous des objets du quotidien (vêtements, objets de décoration, électronique, etc.) ?"
      name="consommation"
      legende-size="l"
      orientation="vertical"
      :options="options"
      col=""
      v-model="viewModel.consommation"
      :default-value="viewModel.consommation"
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
  import router from '@/router';

  const onBoardingStore = onboardingStore();
  const options = [
    { label: 'Je n’achète presque jamais et rarement neuf', value: 'jamais' },
    { label: 'J’achète essentiellement des produits de seconde main', value: 'secondemain' },
    { label: 'J’achète raisonnablement des produits neufs', value: 'raisonnable' },
    { label: 'J’achète fréquemment des produits neufs', value: 'shopping' },
  ];

  const viewModel = ref<{
    consommation: string;
  }>({
    consommation: onBoardingStore.etapeConsommation.consommation,
  });

  const emit = defineEmits(['submitEtape', 'retourEtapePrecedente']);

  const isButtonDisabled = computed(() => {
    return Object.values(viewModel.value).some(value => !value);
  });

  const submitEtapeConsommation = () => {
    onBoardingStore.setEtapeConsommation({
      consommation: viewModel.value.consommation,
      done: true,
    });
    router.push({ name: 'bilan-onboarding' });
  };

  const retourEtapePrecedente = () => {
    emit('retourEtapePrecedente');
  };
</script>
