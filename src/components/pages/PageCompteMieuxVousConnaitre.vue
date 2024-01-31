<template>
  <CompteSkeleton page-courante="Mon Compte - Mieux vous connaître">
    <div v-for="questionViewModel in questionsViewModel" :key="questionViewModel.id" class="fr-mb-4w">
      <div>
        <h2 class="fr-h4 fr-mb-2w">
          {{ questionViewModel.libelle }}
        </h2>
        <div class="fr-grid-row flex-column fr-grid-row--top">
          {{ questionViewModel.reponse }}
          <router-link
            class="fr-mt-4v fr-btn fr-btn--icon-left fr-icon-pencil-line"
            :to="{ name: RouteKycName.KYC, params: { id: questionViewModel.id } }"
          >
            Modifier ma réponse
          </router-link>
        </div>
      </div>
    </div>
  </CompteSkeleton>
</template>

<script setup lang="ts">
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import { QuestionViewModel } from '@/kyc/ports/listeQuestions.presenter';
  import { ref } from 'vue';
  import { RecupererListeQuestionsUsecase } from '@/kyc/recupererListeQuestions.usecase';
  import { QuestionRepositoryAxios } from '@/kyc/adapters/question.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ListeQuestionsPresenterImpl } from '@/kyc/adapters/listeQuestions.presenter.impl';
  import { RouteKycName } from '@/router/kyc/routes';

  const questionsViewModel = ref<QuestionViewModel[]>([]);

  new RecupererListeQuestionsUsecase(new QuestionRepositoryAxios()).execute(
    utilisateurStore().utilisateur.id,
    new ListeQuestionsPresenterImpl(questions => {
      questionsViewModel.value = questions;
    })
  );
</script>
