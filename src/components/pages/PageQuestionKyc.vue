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
        :a-deja-repondu="questionViewModel.aDejaEteRepondu"
        :bouton="buttonRetour"
        :phrase-point-a-gagner="questionViewModel.points"
      />
    </div>
    <div v-else>Problème de chargement de donées</div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import KYCFin from '@/components/custom/KYC/KYCFin.vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { QuestionPresenterImpl, QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererQuestionUsecase } from '@/domaines/kyc/recupererQuestion.usecase';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { RouteComptePath } from '@/router/compte/routes';
  import { RouteKycName } from '@/router/kyc/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const route = useRoute();
  const questionId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  const isLoading = ref<boolean>(true);
  const questionViewModel = ref<QuestionViewModel>();
  const reponseAEteDonnee = ref<boolean>(false);

  const utilisateurId = utilisateurStore().utilisateur.id;

  const buttonRetour = {
    label: `Retour à l'accueil`,
    url: `/${RouteCoachName.ACCUEIL_CONNECTEE}`,
  };
  onMounted(async () => {
    if (route.name === RouteKycName.KYC_COMPTE) {
      buttonRetour.label = 'Retour à mon compte';
      buttonRetour.url = `${RouteComptePath.MES_REPONSES}`;
    }
    const recupereQuestionUsecase = new RecupererQuestionUsecase(new QuestionRepositoryAxios());
    await recupereQuestionUsecase.execute(
      questionId,
      utilisateurId,
      new QuestionPresenterImpl(
        (viewModel: QuestionViewModel) => {
          questionViewModel.value = viewModel;
          questionViewModel.value.sousLibelle = 'Ceci est une description';
        },
        () => {},
      ),
    );
    isLoading.value = false;
  });

  const validerLaReponse = async () => {
    reponseAEteDonnee.value = true;
  };
</script>
