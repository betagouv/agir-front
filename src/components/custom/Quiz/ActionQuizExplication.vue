<template>
  <div class="action__quiz-reponseExplication">
    <h2 class="fr-h3 fr-mb-2w">Réponse</h2>
    <div class="cms__content" v-html="texteExplication" />

    <div v-if="articleAssocie?.sources && articleAssocie.sources.length > 0" class="fr-mt-3w print-hidden">
      <p v-if="articleAssocie.sources.length === 1" class="fr-text--xs fr-mb-0">
        <span class="fr-mr-1w">Source :</span>
        <a :href="articleAssocie.sources[0].url" rel="noopener noreferrer" target="_blank">{{
          articleAssocie.sources[0].label
        }}</a>
      </p>
      <div v-else class="fr-text--xs">
        <span class="fr-mr-1w">Sources :</span>
        <ul>
          <li v-for="source in articleAssocie.sources" :key="source.label">
            <a :href="source.url" rel="noopener noreferrer" target="_blank">{{ source.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <button v-if="boutonSuivantLibelle" class="fr-btn fr-btn--lg fr-mt-3w" @click="onClickContinuer">
    {{ boutonSuivantLibelle }}
  </button>

  <router-link v-else class="fr-btn fr-mt-3w" :to="useBoutonRetour().url"> {{ useBoutonRetour().label }}</router-link>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useBoutonRetour } from '@/composables/boutonRetour';
  import { ArticleDuQuiz } from '@/domaines/quiz/ports/quiz.repository';

  const props = defineProps<{
    texteExplicationKO: string | null;
    texteExplicationOK: string | null;
    reponseCorrecte: boolean;
    articleAssocie: ArticleDuQuiz | null;
    boutonSuivantLibelle?: string;
    onClickContinuer?: () => void;
  }>();

  const texteExplication = computed(() => {
    if (props.reponseCorrecte) {
      return props.articleAssocie ? props.articleAssocie.contenu : props.texteExplicationOK;
    } else {
      return props.articleAssocie ? props.articleAssocie.contenu : props.texteExplicationKO;
    }
  });
</script>

<style scoped>
  .action__quiz-reponseExplication {
    background-color: rgba(0, 0, 145, 0.03);
    border: 1px solid rgba(229, 229, 248, 1);
    border-radius: 8px;
    padding: 1rem;
  }
</style>
