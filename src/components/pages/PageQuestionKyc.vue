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
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-lg-8">
        <span class="fr-h2">Question</span>
      </div>
      <div class="fr-col-12 fr-mt-4w background--white border fr-p-2w border-radius--md">
        <form @submit.prevent="validerLaReponse">
          <p class="fr-h4 fr-mb-2w">
            {{ questionViewModel?.libelle }}
          </p>
          <div class="fr-input-group">
            <label class="fr-label" for="reponse"> Votre réponse </label>
            <textarea class="fr-input" v-model="reponse" id="reponse" name="reponse"></textarea>
          </div>
          <button class="fr-btn fr-btn--lg" title="Valider" :disabled="reponse === ''">Valider</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { RecupererQuestionUsecase } from '@/kyc/recupererQuestionUsecase';
  import { QuestionRepositoryAxios } from '@/kyc/adapters/question.repository.axios';
  import { QuestionPresenterImpl, QuestionViewModel } from '@/kyc/adapters/question.presenter.impl';
  import { ref } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  const questionViewModel = ref<QuestionViewModel>();
  const reponse = ref<string>('');
  const recupereQuestionUsecase = new RecupererQuestionUsecase(new QuestionRepositoryAxios());
  recupereQuestionUsecase.execute(
    '1',
    utilisateurStore().utilisateur.id,
    new QuestionPresenterImpl((viewModel: QuestionViewModel) => {
      questionViewModel.value = viewModel;
    })
  );
  const validerLaReponse = () => {};
</script>
