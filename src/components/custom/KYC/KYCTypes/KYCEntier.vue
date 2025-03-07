<template>
  <InputNumeric
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
  import InputNumeric from '@/components/custom/Form/InputNumeric.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';

  defineProps<{ questionViewModel: QuestionViewModel }>();
  const reponse = defineModel<string>();
</script>
