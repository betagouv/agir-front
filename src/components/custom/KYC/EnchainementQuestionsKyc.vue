<template>
  <div v-if="!afficherFinKyc && questionViewModel">
    <p class="text--bleu fr-grid-row align-items--center fr-py-2w">
      <button
        v-if="questionViewModel.etapeCourante > 1"
        :title="`Retour à l'étape précédente`"
        class="fr-btn fr-btn--tertiary-no-outline fr-icon-arrow-left-line"
        @click="recupererPrecendeteKYC"
      >
        Retour à l'étape précédente
      </button>
      <span class="fr-text--bold">Question {{ questionViewModel.etapeCourante }}</span>
      &nbsp;sur {{ questionViewModel.nombreTotalDeQuestions }}
    </p>

    <KYCForm
      :key="questionViewModel.id"
      :question-view-model="questionViewModel"
      @update:soumission-kyc="passerEtapeSuivante"
      @update:passer-la-question="passerEtapeSuivante"
      :wording-bouton="
        questionViewModel.etapeCourante === questionViewModel.nombreTotalDeQuestions
          ? wordingDernierBouton
          : 'Question suivante'
      "
    />
  </div>

  <slot v-if="afficherFinKyc" name="fin" />
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, ref, watch } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import { QuestionPresenterImpl, QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererPrecedenteKYCUsecase } from '@/domaines/kyc/recupererPrecedenteKYC.usecase';
  import { RecupererPremiereKYCUsecase } from '@/domaines/kyc/recupererPremiereKYC.usecase';
  import { RecupererProchaineKYCUsecase } from '@/domaines/kyc/recupererProchaineKYC.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = withDefaults(
    defineProps<{ idEnchainementKycs: string; estActive: boolean; wordingDernierBouton?: string }>(),
    { wordingDernierBouton: 'Passer à la suite' },
  );
  const questionViewModel = ref<QuestionViewModel>();

  const emit = defineEmits<{
    (e: 'finKycAtteinte'): void;
  }>();

  const afficherFinKyc = ref<boolean>(false);
  const questionPresenterImpl = new QuestionPresenterImpl(
    vm => (questionViewModel.value = vm),
    finAtteinte => {
      if (finAtteinte) {
        afficherFinKyc.value = true;
        emit('finKycAtteinte');
      }
    },
  );
  onMounted(async () => {
    await chargerEnchainementKycs();
  });

  async function passerEtapeSuivante() {
    const recupererPremiereQuestionUsecase = new RecupererProchaineKYCUsecase(new QuestionRepositoryAxios());

    await recupererPremiereQuestionUsecase.execute(
      utilisateurStore().utilisateur.id,
      props.idEnchainementKycs,
      questionViewModel.value!.id,
      questionPresenterImpl,
    );
  }

  async function chargerEnchainementKycs() {
    const recupererPremiereQuestionUsecase = new RecupererPremiereKYCUsecase(new QuestionRepositoryAxios());
    await recupererPremiereQuestionUsecase.execute(
      utilisateurStore().utilisateur.id,
      props.idEnchainementKycs,
      questionPresenterImpl,
    );
  }

  async function recupererPrecendeteKYC() {
    const recupererPremiereQuestionUsecase = new RecupererPrecedenteKYCUsecase(new QuestionRepositoryAxios());
    await recupererPremiereQuestionUsecase.execute(
      utilisateurStore().utilisateur.id,
      props.idEnchainementKycs,
      questionViewModel.value!.id,
      questionPresenterImpl,
    );
  }

  const toggleNavigationClavier = estActive => {
    const tabindex = estActive ? '0' : '-1';
    document
      .querySelectorAll('.effet-flou input, .effet-flou button, .effet-flou a')
      .forEach(element => element.setAttribute('tabindex', tabindex));
  };

  watch(
    () => questionViewModel.value,
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
