<template>
  <div v-for="(questionViewModel, index) in questionsViewModel.questions" :key="index">
    <div v-show="index === etapeCourante">
      <KYCForm
        :question-view-model="questionViewModel"
        wording-bouton="Continuer"
        @update:soumission-kyc="passerEtapeSuivante"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import { QuestionsViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';

  const props = defineProps<{ questionsViewModel: QuestionsViewModel; onClickFinKYC: () => void }>();

  const premiereKycNonRepondu = () => {
    const indexQuestion = props.questionsViewModel.questions.findIndex(question => !question.aDejaEteRepondu);
    return indexQuestion !== -1 ? indexQuestion : 0;
  };

  const etapeCourante = ref<number>(premiereKycNonRepondu());
  const afficherFinKyc = ref<boolean>(false);

  const passerEtapeSuivante = () => {
    etapeCourante.value++;
    afficherFinKyc.value = etapeCourante.value === props.questionsViewModel.questions.length;
    if (afficherFinKyc.value) props.onClickFinKYC();
  };
</script>
