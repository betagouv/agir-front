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

  <slot name="fin" v-if="afficherFinKyc" />
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, ref, watch } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import {
    ListesQuestionsThematiquePresenter,
    QuestionsViewModel,
  } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererEnchainementQuestionsUsecase } from '@/domaines/kyc/recupererEnchainementQuestions.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ idEnchainementKycs: string; estActive: boolean }>();
  const questionsViewModel = ref<QuestionsViewModel>();

  const emit = defineEmits<{
    (e: 'finKycAtteinte'): void;
  }>();

  const etapeCourante = ref<number>(0);
  const afficherFinKyc = ref<boolean>(false);

  onMounted(() => {
    chargerEnchainementKycs();
    const premiereQuestionNonRep =
      questionsViewModel.value?.questions.findIndex(question => !question.aDejaEteRepondu) || -1;
    etapeCourante.value = premiereQuestionNonRep !== -1 ? premiereQuestionNonRep : 0;
  });

  async function chargerEnchainementKycs() {
    const usecase = new RecupererEnchainementQuestionsUsecase(new QuestionRepositoryAxios());
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      props.idEnchainementKycs,
      new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
    );
  }

  const passerEtapeSuivante = async () => {
    await chargerEnchainementKycs();
    etapeCourante.value++;
    if (etapeCourante.value === questionsViewModel.value?.questions.length) {
      afficherFinKyc.value = true;
      emit('finKycAtteinte');
    }
  };

  const toggleNavigationClavier = estActive => {
    const tabindex = estActive ? '0' : '-1';
    document
      .querySelectorAll('.effet-flou input, .effet-flou button, .effet-flou a')
      .forEach(element => element.setAttribute('tabindex', tabindex));
  };

  watch(
    () => questionsViewModel.value,
    () => {
      if (!props.estActive) {
        nextTick(() => toggleNavigationClavier(false));
      }
    },
  );

  watch(
    () => props.estActive,
    isActive => {
      if (isActive) toggleNavigationClavier(true);
    },
  );
</script>
