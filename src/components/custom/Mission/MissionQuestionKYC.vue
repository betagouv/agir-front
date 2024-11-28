<template>
  <!--  ToDo: loading-->
  <KYCForm
    v-if="questionViewModel"
    @update:soumission-kyc="onClickContinuer"
    :est-enchainement-mission="true"
    :question-view-model="questionViewModel"
    wording-bouton="Continuer"
  />
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionPresenterImpl } from '@/domaines/kyc/adapters/question.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererQuestionUsecase } from '@/domaines/kyc/recupererQuestion.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ missionId: string; onClickContinuer: () => void }>();

  const questionViewModel = ref<QuestionViewModel>();

  onMounted(() => {
    const idMission = props.missionId;

    const utilisateurId = utilisateurStore().utilisateur.id;

    new RecupererQuestionUsecase(new QuestionRepositoryAxios()).execute(
      idMission,
      utilisateurId,
      new QuestionPresenterImpl((viewModel: QuestionViewModel) => (questionViewModel.value = viewModel)),
    );
  });
</script>
