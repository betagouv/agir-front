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

    <Alert
      v-if="alerte.isActive"
      :type="alerte.type"
      :titre="alerte.titre"
      :message="alerte.message"
      class="fr-mb-2w"
    />

    <button v-if="!reponseEstDonnee" class="fr-btn fr-btn--lg fr-mt-1w" type="submit">Voir la réponse</button>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import { useAlerte } from '@/composables/useAlerte';

  defineProps<{
    questions: { label: string; value: string; disabled?: boolean; customClass?: string }[];
    question: string;
  }>();

  const { alerte, afficherAlerte } = useAlerte();
  const valueInput = ref<string>('');
  const reponseEstDonnee = ref<boolean>(false);

  const estIncomplet = computed(() => valueInput.value === '');

  const emit = defineEmits<{ (e: 'quizTermine', value: string): void }>();

  const validerLaReponse = () => {
    if (estIncomplet.value) {
      afficherAlerte('error', 'Erreur', 'Veuillez sélectionner une réponse pour continuer');
      return;
    }
    reponseEstDonnee.value = true;
    emit('quizTermine', valueInput.value);
    alerte.value.isActive = false;
  };
</script>
