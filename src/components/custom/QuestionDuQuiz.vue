<template>
  <div v-if="!isValide">
    <BoutonRadio
      :options="listeDesReponses"
      :legende="question.intitule"
      legende-size="l"
      col=""
      orientation="vertical"
      name="questionDuQuiz"
      v-model="valueInput"
    />
    <button @click="validerLaReponse" class="fr-btn fr-btn--lg" title="Valider" :disabled="valueInput === ''">
      Valider
    </button>
  </div>
  <div v-else>
    <QuizReponse
      :question="question.intitule"
      :solution="question.solution"
      :texte-explication-o-k="question.texteExplicationOK"
      :texte-explication-k-o="question.texteExplicationKO"
      :reponse-correcte="reponseCorrecte"
      :reponse="valueInput"
    />
    <button @click="passerEtapeSuivante" class="fr-btn fr-btn--lg">Passer à l'étape suivante</button>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { QuestionViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import QuizReponse from '@/components/custom/QuizReponse.vue';

  const props = defineProps<{ question: QuestionViewModel }>();

  const valueInput = ref<string>('');
  const isValide = ref<boolean>(false);
  const reponseCorrecte = ref<boolean>(false);

  const listeDesReponses = ref(
    props.question.reponsesPossibles.map(reponse => ({
      label: reponse,
      value: reponse,
    }))
  );

  watch(
    () => props.question,
    () => {
      isValide.value = false;
      valueInput.value = '';
      listeDesReponses.value = props.question.reponsesPossibles.map(reponse => ({
        label: reponse,
        value: reponse,
      }));
    }
  );

  const validerLaReponse = () => {
    isValide.value = true;
    reponseCorrecte.value = valueInput.value === props.question.solution;
  };

  const emit = defineEmits(['etapeSuivante']);
  const passerEtapeSuivante = () => emit('etapeSuivante', valueInput.value === props.question.solution);
</script>
