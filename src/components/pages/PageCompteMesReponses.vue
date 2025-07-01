<template>
  <CompteSkeleton page-courante="Mon Compte - Mes réponses">
    <h1 class="fr-h2">Mes réponses</h1>
    <template v-if="questionsViewModel.length > 0">
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-md-6 fr-col-12" v-for="questionViewModel in questionsViewModel" :key="questionViewModel.id">
          <div class="fr-card fr-card--sm fr-card--horizontal fr-card--shadow">
            <div class="fr-card__body">
              <div class="fr-card__content">
                <h2 class="fr-card__title">{{ questionViewModel.libelle }}</h2>
                <p class="fr-card__desc">
                  <span class="text--bold">Votre réponse&nbsp;:</span> {{ questionViewModel.reponse }}
                </p>
                <div class="fr-card__start"></div>
              </div>
              <div class="fr-card__footer">
                <ul class="fr-links-group fr-links-group--inline">
                  <li>
                    <router-link
                      class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
                      :to="{ name: RouteKycName.KYC_COMPTE, params: { id: questionViewModel.id } }"
                    >
                      Modifier ma réponse
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <p v-else>Vous n'avez pas encore répondu à nos questions pour mieux vous connaître.</p>
  </CompteSkeleton>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import { ListeQuestionsDansLeComptePresenter } from '@/domaines/kyc/adapters/listeQuestionsDansLeCompte.presenter';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { QuestionDansLeCompteViewModel } from '@/domaines/kyc/ports/listeQuestions.presenter';
  import { RecupererListeQuestionsReponduesUsecase } from '@/domaines/kyc/recupererListeQuestionsRepondues.usecase';
  import { RouteKycName } from '@/router/kyc/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const questionsViewModel = ref<QuestionDansLeCompteViewModel[]>([]);

  new RecupererListeQuestionsReponduesUsecase(new QuestionRepositoryAxios()).execute(
    utilisateurStore().utilisateur.id,
    new ListeQuestionsDansLeComptePresenter(questions => {
      questionsViewModel.value = questions;
    }),
  );
</script>
