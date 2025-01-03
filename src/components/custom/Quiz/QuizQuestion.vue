<template>
  <form @submit.prevent="validerLaReponse">
    <BoutonRadio
      :options="questions"
      :legende="question"
      legende-size="l"
      col=""
      orientation="vertical"
      name="questionDuQuiz"
      v-model="valueInput"
      :defaultValue="valueInput"
    />

    <AlertSmall
      v-if="afficherMessageErreur && estIncomplet"
      message="Veuillez sélectionner une réponse pour continuer"
      type="error"
      class="fr-mb-2w"
    />

    <button v-if="!questionEstRepondu" class="fr-btn fr-btn--lg fr-mt-1w" type="submit">Valider</button>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import AlertSmall from '@/components/custom/AlertSmall.vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';

  defineProps<{
    questions: { label: string; value: string; disabled?: boolean; customClass?: string }[];
    question: string;
  }>();

  const valueInput = ref<string>('');
  const questionEstRepondu = ref<boolean>(false);
  const afficherMessageErreur = ref<boolean>(false);

  const estIncomplet = computed(() => valueInput.value === '');

  const emit = defineEmits<{ (e: 'quizTermine', value: string): void }>();

  const validerLaReponse = () => {
    if (estIncomplet.value) {
      afficherMessageErreur.value = true;
      return;
    }
    questionEstRepondu.value = true;
    emit('quizTermine', valueInput.value);
  };
</script>
