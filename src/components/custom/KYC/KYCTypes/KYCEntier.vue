<template>
  <InputNumeric
    :id="questionViewModel.id"
    v-model="reponse"
    :default-value="questionViewModel.reponses_possibles[0]?.label"
    :label="{
      wording: questionViewModel.libelle,
      cssModifier: 'fr-h4',
    }"
    :unite="questionViewModel.reponses_possibles[0]?.unite"
  />
</template>

<script lang="ts" setup>
  import InputNumeric from '@/components/custom/Form/InputNumeric.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';

  defineProps<{ questionViewModel: QuestionViewModel }>();
  const reponse = defineModel<string>();
</script>
