<template>
  <BoutonsRadio
    v-model="reponse"
    :default-value="questionViewModel.reponses_possibles.filter(r => r.checked)[0]?.id"
    :legende="questionViewModel.libelle"
    :name="questionViewModel.id"
    :options="
      questionViewModel.reponses_possibles.map(reponsePossible => ({
        label: reponsePossible.label,
        value: reponsePossible.id,
      }))
    "
    class="fr-mb-0"
    col=""
    legende-size="l"
    orientation="vertical"
  />
</template>

<script lang="ts" setup>
  import BoutonsRadio from '@/components/custom/Form/BoutonsRadio.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';

  defineProps<{ questionViewModel: QuestionViewModel }>();
  const reponse = defineModel<string[]>();
</script>
