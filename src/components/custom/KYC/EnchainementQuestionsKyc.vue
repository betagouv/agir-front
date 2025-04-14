<template>
  <div v-if="!afficherFinKyc && questionsViewModel">
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
          @update:passer-la-question="passerLaQuestion"
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
    etapeCourante.value = trouverIndexNonReponduSinon0();
    await chargerEnchainementKycs();
  });

  function trouverIndexNonReponduSinon0() {
    const index = trouverIndexNonRepondu();
    return index !== undefined && index !== -1 ? index : 0;
  }

  function trouverIndexNonRepondu(): number {
    return questionsViewModel.value?.questions.findIndex(q => !q.aDejaEteRepondu) ?? -1;
  }

  async function chargerEnchainementKycs() {
    const usecase = new RecupererEnchainementQuestionsUsecase(new QuestionRepositoryAxios());
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      props.idEnchainementKycs,
      new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
    );
  }

  const passerLaQuestion = () => {
    if (etapeCourante.value + 1 === questionsViewModel.value?.questions.length) {
      afficherFinKyc.value = true;
      emit('finKycAtteinte');
    } else {
      etapeCourante.value++;
    }
  };

  const passerEtapeSuivante = async () => {
    await chargerEnchainementKycs();
    const indexNonRepondu = trouverIndexNonRepondu();
    const nouvelleEtapeCourante = indexNonRepondu !== -1 ? indexNonRepondu : etapeCourante.value + 1;

    if (nouvelleEtapeCourante === questionsViewModel.value?.questions.length) {
      afficherFinKyc.value = true;
      emit('finKycAtteinte');
    }

    etapeCourante.value = nouvelleEtapeCourante;
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
