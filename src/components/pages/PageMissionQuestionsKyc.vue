<template>
  <div class="fr-container fr-mb-6w">
    <CarteSkeleton v-if="isLoading" />
    <div v-else-if="questionsViewModel" class="fr-p-4w">
      <MissionQuestionsKyc
        v-model:questions-view-model="questionsViewModel"
        :on-click-fin-k-y-c="onClickFinKYC"
        :on-click-revenir-etape-precedente="onClickRevenirEtapePrecedente"
        :etape-courante-defaut="props.etapeCouranteDefaut"
        :nombre-etapes-mission="props.nombreEtapesMission"
      />
    </div>
    <div v-else>Une erreur est survenue</div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import MissionQuestionsKyc from '@/components/custom/Mission/MissionQuestionsKyc.vue';
  import {
    ListesQuestionsThematiquePresenter,
    QuestionsViewModel,
  } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererQuestionsThematiqueUsecase } from '@/domaines/kyc/recupererQuestionsThematique.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const questionsViewModel = ref<QuestionsViewModel>();

  const props = defineProps<{
    missionId: string;
    onClickFinKYC: () => void;
    onClickRevenirEtapePrecedente: () => void;
    etapeCouranteDefaut?: number;
    nombreEtapesMission: number;
  }>();

  onMounted(async () => {
    const usecase = new RecupererQuestionsThematiqueUsecase(new QuestionRepositoryAxios());
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      props.missionId,
      new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
    );
    isLoading.value = false;
  });
</script>
