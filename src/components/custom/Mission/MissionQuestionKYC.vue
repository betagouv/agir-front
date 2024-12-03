<template>
  <MissionEtapeSkeleton :view-model-existe="questionViewModel !== undefined" :is-loading="isLoading">
    <KYCForm
      @update:soumission-kyc="onClickContinuer"
      :question-view-model="questionViewModel!"
      wording-bouton="Continuer"
    />
  </MissionEtapeSkeleton>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import MissionEtapeSkeleton from '@/components/custom/Mission/MissionEtapeSkeleton.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionPresenterImpl } from '@/domaines/kyc/adapters/question.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererQuestionUsecase } from '@/domaines/kyc/recupererQuestion.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ kycId: string; onClickContinuer: () => void }>();

  const questionViewModel = ref<QuestionViewModel>();
  const isLoading = ref<boolean>(true);

  onMounted(() => {
    const utilisateurId = utilisateurStore().utilisateur.id;

    new RecupererQuestionUsecase(new QuestionRepositoryAxios())
      .execute(
        props.kycId,
        utilisateurId,
        new QuestionPresenterImpl((viewModel: QuestionViewModel) => (questionViewModel.value = viewModel)),
      )
      .finally(() => {
        isLoading.value = false;
      });
  });
</script>
