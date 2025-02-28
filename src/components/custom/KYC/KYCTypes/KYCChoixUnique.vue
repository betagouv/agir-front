<template>
  <BoutonRadio
    v-model="reponse"
    :default-value="questionViewModel.reponses_possibles.filter(r => r.checked)[0]?.id"
    :legende="questionViewModel.libelle"
    :name="questionViewModel.id"
    :options="
      questionViewModel.reponses_possibles.map((reponsePossible: ReponsePossibleViewModel) => ({
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

<script setup lang="ts">
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import {
    QuestionViewModel,
    ReponsePossibleViewModel,
  } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';

  defineProps<{ questionViewModel: QuestionViewModel }>();
  const reponse = defineModel<string>();
</script>
