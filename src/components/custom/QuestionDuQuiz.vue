<template>
  <div v-if="!isValide">
    <BoutonRadio :options="item.reponsesPossibles" :legende="item.intitule" name="name" @update="handleValueChange" />
    <button @click="submitReponse" class="fr-btn fr-mt-2w" title="Valider" :disabled="valueInput === ''">
      Valider
    </button>
  </div>
  <div v-else>
    <QuizReponse
      :question="item.intitule"
      :solution="item.solution"
      :texte-explication-o-k="item.texteExplicationOK"
      :texte-explication-k-o="item.texteExplicationKO"
      :reponseCorrecte="reponseCorrecte"
      :reponse="valueInput"
    />
    <button @click="handleClick" class="fr-btn fr-mt-2w">Passer à l'étape suivante</button>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { QuestionViewModel } from '@/quiz/adapters/chargementQuiz.presenter.impl';
  import BoutonRadio from '@/components/dsfr/BoutonRadio.vue';
  import QuizReponse from '@/components/custom/QuizReponse.vue';

  const props = defineProps<{
    item: QuestionViewModel;
  }>();

  const valueInput = ref<string>('');
  const isValide = ref<boolean>(false);
  const reponseCorrecte = ref<boolean>();
  const emit = defineEmits(['etapeSuivante']);

  watch(
    () => props.item,
    () => {
      (isValide.value = false), (valueInput.value = '');
    }
  );

  const handleValueChange = value => (valueInput.value = value);

  const submitReponse = () => {
    isValide.value = true;
    reponseCorrecte.value = valueInput.value === props.item.solution;
  };

  const handleClick = () => emit('etapeSuivante', reponseCorrecte.value);
</script>
