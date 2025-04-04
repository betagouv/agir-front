<template>
  <div v-if="!afficherFinKyc && questionsViewModel">
    {{ etapeCourante + 1 }}
    {{ questionsViewModel.questions.map(q => q.id) }}
    <div v-for="(questionViewModel, index) in questionsViewModel.questions" :key="index">
      <div v-if="index === etapeCourante">
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

  <slot v-if="afficherFinKyc" name="fin" />
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

  onMounted(async () => {
    await chargerEnchainementKycs();
    etapeCourante.value = premierChargement();
  });

  function premierChargement() {
    const index = questionsViewModel.value?.questions.findIndex(q => !q.aDejaEteRepondu);
    return index !== undefined && index !== -1 ? index : 0;
  }

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

    const indexNonRepondu = questionsViewModel.value?.questions.findIndex(q => !q.aDejaEteRepondu);
    console.log(indexNonRepondu);
    if (etapeCourante.value === questionsViewModel.value?.questions.length) {
      afficherFinKyc.value = true;
      emit('finKycAtteinte');
      return;
    } else if (indexNonRepondu === -1 && etapeCourante.value !== questionsViewModel.value?.questions.length) {
      etapeCourante.value++;
      console.log('coouco');
    } else {
      etapeCourante.value = indexNonRepondu || 0;
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
