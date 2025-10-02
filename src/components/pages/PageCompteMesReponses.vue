<template>
  <CompteSkeleton page-courante="Mon Compte - Mes réponses">
    <h1 class="fr-h2">Mes réponses</h1>
    <template v-if="questionsViewModel.length > 0">
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-md-6 fr-col-12" v-for="questionViewModel in questionsViewModel" :key="questionViewModel.id">
          <ReponseCarte :question="questionViewModel" />
        </div>
      </div>
    </template>
    <p v-else>Vous n'avez pas encore répondu à nos questions pour mieux vous connaître.</p>
  </CompteSkeleton>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import ReponseCarte from '@/components/custom/Compte/ReponseCarte.vue';
  import { ListeQuestionsDansLeComptePresenter } from '@/domaines/kyc/adapters/listeQuestionsDansLeCompte.presenter';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { QuestionDansLeCompteViewModel } from '@/domaines/kyc/ports/listeQuestions.presenter';
  import { RecupererListeQuestionsReponduesUsecase } from '@/domaines/kyc/recupererListeQuestionsRepondues.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const questionsViewModel = ref<QuestionDansLeCompteViewModel[]>([]);

  new RecupererListeQuestionsReponduesUsecase(new QuestionRepositoryAxios()).execute(
    utilisateurStore().utilisateur.id,
    new ListeQuestionsDansLeComptePresenter(questions => {
      questionsViewModel.value = questions;
    }),
  );
</script>
