<template>
  <form @submit.prevent="submitEtapeLogement">
    <h3 class="fr-h4">Où habitez-vous ?</h3>
    <div class="fr-col-8 fr-mb-4w">
      <InputCodePostal v-model="viewModel.codePostal" :default-value="viewModel.codePostal" />
    </div>
    <h3 class="fr-h4">Combien êtes-vous dans votre logement (vous inclus) ?</h3>
    <div class="fr-grid-row fr-mb-4w">
      <InputNumberHorizontal
        label="Adulte(s)"
        name="nombre-adulte"
        class="fr-mr-8w fr-mb-2w"
        v-model="viewModel.adultes"
        :default-value="viewModel.adultes"
      />
      <InputNumberHorizontal
        label="Enfant(s)"
        name="nombre-enfant"
        class="fr-mb-2w"
        v-model="viewModel.enfants"
        :default-value="viewModel.enfants"
      />
    </div>
    <BoutonRadio
      class="fr-mb-4w"
      legende="Votre résidence principale est ..."
      name="residence"
      :options="[
        { label: 'Une maison', value: 'maison' },
        { label: 'Un appartement', value: 'appartement' },
      ]"
      col="fr-col-sm-4"
      v-model="viewModel.residence"
      :default-value="viewModel.residence"
    />
    <BoutonRadio
      class="fr-mb-4w"
      legende="Quelle en est la superficie ?"
      name="superficieLogement"
      :options="[
        { label: 'Moins de 50 m²', value: 'petite' },
        { label: 'Entre 50 et 100 m²', value: 'moyen' },
        { label: 'Plus de 100 m²', value: 'grand' },
      ]"
      col="fr-col-sm-4"
      v-model="viewModel.superficie"
      :default-value="viewModel.superficie"
    />
    <BoutonRadio
      class="fr-mb-4w"
      legende="Quelle est votre mode de chauffage principal ?"
      name="modeDeChauffage"
      :options="[
        { label: 'Électricité', value: 'electricite' },
        { label: 'Bois / Pellet', value: 'bois' },
        { label: 'Fioul', value: 'fioul' },
        { label: 'Gaz', value: 'gaz' },
        { label: 'Autre', value: 'autre' },
        { label: 'Je ne sais pas', value: '?' },
      ]"
      col="fr-col-sm-4"
      v-model="viewModel.chauffage"
      :default-value="viewModel.chauffage"
    />
    <button class="fr-link fr-icon-arrow-left-line fr-link--icon-left fr-mr-4w" @click="retourEtapePrecedente">
      Précédent
    </button>
    <button class="fr-btn" :disabled="isButtonDisabled">Continuer</button>
  </form>
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import InputNumberHorizontal from '@/components/custom/InputNumberHorizontal.vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import { onboardingStore } from '@/store/onboarding';

  const onBoardingStore = onboardingStore();

  const viewModel = ref<{
    codePostal: string;
    adultes: string;
    enfants: string;
    residence: string;
    superficie: string;
    chauffage: string;
  }>({
    codePostal: onBoardingStore.etapeLogement.code_postal,
    adultes: onBoardingStore.etapeLogement.adultes.toString(),
    enfants: onBoardingStore.etapeLogement.enfants.toString(),
    residence: onBoardingStore.etapeLogement.residence,
    superficie: onBoardingStore.etapeLogement.superficie,
    chauffage: onBoardingStore.etapeLogement.chauffage,
  });

  const emit = defineEmits(['submitEtape', 'retourEtapePrecedente']);

  const isButtonDisabled = computed(() => {
    return Object.values(viewModel.value).some(value => !value);
  });

  const submitEtapeLogement = () => {
    onBoardingStore.setEtapeLogement({
      code_postal: viewModel.value.codePostal,
      adultes: Number(viewModel.value.adultes),
      enfants: Number(viewModel.value.enfants),
      residence: viewModel.value.residence,
      propriétaire: true,
      superficie: viewModel.value.superficie,
      chauffage: viewModel.value.chauffage,
      done: true,
    });

    emit('submitEtape');
  };

  const retourEtapePrecedente = () => {
    emit('retourEtapePrecedente');
  };
</script>
