<template>
  <form @submit.prevent="validerLaReponse">
    <BoutonsRadio
      :options="questions"
      legende-size="l"
      legende=""
      col=""
      orientation="vertical"
      name="questionDuQuiz"
      v-model="valueInput"
      :defaultValue="valueInput"
    >
      <template #legende>
        <h2 class="fr-h4" v-text="question" />
      </template>
    </BoutonsRadio>

    <Alert
      v-if="alerte.isActive"
      :type="alerte.type"
      :titre="alerte.titre"
      :message="alerte.message"
      ref="alertRef"
      class="fr-mb-2w"
    />

    <button v-if="!reponseEstDonnee" class="fr-btn fr-btn--lg fr-mt-1w" type="submit">Voir la réponse</button>
  </form>
</template>

<script setup lang="ts">
  import { computed, nextTick, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import BoutonsRadio from '@/components/custom/Form/BoutonsRadio.vue';
  import { useAlerte } from '@/composables/useAlerte';

  defineProps<{
    questions: { label: string; value: string; disabled?: boolean; customClass?: string }[];
    question: string;
  }>();

  const { alerte, afficherAlerte } = useAlerte();
  const valueInput = ref<string>('');
  const reponseEstDonnee = ref<boolean>(false);
  const alertRef = ref<HTMLDivElement>();

  const estIncomplet = computed(() => valueInput.value === '');

  const emit = defineEmits<{ (e: 'quizTermine', value: string): void }>();

  const validerLaReponse = async () => {
    if (estIncomplet.value) {
      afficherAlerte('error', 'Erreur', 'Veuillez sélectionner une réponse pour continuer');
      await nextTick();
      alertRef.value?.focus();
      return;
    }
    reponseEstDonnee.value = true;
    emit('quizTermine', valueInput.value);
    alerte.value.isActive = false;
  };
</script>
