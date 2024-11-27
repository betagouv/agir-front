<template>
  <div v-for="(questionViewModel, index) in questionsViewModel.questions" :key="index">
    <div v-show="index === etapeCourante">
      <MissionNavigation
        titre="Une question pour mieux vous connaître"
        :on-click-revenir-etape-precedente="revenirEtapePrecedente"
        :etape-actuelle="index + 1"
        :etape-totale="nombreEtapesMission"
      />
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
  import MissionNavigation from '@/components/custom/Mission/MissionNavigation.vue';
  import { QuestionsViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { scrollToMain } from '@/shell/scrollToMain';

  const props = defineProps<{
    questionsViewModel: QuestionsViewModel;
    onClickFinKYC: () => void;
    onClickRevenirEtapePrecedente: () => void;
    etapeCouranteDefaut?: number;
    nombreEtapesMission: number;
  }>();

  const premiereKycNonRepondu = () => {
    const indexQuestion = props.questionsViewModel.questions.findIndex(question => !question.aDejaEteRepondu);
    return indexQuestion !== -1 ? indexQuestion : (props.etapeCouranteDefaut ?? 0);
  };
  const etapeCourante = ref<number>(premiereKycNonRepondu());
  const afficherFinKyc = ref<boolean>(false);

  const passerEtapeSuivante = () => {
    etapeCourante.value++;
    afficherFinKyc.value = etapeCourante.value === props.questionsViewModel.questions.length;
    if (afficherFinKyc.value) props.onClickFinKYC();
    scrollToMain();
  };

  const revenirEtapePrecedente = () => {
    etapeCourante.value--;
    if (etapeCourante.value === -1) props.onClickRevenirEtapePrecedente();
    scrollToMain();
  };
</script>
