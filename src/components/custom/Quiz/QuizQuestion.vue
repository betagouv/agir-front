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
    <button v-if="!questionEstrepondu" class="fr-btn fr-btn--lg" type="submit" :disabled="isDisable">Valider</button>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';

  defineProps<{
    questions: { label: string; value: string; disabled?: boolean; customClass?: string }[];
    question: string;
  }>();

  const valueInput = ref<string>('');
  const questionEstrepondu = ref<boolean>(false);

  const isDisable = computed(() => valueInput.value === '');

  const emit = defineEmits<{ (e: 'quizTermine', value: string): void }>();

  const validerLaReponse = () => {
    questionEstrepondu.value = true;
    emit('quizTermine', valueInput.value);
  };
</script>
