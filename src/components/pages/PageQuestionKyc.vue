<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane page-courante="Question pour mieux vous connaître" />
    <h1 class="fr-h2 fr-mb-1w">Question pour mieux vous connaître</h1>
    <p class="fr-text--xl" v-html="questionViewModel?.description" />
    <div v-if="isLoading">Chargement en cours ...</div>
    <div v-else-if="!isLoading && questionViewModel" class="background--white border fr-p-4w border-radius--md">
      <KYCForm
        v-if="!reponseAEteDonnee"
        :question-view-model="questionViewModel"
        wording-bouton="Valider"
        @update:soumission-kyc="validerLaReponse"
      />
      <KYCFin
        v-else
        :phrase-point-a-gagner="questionViewModel.points"
        :a-deja-repondu="questionViewModel.aDejaEteRepondu"
        :bouton="{
          label: `Retour à l'accueil`,
          url: `/${RouteCoachName.COACH}`,
        }"
      />
    </div>
    <div v-else>Problème de chargement de donées</div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import KYCFin from '@/components/custom/KYC/KYCFin.vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionPresenterImpl } from '@/domaines/kyc/adapters/question.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererQuestionUsecase } from '@/domaines/kyc/recupererQuestionUsecase';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { utilisateurStore } from '@/store/utilisateur';

  const route = useRoute();
  const questionId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  const isLoading = ref<boolean>(true);
  const questionViewModel = ref<QuestionViewModel>();
  const reponse = ref<string | string[]>('');
  const reponseAEteDonnee = ref<boolean>(false);

  const utilisateurId = utilisateurStore().utilisateur.id;

  onMounted(async () => {
    const recupereQuestionUsecase = new RecupererQuestionUsecase(new QuestionRepositoryAxios());
    await recupereQuestionUsecase.execute(
      questionId,
      utilisateurId,
      new QuestionPresenterImpl((viewModel: QuestionViewModel) => {
        questionViewModel.value = viewModel;
        reponse.value = viewModel.reponses;
      }),
    );
    isLoading.value = false;
  });

  const validerLaReponse = async () => {
    reponseAEteDonnee.value = true;
  };
</script>
