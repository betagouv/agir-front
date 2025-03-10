<template>
  <Mosaic
    v-model="reponse"
    :legende="questionViewModel.libelle"
    :name="questionViewModel.id"
    :options="
      questionViewModel.reponses_possibles.map(reponsePossible => ({
        label: reponsePossible.label,
        value: reponsePossible.id,
        picto: reponsePossible.picto,
        emoji: reponsePossible.emoji,
        checked: reponsePossible.checked,
      }))
    "
  />
</template>
<script setup lang="ts">
  import Mosaic from '@/components/custom/Form/Mosaic.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  defineProps<{ questionViewModel: QuestionViewModel }>();
  const reponse = defineModel<string[]>();
</script>
