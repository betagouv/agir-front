<template>
  <h2 :class="styleDuTitre ? styleDuTitre : 'fr-h4 fr-mb-2w'">
    {{ questionViewModel.libelle }}
  </h2>
  <label class="fr-label" for="reponse">Votre réponse</label>
  <textarea id="reponse" v-model="reponse" class="fr-input" name="reponse" />
</template>

<script lang="ts" setup>
  import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  defineProps<{ questionViewModel: QuestionViewModel; styleDuTitre?: string }>();
  const reponse = defineModel<string>();
</script>
