<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane
      page-courante="Question pour mieux vous connaître"
      :page-hierarchie="
        useRoute().params.universId
          ? [
              { label: 'Univers', url: `univers/${useRoute().params.universId}` },
              { label: 'Thématique', url: `univers/${useRoute().params.universId}/${useRoute().params.thematiqueId}` },
            ]
          : []
      "
    />
    <h1 class="fr-h2 fr-mb-1w">Question pour mieux vous connaître</h1>
    <CarteSkeleton v-if="isLoading" />
    <div v-else-if="questionsViewModel" class="background--white border fr-p-4w border-radius--md">
      <ThematiqueQuestionsKyc v-model:questions-view-model="questionsViewModel" />
    </div>
    <div v-else>Une erreur est survenue</div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import ThematiqueQuestionsKyc from '@/components/custom/Thematiques/ThematiqueQuestionsKyc.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
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
      route.params.thematiqueId as string,
      new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
    );
    isLoading.value = false;
  });
</script>
