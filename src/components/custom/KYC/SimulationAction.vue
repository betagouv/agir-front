<template>
  <div v-if="kycs && kycs.length > 0">
    <div v-for="(questionViewModel, index) in kycs" :key="index">
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
          &nbsp;sur {{ kycs.length }}
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
  import { onMounted, ref } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';

  const props = defineProps<{ kycs: QuestionViewModel[] }>();

  const emit = defineEmits<{
    (e: 'finKycAtteinte'): void;
  }>();

  const etapeCourante = ref<number>(0);
  const afficherFinKyc = ref<boolean>(false);

  onMounted(() => {
    chargerEnchainementKycs();
    // const premiereQuestionNonRep =
    //   questionsViewModel.value?.questions.findIndex(question => !question.aDejaEteRepondu) || -1;
    // etapeCourante.value = premiereQuestionNonRep !== -1 ? premiereQuestionNonRep : 0;
  });

  async function chargerEnchainementKycs() {
    // const usecase = new RecupererEnchainementQuestionsUsecase(new QuestionRepositoryAxios());
    // await usecase.execute(
    //   utilisateurStore().utilisateur.id,
    //   props.idEnchainementKycs,
    //   new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
    // );
  }

  const passerEtapeSuivante = async () => {
    await chargerEnchainementKycs();
    etapeCourante.value++;
    if (etapeCourante.value === props.kycs.length) {
      afficherFinKyc.value = true;
      emit('finKycAtteinte');
    }
  };
</script>
