<template>
  <div v-if="!afficherFinKyc && questionViewModel">
    <p class="text--bleu fr-grid-row align-items--center fr-py-2w">
      <button
        v-if="questionViewModel.etapeCourante > 1"
        class="fr-btn fr-btn--tertiary-no-outline fr-icon-arrow-left-line"
        @click="recupererPrecendeteKYC"
      >
        Retour à l'étape précédente
      </button>
      <span ref="navigationRef" tabindex="-1">
        <span class="fr-text--bold">Question {{ questionViewModel.etapeCourante }}</span>
        sur {{ questionViewModel.nombreTotalDeQuestions }}
      </span>
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
    >
      <template v-slot:complement v-if="afficherStepper">
        <div class="fr-stepper fr-mt-2w fr-mb-3w" v-if="questionViewModel.nombreTotalDeQuestions > 1">
          <div
            class="fr-stepper__steps fr-stepper__steps-large"
            :data-fr-current-step="questionViewModel.etapeCourante"
            :data-fr-steps="questionViewModel.nombreTotalDeQuestions"
          />
        </div>
      </template>
    </KYCForm>
  </div>

  <slot v-if="afficherFinKyc" name="fin" />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import { QuestionPresenterImpl, QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererPrecedenteKYCUsecase } from '@/domaines/kyc/recupererPrecedenteKYC.usecase';
  import { RecupererPremiereKYCUsecase } from '@/domaines/kyc/recupererPremiereKYC.usecase';
  import { RecupererProchaineKYCUsecase } from '@/domaines/kyc/recupererProchaineKYC.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = withDefaults(
    defineProps<{
      idEnchainementKycs: string;
      estActive: boolean;
      afficherStepper?: boolean;
      wordingDernierBouton?: string;
    }>(),
    { wordingDernierBouton: 'Passer à la suite', afficherStepper: false },
  );

  const emit = defineEmits<{
    (e: 'finKycAtteinte'): void;
  }>();

  const questionViewModel = ref<QuestionViewModel>();
  const navigationRef = ref<HTMLSpanElement>();
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

    navigationRef.value?.focus();
  }

  async function chargerEnchainementKycs() {
    const recupererPremiereQuestionUsecase = new RecupererPremiereKYCUsecase(new QuestionRepositoryAxios());
    await recupererPremiereQuestionUsecase.execute(
      utilisateurStore().utilisateur.id,
      props.idEnchainementKycs,
      questionPresenterImpl,
    );
    navigationRef.value?.focus();
  }

  async function recupererPrecendeteKYC() {
    const recupererPremiereQuestionUsecase = new RecupererPrecedenteKYCUsecase(new QuestionRepositoryAxios());
    await recupererPremiereQuestionUsecase.execute(
      utilisateurStore().utilisateur.id,
      props.idEnchainementKycs,
      questionViewModel.value!.id,
      questionPresenterImpl,
    );
    navigationRef.value?.focus();
  }
</script>
