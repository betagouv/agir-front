<template>
  <h2 :class="styleDuTitre ? styleDuTitre : 'fr-h4 fr-mb-2w'">
    {{ questionViewModel.libelle }}
  </h2>
  <InputCheckbox
    v-model="reponse"
    :est-resetable="true"
    :options="
      questionViewModel.reponses_possibles.map(reponsePossible => ({
        id: reponsePossible.id,
        label: reponsePossible.label,
        checked: reponsePossible.checked,
      }))
    "
  />
</template>
<script lang="ts" setup>
  import InputCheckbox from '@/components/custom/Form/InputCheckbox.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';

  defineProps<{ questionViewModel: QuestionViewModel; styleDuTitre?: string }>();
  const reponse = defineModel<string[]>();
</script>
