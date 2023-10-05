<template>
  <form @submit.prevent="submitEtapeConsommation">
    <BoutonRadio
      class="fr-mb-2w"
      legende="Parmi ces choix, pour les objets du quotidien (électroménager, éléctronique, vêtements...), vous êtes plutôt..."
      name="consommation"
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
    { label: "J'achète raisonnablement selon mes besoins et me fais plaisir de temps en temps", value: 'raisonnable' },
    { label: "Je chine : l'essentiel de mes achats, c'est de la seconde main", value: 'secondemain' },
    {
      label: "J'adore le shopping : Il me faut absolument le dernier téléphone qui vient de sortir",
      value: 'shopping',
    },
    { label: "Je n'achète presque jamais et rarement neuf", value: 'jamais' },
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
