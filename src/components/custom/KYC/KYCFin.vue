<template>
  <div class="kyc-fin fr-grid-row fr-grid-row--middle flex-column fr-py-8w">
    <span class="fr-display--xs fr-mb-2w">Merci pour votre réponse !</span>
    <span class="fr-text--lead fr-text--bold" v-if="!aDejaRepondu">
      {{ phrasePointAGagner }}
      <img src="/ic_score.svg" width="24" alt="points" />
    </span>
    <router-link
      class="fr-btn fr-btn--lg fr-btn--primary fr-btn--icon-right fr-icon-arrow-right-line"
      :to="{ path: bouton.url }"
    >
      {{ bouton.label }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    aDejaRepondu: boolean;
    phrasePointAGagner: string;
    bouton: {
      url: string;
      label: string;
    };
  }>();
</script>

<style scoped>
  .kyc-fin {
    background-image: url('/bg_quiz-success.webp');
    background-position: center;
    background-size: cover;
  }
</style>
