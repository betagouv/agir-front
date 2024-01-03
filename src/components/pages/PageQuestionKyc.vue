<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane
      :page-courante="`Question`"
      :page-hierarchie="[
        {
          label: 'Coach',
          url: 'coach',
        },
      ]"
    />
    <h1 class="fr-h2">Question</h1>
    <div class="background--white border fr-p-4w border-radius--md">
      <form @submit.prevent="validerLaReponse">
        <h2 class="fr-h4 fr-mb-2w">
          {{ questionViewModel?.libelle }}
        </h2>
        <div class="fr-input-group">
          <label class="fr-label" for="reponse"> Votre réponse </label>
          <textarea class="fr-input" v-model="reponse" id="reponse" name="reponse" />
        </div>
        <button class="fr-btn fr-btn--lg" title="Valider" :disabled="reponse === ''">Valider</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { RecupererQuestionUsecase } from '@/kyc/recupererQuestionUsecase';
  import { QuestionRepositoryAxios } from '@/kyc/adapters/question.repository.axios';
  import { QuestionPresenterImpl, QuestionViewModel } from '@/kyc/adapters/question.presenter.impl';
  import { utilisateurStore } from '@/store/utilisateur';
  import { EnvoyerReponseUsecase } from '@/kyc/envoyerReponseUsecase';

  const route = useRoute();
  const questionId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  const questionViewModel = ref<QuestionViewModel>();
  const reponse = ref<string>('');

  const utilisateurId = utilisateurStore().utilisateur.id;
  const recupereQuestionUsecase = new RecupererQuestionUsecase(new QuestionRepositoryAxios());
  recupereQuestionUsecase.execute(
    questionId,
    utilisateurId,
    new QuestionPresenterImpl((viewModel: QuestionViewModel) => {
      questionViewModel.value = viewModel;
    })
  );

  const validerLaReponse = async () => {
    const envoyerReponseUsecase = new EnvoyerReponseUsecase(new QuestionRepositoryAxios());
    envoyerReponseUsecase.execute(utilisateurId, questionId, reponse.value);
  };
</script>
