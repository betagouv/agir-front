<template>
  <div class="fr-container">
    <FilDAriane
      page-courante="Estimation du bilan"
      :page-hierarchie="[{ label: 'Bilan carbone', url: `${RouteBilanCarbonePath.BILAN_CARBONE}` }]"
    />
    <h1>
      Estimation du bilan
      <span class="text--bleu">{{
        MenuThematiques.getThematiqueData(thematiqueId as ClefThematiqueAPI).labelDansLeMenu
      }}</span>
    </h1>
    <p v-if="isLoading" class="fr-mb-4w">Chargement en cours ...</p>
    <div class="fr-mb-4w" v-if="!isLoading && questionsViewModel">
      <div v-for="(questionViewModel, index) in questionsViewModel.questions" :key="index">
        <div v-show="index === etapeCourante">
          <p class="text--bleu fr-grid-row align-items--center fr-py-2w">
            <button
              v-if="index !== 0"
              class="fr-btn fr-p-0 fr-m-0 fr-btn--tertiary-no-outline fr-icon-arrow-left-line"
              :title="`Retour à l'étape ${index}`"
              @click="etapeCourante--"
            ></button>
            <span class="fr-text--bold">Question {{ index + 1 }}</span>
            &nbsp;sur {{ questionsViewModel.questions.length }}
          </p>
          <KYCForm
            :question-view-model="questionViewModel"
            wording-bouton="Continuer"
            @update:soumission-kyc="passerEtapeSuivante"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    ListesQuestionsThematiquePresenter,
    QuestionsViewModel,
  } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererEnchainementQuestionsUsecase } from '@/domaines/kyc/recupererEnchainementQuestionsUsecase';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import router from '@/router';
  import { RouteBilanCarbonePath } from '@/router/bilanCarbone/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const route = useRoute();
  const thematiqueId = route.params.thematiqueId as string;
  const recupererEnchainementQuestionsUsecase = new RecupererEnchainementQuestionsUsecase(
    new QuestionRepositoryAxios(),
  );

  const questionsViewModel = ref<QuestionsViewModel>();
  const isLoading = ref<boolean>(true);
  const etapeCourante = ref<number>(0);

  async function chargerLeQuestionnaire() {
    await recupererEnchainementQuestionsUsecase.execute(
      utilisateurStore().utilisateur.id,
      route.params.id as string,
      new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
    );
  }

  onMounted(async () => {
    await chargerLeQuestionnaire();
    const premiereQuestionNonRep =
      questionsViewModel.value?.questions.findIndex(question => !question.aDejaEteRepondu) || -1;
    etapeCourante.value = premiereQuestionNonRep !== -1 ? premiereQuestionNonRep : 0;
    isLoading.value = false;
  });

  const passerEtapeSuivante = async () => {
    await chargerLeQuestionnaire();
    etapeCourante.value++;
    if (etapeCourante.value === questionsViewModel.value?.questions.length) {
      await router.push({ path: RouteBilanCarbonePath.BILAN_CARBONE });
    }
  };
</script>
<style scoped>
  .fr-btn {
    min-height: auto;
  }
</style>
