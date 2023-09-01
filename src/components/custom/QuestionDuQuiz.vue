<template>
  <div v-if="!isValider">
    <BoutonRadio
      :options="item.reponsesPossibles"
      :legende="item.intitule"
      name="name"
      @update="handleValueChange"
    />
    <button
      @click="submitReponse"
      class="fr-btn fr-mt-2w"
      title="Valider"
      :disabled="valueInput === ''"
    >
      Valider
    </button>
  </div>
  <div v-else>
    <QuizReponse
      :question="item.intitule"
      :solution="item.solution"
      :texteExplication="item.texteExplication"
      :reponseCorrecte="reponseCorrecte"
      :reponse="valueInput"
    />
    <button
      @click="handleClick"
      class="fr-btn fr-mt-2w"
    >
      Passer à l'étape suivante
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import { QuestionViewModel } from "@/quiz/adapters/chargementQuiz.presenter.impl";
  import BoutonRadio from "@/components/dsfr/BoutonRadio.vue";
  import QuizReponse from "@/components/custom/QuizReponse.vue";

  const props = defineProps<{
    item: QuestionViewModel,
  }>();
  
  const valueInput = ref<string>('');
  const isValider = ref<boolean>(false);
  const reponseCorrecte = ref<boolean>();
  const emit = defineEmits(['etapeSuivante']);

  watch(() => props.item, () => isValider.value = false);

  const handleValueChange = (value) => valueInput.value = value;

  const submitReponse = () => {
    isValider.value = true;
    reponseCorrecte.value = valueInput.value === props.item.solution;
  }
  
  const handleClick = () => emit('etapeSuivante', reponseCorrecte.value);
</script>
