<template>
  <div class="fr-container fr-mb-6w">
    <h1 class="fr-h2 fr-mb-1w">Question pour mieux vous connaître</h1>
    <div v-if="questionsViewModel">
      <button @click="etapeCourante--">back</button>
      <div v-for="(questionViewModel, index) in questionsViewModel" :key="index">
        <p v-if="index === etapeCourante">Question {{ index + 1 }} sur {{ questionsViewModel.length }}</p>
        <KYCForm :question-view-model="questionViewModel" v-if="index === etapeCourante" />
        <!-- <form @submit.prevent="validerLaReponse(index)" v-if="index === etapeCourante">
          <div v-if="questionViewModel.type === 'choix_unique'" class="fr-input-group">
            <BoutonRadio
              col=""
              legende-size="l"
              :legende="questionViewModel.libelle"
              name="toto"
              orientation="vertical"
              :options="
                questionViewModel.reponses_possibles.map((reponsePossible: ReponsePossible) => ({
                  label: reponsePossible.label,
                  value: reponsePossible.id,
                }))
              "
              v-model="questionViewModel.reponses"
              :default-value="questionViewModel.reponses ? questionViewModel.reponses.toString() : undefined"
            />
          </div>
          <div v-if="questionViewModel.type === 'choix_multiple'" class="fr-input-group">
            <h2 class="fr-h4 fr-mb-2w">
              {{ questionViewModel.libelle }}
            </h2>
            <InputCheckbox
              :options="questionViewModel.reponses_possibles"
              v-model="questionViewModel.reponses"
              :est-resetable="true"
              :default-values="questionViewModel.reponses"
            />
          </div>
          <div v-if="questionViewModel.type === 'libre'" class="fr-input-group">
            <h2 class="fr-h4 fr-mb-2w">
              {{ questionViewModel.libelle }}
            </h2>
            <label class="fr-label" for="reponse"> Votre réponse </label>
            <textarea class="fr-input" id="reponse" v-model="questionViewModel.reponses" name="reponse" />
          </div>
          <button
            class="fr-btn fr-btn--lg"
            title="Valider"
            :disabled="!(questionViewModel.reponses.length > 0)"
            type="submit"
          >
            Continuer
          </button>
        </form> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import KYCForm from '@/components/custom/KYC/KYCForm.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';

  const questionsViewModel = ref<QuestionViewModel[]>([]);
  questionsViewModel.value = [
    {
      id: '1',
      libelle: 'Quel est votre âge ?',
      type: 'choix_unique',
      reponses_possibles: [
        {
          id: '1',
          label: 'moins de 18 ans',
        },
        {
          id: '2',
          label: 'entre 18 et 25 ans',
        },
        {
          id: '3',
          label: 'entre 26 et 35 ans',
        },
        {
          id: '4',
          label: 'entre 36 et 45 ans',
        },
      ],
      points: '10',
      reponses: ['2'],
      aDejaEteRepondu: true,
      description: 'lorem ipsum',
    },
    {
      id: '2',
      libelle: 'Quel est votre sexe ?',
      type: 'choix_multiple',
      reponses_possibles: [
        {
          id: '1',
          label: 'Homme',
        },
        {
          id: '2',
          label: 'Femme',
        },
        {
          id: '3',
          label: 'Autre',
        },
      ],
      points: '10',
      reponses: [],
      aDejaEteRepondu: false,
      description: 'lorem ipsum',
    },
    {
      id: '3',
      libelle: "Quel est votre niveau d'étude ?",
      type: 'libre',
      reponses_possibles: [],
      points: '10',
      reponses: [],
      aDejaEteRepondu: false,
      description: 'lorem ipsum',
    },
  ];

  const premiereKycNonRepondu = () => {
    return questionsViewModel!.value.findIndex(question => question.reponses.length === 0 && !question.aDejaEteRepondu);
  };

  const etapeCourante = ref<number>(premiereKycNonRepondu());

  const validerLaReponse = async (index: number) => {
    etapeCourante.value++;
    console.log('coucou');
    console.log(index);
  };
</script>
