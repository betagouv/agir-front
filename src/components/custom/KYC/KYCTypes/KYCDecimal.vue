<template>
  <InputDecimal
    v-model="reponse"
    :id="questionViewModel.id"
    :default-value="questionViewModel.reponses_possibles[0].label"
    :label="{
      wording: questionViewModel.libelle,
      cssModifier: 'fr-h4',
    }"
  />
</template>

<script setup lang="ts">
  import InputDecimal from '@/components/custom/Form/InputDecimal.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';

  defineProps<{ questionViewModel: QuestionViewModel }>();
  const reponse = defineModel<string>();
</script>
