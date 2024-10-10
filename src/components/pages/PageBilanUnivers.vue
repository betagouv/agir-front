<template>
  <div class="fr-container">
    <FilDAriane
      page-courante="Estimation du bilan"
      :page-hierarchie="[{ label: 'Bilan carbone', url: `${RouteBilanCarboneName.BILAN_CARBONE}` }]"
    />
    <h1>
      Estimation du bilan <span class="text--bleu">{{ univers }}</span>
    </h1>
    <div class="fr-mb-4w" v-if="questionsViewModel">
      <div v-for="(questionViewModel, index) in questionsViewModel.questions" :key="index">
        <div v-show="index === etapeCourante">
          <p class="text--bleu fr-grid-row align-items--center fr-py-2w">
            <button
              v-if="index !== 0"
              class="fr-btn fr-btn--tertiary-no-outline fr-icon-arrow-left-line"
              :title="`Retour à l'étape ${index}`"
              @click="etapeCourante--"
            >
              Retour à l'étape précédente
            </button>
            <span class="fr-text--bold">Question {{ index + 1 }}</span>
            &nbsp; sur {{ questionsViewModel.questions.length }}
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
  import router from '@/router';
  import { RouteBilanCarboneName, RouteBilanCarbonePath } from '@/router/bilanCarbone/routes';
  import { utilisateurStore } from '@/store/utilisateur';
  const questionsViewModel = ref<QuestionsViewModel>();

  const usecase = new RecupererEnchainementQuestionsUsecase(new QuestionRepositoryAxios());
  const route = useRoute();

  const etapeCourante = ref<number>(-1);
  const univers = route.params.univers as string;
  async function chargerLeQuestionnaire() {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      route.params.id as string,
      new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
    );
  }

  onMounted(async () => {
    await chargerLeQuestionnaire();
    const indexQuestion = questionsViewModel.value?.questions.findIndex(question => !question.aDejaEteRepondu) || -1;
    etapeCourante.value = indexQuestion !== -1 ? indexQuestion : 0;
    if (indexQuestion === etapeCourante.value) {
      etapeCourante.value = 0;
    }
  });

  const passerEtapeSuivante = async () => {
    await chargerLeQuestionnaire();
    etapeCourante.value++;
    if (etapeCourante.value === questionsViewModel.value?.questions.length) {
      await router.push({ path: RouteBilanCarbonePath.BILAN_CARBONE });
    }
  };
</script>
<style scoped></style>
