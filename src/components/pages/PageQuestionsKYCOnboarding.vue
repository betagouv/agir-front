<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane page-courante="Question pour mieux vous connaître" />
    <h1 class="fr-h2 fr-mb-1w">Question pour mieux vous connaître</h1>
    <CarteSkeleton v-if="isLoading" />
    <div v-else-if="questionsViewModel" class="background--white border fr-p-4w border-radius--md">
      <EnchainementQuestionsKyc v-model:questions-view-model="questionsViewModel" />
    </div>
    <div v-else>Une erreur est survenue</div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import EnchainementQuestionsKyc from '@/components/custom/KYC/EnchainementQuestionsKyc.vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    ListesQuestionsThematiquePresenter,
    QuestionsViewModel,
  } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererEnchainementQuestionsUsecase } from '@/domaines/kyc/recupererEnchainementQuestions.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const questionsViewModel = ref<QuestionsViewModel>();

  onMounted(() => {
    const route = useRoute();

    const usecase = new RecupererEnchainementQuestionsUsecase(new QuestionRepositoryAxios());
    usecase.execute(
      utilisateurStore().utilisateur.id,
      route.params.id as string,
      new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
    );
    isLoading.value = false;
  });
</script>
