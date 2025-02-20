<template>
  <div v-if="!afficherFinKyc && questionsViewModel">
    <div v-for="(questionViewModel, index) in questionsViewModel.questions" :key="index">
      <div v-show="index === etapeCourante">
        <p class="text--bleu fr-grid-row align-items--center fr-py-2w">
          <button
            v-if="index !== 0"
            :title="`Retour à l'étape ${index}`"
            class="fr-btn fr-btn--tertiary-no-outline fr-icon-arrow-left-line"
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
  <slot v-if="afficherFinKyc" />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import {
    ListesQuestionsThematiquePresenter,
    QuestionsViewModel,
  } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererEnchainementQuestionsUsecase } from '@/domaines/kyc/recupererEnchainementQuestions.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ idEnchainementKycs: string }>();
  const questionsViewModel = ref<QuestionsViewModel>();

  const emit = defineEmits<{
    (e: 'finKycAtteinte'): void;
    (e: 'questionSuivante'): void;
  }>();

  const etapeCourante = ref<number>(0);
  const afficherFinKyc = ref<boolean>(false);

  async function chargerEnchainementKycs() {
    const usecase = new RecupererEnchainementQuestionsUsecase(new QuestionRepositoryAxios());
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      props.idEnchainementKycs,
      new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
    );
  }

  onMounted(() => {
    chargerEnchainementKycs();
    const premiereQuestionNonRep =
      questionsViewModel.value?.questions.findIndex(question => !question.aDejaEteRepondu) || -1;
    etapeCourante.value = premiereQuestionNonRep !== -1 ? premiereQuestionNonRep : 0;
  });

  const passerEtapeSuivante = async () => {
    await chargerEnchainementKycs();
    etapeCourante.value++;
    if (etapeCourante.value === questionsViewModel.value?.questions.length) {
      afficherFinKyc.value = true;
      emit('finKycAtteinte');
    }
  };
</script>
