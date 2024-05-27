<template>
  <div class="fr-container fr-mb-6w">
    <h1 class="fr-h2 fr-mb-1w">Question pour mieux vous connaître</h1>
    Hello World !
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';

  const questionsViewModel = ref<QuestionViewModel[]>();
  questionsViewModel.value = [
    {
      id: '1',
      question: 'Quel est votre âge ?',
      type: 'radio',
      reponses: [
        'moins de 18 ans',
        'entre 18 et 25 ans',
        'entre 26 et 35 ans',
        'entre 36 et 45 ans',
        'entre 46 et 55 ans',
        'plus de 55 ans',
      ],
    },
    {
      id: '2',
      question: 'Quel est votre sexe ?',
      type: 'choix_multiple',
      reponses: ['Homme', 'Femme', 'Autre'],
    },
    {
      id: '3',
      question: "Quel est votre niveau d'étude ?",
      type: 'libre',
    },
  ];
</script>
