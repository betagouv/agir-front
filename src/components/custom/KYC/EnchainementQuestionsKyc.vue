<template>
  <div v-for="(questionViewModel, index) in questionsViewModel.questions" :key="index">
    <div v-show="index === etapeCourante">
      <p class="text--bleu fr-grid-row align-items--center fr-py-2w">
        <button
          v-if="index !== 0"
          :title="`Retour à l'étape ${index}`"
          class="fr-btn fr-btn--tertiary-no-outline fr-icon-arrow-left-line"
          @click="etapeCourante--"
        >
          Retour à l'étape précédente
        </button>
        <span class="fr-text--bold">Question {{ index + 1 }}</span>
        &nbsp; sur {{ questionsViewModel.questions.length }}
      </p>
      <KYCForm
        :question-view-model="questionViewModel"
        wording-bouton="Continuer"
        @update:soumission-kyc="passerEtapeSuivante"
      />
    </div>
  </div>
  <slot v-if="afficherFinKyc" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import { QuestionsViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';

  const props = defineProps<{ questionsViewModel: QuestionsViewModel }>();

  const emit = defineEmits<{
    (e: 'finKycAtteinte'): void;
  }>();
  const premiereKycNonRepondu = () => {
    const indexQuestion = props.questionsViewModel.questions.findIndex(question => !question.aDejaEteRepondu);
    return indexQuestion !== -1 ? indexQuestion : 0;
  };

  const etapeCourante = ref<number>(premiereKycNonRepondu());
  const afficherFinKyc = ref<boolean>(false);

  const passerEtapeSuivante = () => {
    etapeCourante.value++;
    afficherFinKyc.value = etapeCourante.value === props.questionsViewModel.questions.length;
    if (afficherFinKyc.value) {
      emit('finKycAtteinte');
    }
  };
</script>
