<template>
  <div class="fr-container fr-mb-6w">
    <h1 class="fr-h2 fr-mb-1w">Question pour mieux vous connaître</h1>
    <div v-if="questionsViewModel">
      <div v-for="(questionViewModel, index) in questionsViewModel" :key="index">
        <p v-if="index === etapeCourante" class="text--bleu fr-grid-row align-items--center">
          <button
            class="fr-btn fr-btn--tertiary-no-outline fr-icon-arrow-left-line"
            title="Retour à l'étape précédente"
            @click="etapeCourante--"
          >
            Retour à l'étape précédente
          </button>
          <span class="fr-text--bold">Question {{ index + 1 }}</span>
          &nbsp; sur {{ questionsViewModel.length }}
        </p>
        <KYCForm
          v-if="index === etapeCourante"
          :question-view-model="questionViewModel"
          wording-bouton="Continuer"
          @update:soumission-kyc="passerEtapeSuivante"
        />
      </div>
      <KYCFin v-if="afficherFinKyc" :a-deja-repondu="false" phrasePointAGagner="toto" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import KYCFin from '@/components/custom/KYC/KYCFin.vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import { ListesQuestionsThematiquePresenter } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { RecupererQuestionsThematiqueUsecase } from '@/domaines/kyc/recupererQuestionsThematique.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const afficherFinKyc = ref<boolean>(false);
  const questionsViewModel = ref<QuestionViewModel[]>([]);

  onMounted(() => {
    const route = useRoute();
    const usecase = new RecupererQuestionsThematiqueUsecase(new QuestionRepositoryAxios());
    usecase.execute(
      utilisateurStore().utilisateur.id,
      route.params.id as string,
      new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
    );
  });

  const premiereKycNonRepondu = () => {
    return questionsViewModel!.value.findIndex(question => question.reponses.length === 0 && !question.aDejaEteRepondu);
  };

  const etapeCourante = ref<number>(premiereKycNonRepondu());

  const passerEtapeSuivante = async (value: string[]) => {
    questionsViewModel.value[etapeCourante.value].reponses = value;
    etapeCourante.value++;

    if (etapeCourante.value === questionsViewModel.value.length) {
      afficherFinKyc.value = true;
    }
  };
</script>
