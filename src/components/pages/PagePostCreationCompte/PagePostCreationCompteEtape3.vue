<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border">
      <img alt="" src="/bg_creation_compte_etape_3.svg" />
      <p class="text--normal text--bleu fr-mb-1w fr-mt-1w"><span class="fr-text--bold">Étape 3</span> sur 3</p>
      <h1 class="fr-h4 fr-mb-1w">C'est presque terminé !</h1>
      <KYCForm
        v-if="questionViewModel"
        :question-view-model="questionViewModel"
        style-du-titre="fr-text--regular fr-text--lg"
        wording-bouton="Finir mon inscription"
        @update:soumission-kyc="validerLaReponse"
        @update:passer-la-question="validerLaReponse"
      >
        <router-link :to="{ name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_2 }" class="fr-link fr-ml-4w fr-mt-1v">
          Retour
        </router-link>
      </KYCForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import { QuestionPresenterImpl, QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererQuestionUsecase } from '@/domaines/kyc/recupererQuestion.usecase';
  import router from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { utilisateurStore } from '@/store/utilisateur';

  const questionViewModel = ref<QuestionViewModel>();

  onMounted(async () => {
    const recupereQuestionUsecase = new RecupererQuestionUsecase(new QuestionRepositoryAxios());
    await recupereQuestionUsecase.execute(
      'KYC_preference',
      utilisateurStore().utilisateur.id,
      new QuestionPresenterImpl(
        (viewModel: QuestionViewModel) => {
          questionViewModel.value = viewModel;
        },
        () => {},
      ),
    );
  });

  const validerLaReponse = async () => {
    await router.replace({ name: RouteCompteName.POST_CREATION_COMPTE_FIN });
  };
</script>
