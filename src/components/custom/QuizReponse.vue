<template>
  <p class="fr-h4">
    {{ question }}
  </p>
  <p v-if="!reponseCorrecte" class="background--rouge-erreur fr-p-1v fr-text--bold text--rouge-erreur fr-mb-1w">
    <span class="fr-icon-close-line" aria-hidden="true"></span>
    Votre réponse: {{ reponse }}
  </p>
  <p class="background--bleu-info fr-p-2v fr-text--bold fr-text--lg text--bleu">
    <span class="fr-icon-check-line" aria-hidden="true"></span>
    La bonne réponse est: {{ solution }}
  </p>
  <div v-if="reponseCorrecte" v-html="texteExplicationOK"></div>
  <div v-else v-html="texteExplicationKO"></div>
</template>

<script setup lang="ts">
defineProps<{
  question: string;
  solution: string;
  texteExplicationKO: string;
  texteExplicationOK: string;
  reponseCorrecte?: boolean;
  reponse: string;
}>();
</script>
