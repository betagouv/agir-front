<template>
  <div class="fr-card fr-card--sm fr-card--horizontal fr-card--shadow fr-enlarge-link">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h2 class="fr-card__title">
          <router-link :to="{ name: RouteKycName.KYC_COMPTE, params: { id: question.id } }">
            {{ question.libelle }}
          </router-link>
        </h2>
        <p class="fr-card__desc">{{ question.reponse }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { QuestionDansLeCompteViewModel } from '@/domaines/kyc/ports/listeQuestions.presenter';
  import { RouteKycName } from '@/router/kyc/routes.js';

  defineProps<{
    question: QuestionDansLeCompteViewModel;
  }>();
</script>
