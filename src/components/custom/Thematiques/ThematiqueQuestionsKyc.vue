<template>
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
  <KYCFin
    v-if="afficherFinKyc"
    :a-deja-repondu="false"
    :phrasePointAGagner="questionsViewModel.phrasePointAGagner"
    :bouton="{ url: urlBackBouton, label: 'Retour à la thématique' }"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import KYCFin from '@/components/custom/KYC/KYCFin.vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import { QuestionsViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { RouteUniversName } from '@/router/univers/routes';

  const props = defineProps<{ questionsViewModel: QuestionsViewModel }>();

  const premiereKycNonRepondu = () => {
    const indexQuestion = props.questionsViewModel.questions.findIndex(question => !question.aDejaEteRepondu);
    return indexQuestion !== -1 ? indexQuestion : 0;
  };

  const etapeCourante = ref<number>(premiereKycNonRepondu());
  const afficherFinKyc = ref<boolean>(false);

  const passerEtapeSuivante = () => {
    etapeCourante.value++;
    afficherFinKyc.value = etapeCourante.value === props.questionsViewModel.questions.length;
  };

  const route = useRoute();
  const universId = route.params.universId;
  const thematiqueId = route.params.thematiqueId;
  const urlBackBouton = `/${RouteUniversName.UNIVERS}/${universId}/${thematiqueId}`;
</script>
