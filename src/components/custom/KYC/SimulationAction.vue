<template>
  <div v-if="kycs && kycs.length > 0">
    <div v-for="(questionViewModel, index) in questionsViewModel" :key="index">
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
          &nbsp;sur {{ questionsViewModel.length }}
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
  import { ref } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import { ListeQuestionsDansLeSimulateurPresenterImpl } from '@/domaines/kyc/adapters/listeQuestionsDansLeSimulateur.presenter.impl';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererQuestionsSimulateurUsecase } from '@/domaines/kyc/recupererQuestionsSimulateur.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ kycs: QuestionViewModel[]; actionId: string }>();

  const emit = defineEmits<{
    (e: 'finKycAtteinte'): void;
    (e: 'questionSuivante'): void;
  }>();

  const questionsViewModel = ref<QuestionViewModel[]>(props.kycs || []);
  const etapeCourante = ref<number>(0);
  const afficherFinKyc = ref<boolean>(false);

  async function chargerQuestionsSuivantes() {
    const usecase = new RecupererQuestionsSimulateurUsecase(new QuestionRepositoryAxios());
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      props.actionId,
      new ListeQuestionsDansLeSimulateurPresenterImpl(vm => (questionsViewModel.value = vm)),
    );
  }

  const passerEtapeSuivante = async () => {
    emit('finKycAtteinte');
    await chargerQuestionsSuivantes();
    etapeCourante.value++;
    if (etapeCourante.value === props.kycs.length) {
      afficherFinKyc.value = true;
      emit('finKycAtteinte');
    }
  };
</script>
