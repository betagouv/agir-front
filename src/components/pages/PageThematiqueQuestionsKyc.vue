<template>
  <div class="fr-container fr-mb-6w">
    <h1 class="fr-h2 fr-mb-1w">Question pour mieux vous connaître</h1>
    <div v-if="questionsViewModel">
      <div v-for="(questionViewModel, index) in questionsViewModel" :key="index">
        <p v-if="index === etapeCourante" class="text--bleu fr-grid-row align-items--center">
          <button
            class="fr-btn fr-btn--tertiary-no-outline fr-icon-arrow-left-line"
            title="Retour à l'étape précédente"
            @click="etapeCourante--"
          >
            Retour à l'étape précédente
          </button>
          <span class="fr-text--bold">Question {{ index + 1 }}</span>
          &nbsp; sur {{ questionsViewModel.length }}
        </p>
        <KYCForm
          v-if="index === etapeCourante"
          :question-view-model="questionViewModel"
          @update:soumission-kyc="passerEtapeSuivante"
        />
      </div>
      <KYCFin v-if="afficherFinKyc" :a-deja-repondu="false" phrasePointAGagner="toto" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import KYCFin from '@/components/custom/KYC/KYCFin.vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';

  import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';

  const afficherFinKyc = ref<boolean>(false);

  const questionsViewModel = ref<QuestionViewModel[]>([]);
  questionsViewModel.value = [
    {
      id: '1',
      libelle: 'Quel est votre âge ?',
      type: 'choix_unique',
      reponses_possibles: [
        {
          id: '1',
          label: 'moins de 18 ans',
        },
        {
          id: '2',
          label: 'entre 18 et 25 ans',
        },
        {
          id: '3',
          label: 'entre 26 et 35 ans',
        },
        {
          id: '4',
          label: 'entre 36 et 45 ans',
        },
      ],
      points: '10',
      reponses: ['2'],
      aDejaEteRepondu: true,
      description: 'lorem ipsum',
    },
    {
      id: '2',
      libelle: 'Quel est votre sexe ?',
      type: 'choix_multiple',
      reponses_possibles: [
        {
          id: '1',
          label: 'Homme',
        },
        {
          id: '2',
          label: 'Femme',
        },
        {
          id: '3',
          label: 'Autre',
        },
      ],
      points: '10',
      reponses: [],
      aDejaEteRepondu: false,
      description: 'lorem ipsum',
    },
    {
      id: '3',
      libelle: "Quel est votre niveau d'étude ?",
      type: 'libre',
      reponses_possibles: [],
      points: '10',
      reponses: [],
      aDejaEteRepondu: false,
      description: 'lorem ipsum',
    },
  ];

  const premiereKycNonRepondu = () => {
    return questionsViewModel!.value.findIndex(question => question.reponses.length === 0 && !question.aDejaEteRepondu);
  };

  const etapeCourante = ref<number>(premiereKycNonRepondu());

  const passerEtapeSuivante = async (value: string[]) => {
    questionsViewModel.value[etapeCourante.value].reponses = value;
    etapeCourante.value++;

    if (etapeCourante.value === questionsViewModel.value.length) {
      afficherFinKyc.value = true;
    }
  };
</script>
