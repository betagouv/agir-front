<template>
  <div class="fr-container fr-py-6w">
    <h1 class="fr-h2 fr-mb-1w">Question pour mieux vous connaître</h1>
    <CarteSkeleton v-if="isLoading" />
    <ThematiqueQuestionsKyc v-else-if="questionsViewModel" v-model:questions-view-model="questionsViewModel" />
    <div v-else>Une erreur est survenue</div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import ThematiqueQuestionsKyc from '@/components/custom/Thematiques/ThematiqueQuestionsKyc.vue';
  import {
    ListesQuestionsThematiquePresenter,
    QuestionsViewModel,
  } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererQuestionsThematiqueUsecase } from '@/domaines/kyc/recupererQuestionsThematique.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const questionsViewModel = ref<QuestionsViewModel>();

  onMounted(async () => {
    const route = useRoute();
    const usecase = new RecupererQuestionsThematiqueUsecase(new QuestionRepositoryAxios());
    usecase.execute(
      utilisateurStore().utilisateur.id,
      route.params.id as string,
      new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
    );
    isLoading.value = false;
  });
</script>
