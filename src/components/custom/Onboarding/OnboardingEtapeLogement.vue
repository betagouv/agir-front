<template>
  <form @submit.prevent="submitEtapeLogement">
    <h3 class="fr-h4">Où habitez-vous ?</h3>
    <div class="fr-col-8 fr-mb-4w">
      <InputCodePostal
        v-model="viewModel.codePostal"
        :default-value="viewModel.codePostal"
        :default-select-value="viewModel.commune"
        @update:selectedCommune="viewModel.commune = $event"
      />
    </div>
    <h3 class="fr-h4">Combien êtes-vous dans votre logement (vous inclus) ?</h3>
    <div class="fr-grid-row fr-mb-4w">
      <InputNumberHorizontal
        label="Adulte(s)"
        name="nombre-adulte"
        class="fr-mr-8w fr-mb-2w"
        v-model="viewModel.adultes"
        :default-value="viewModel.adultes"
        :min-value="1"
      />
      <InputNumberHorizontal
        label="Enfant(s) - moins de 18 ans"
        name="nombre-enfant"
        class="fr-mb-2w"
        v-model="viewModel.enfants"
        :default-value="viewModel.enfants"
        :min-value="0"
      />
    </div>
    <BoutonRadio
      class="fr-mb-2w"
      legende="Votre résidence principale est ..."
      legende-size="l"
      orientation="vertical"
      name="residence"
      :options="[
        { label: 'Une maison', value: 'maison' },
        { label: 'Un appartement', value: 'appartement' },
      ]"
      col="fr-col-sm-4"
      v-model="viewModel.residence"
      :default-value="viewModel.residence"
    />
    <div class="fr-checkbox-group fr-mb-4w">
      <input name="proprietaire" id="proprietaire" type="checkbox" v-model="viewModel.proprietaire" />
      <label class="fr-label" for="proprietaire">
        <span>Vous êtes <strong>propriétaire</strong> de votre logement </span>
      </label>
    </div>
    <BoutonRadio
      class="fr-mb-4w"
      legende="Quelle en est la superficie ?"
      legende-size="l"
      name="superficieLogement"
      orientation="vertical"
      :options="[
        { label: 'Moins de 35 m²', value: 'superficie_35' },
        { label: 'Entre 35 et 70 m²', value: 'superficie_70' },
        { label: 'Entre 70 et 100 m²', value: 'superficie_100' },
        { label: 'Entre 100 et 150 m²', value: 'superficie_150' },
        { label: 'Plus de 150 m²', value: 'superficie_150_et_plus' },
      ]"
      col="fr-col-sm-4"
      v-model="viewModel.superficie"
      :default-value="viewModel.superficie"
    />
    <BoutonRadio
      class="fr-mb-4w"
      legende-size="l"
      orientation="vertical"
      legende="Quelle est votre mode de chauffage principal ?"
      name="modeDeChauffage"
      :options="[
        { label: 'Électricité', value: 'electricite' },
        { label: 'Bois / Pellets', value: 'bois' },
        { label: 'Fioul', value: 'fioul' },
        { label: 'Gaz', value: 'gaz' },
        { label: 'Autre / Je ne sais pas', value: 'autre' },
      ]"
      col="fr-col-sm-4"
      v-model="viewModel.chauffage"
      :default-value="viewModel.chauffage"
    />
    <ul class="fr-btns-group fr-btns-group--lg fr-btns-group--icon-left fr-btns-group--inline">
      <li>
        <button
          class="fr-btn fr-btn--icon-left fr-icon-arrow-left-line fr-btn--tertiary-no-outline"
          @click="retourEtapePrecedente"
        >
          Précédent
        </button>
      </li>
      <li>
        <button class="fr-btn" :disabled="isButtonDisabled">Continuer</button>
      </li>
    </ul>
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
    commune: string;
    adultes: number;
    enfants: number;
    residence: string;
    superficie: string;
    chauffage: string;
    proprietaire: boolean;
  }>({
    codePostal: onBoardingStore.etapeLogement.code_postal,
    commune: onBoardingStore.etapeLogement.commune,
    adultes: onBoardingStore.etapeLogement.adultes | 1,
    enfants: onBoardingStore.etapeLogement.enfants | 0,
    residence: onBoardingStore.etapeLogement.residence,
    superficie: onBoardingStore.etapeLogement.superficie,
    chauffage: onBoardingStore.etapeLogement.chauffage,
    proprietaire: onBoardingStore.etapeLogement.proprietaire,
  });

  const emit = defineEmits(['submitEtape', 'retourEtapePrecedente']);

  const isButtonDisabled = computed(() => {
    return Object.keys(viewModel.value)
      .filter(key => key !== 'enfants')
      .some(key => {
        const value = viewModel.value[key];
        if (typeof value === 'boolean') {
          return false;
        }
        return !value;
      });
  });

  const submitEtapeLogement = () => {
    onBoardingStore.setEtapeLogement({
      code_postal: viewModel.value.codePostal,
      commune: viewModel.value.commune,
      adultes: Number(viewModel.value.adultes),
      enfants: Number(viewModel.value.enfants),
      residence: viewModel.value.residence,
      proprietaire: viewModel.value.proprietaire,
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
