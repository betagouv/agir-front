<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-4w fr-mt-1w">
    <div class="fr-p-2w background--white fr-col-12 fr-col-lg-8 shadow">
      <template v-if="indexQuestionActuelle < actionQuizViewModel.quizzes.length">
        <ExamenNavigation
          :etape-totale="actionQuizViewModel.quizzes.length"
          :etape-actuelle="indexQuestionActuelle + 1"
          :on-click-revenir-etape-precedente="retournerQuestionPrecedente"
        />
        <ActionQuizComposant
          v-if="quizActuel"
          :key="indexQuestionActuelle"
          :article="quizActuel.articleAssocie ?? undefined"
          :question="quizActuel.question"
          :on-click-continuer="passerQuestionSuivante"
          :quiz-id="quizActuel.id"
          :est-derniere-question="indexQuestionActuelle + 1 === actionQuizViewModel?.quizzes.length"
        />
      </template>
      <ActionQuizTerminee
        v-else
        :titre="actionQuizViewModel.titre"
        :felicitations="actionQuizViewModel.quizzFelicitations"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import ActionQuizComposant from '@/components/custom/Action/ActionQuizComposant.vue';
  import ActionQuizTerminee from '@/components/custom/Action/ActionQuizTerminee.vue';
  import ExamenNavigation from '@/components/custom/Mission/Examen/ExamenNavigation.vue';
  import { ActionQuizViewModel, ActionQuizzesViewModel } from '@/domaines/actions/ports/action.presenter';

  const props = defineProps<{ actionQuizViewModel: ActionQuizzesViewModel }>();

  const indexQuestionActuelle = ref<number>(0);
  const quizActuel = computed<ActionQuizViewModel>(
    () => props.actionQuizViewModel.quizzes[indexQuestionActuelle.value],
  );

  const retournerQuestionPrecedente = () => {
    if (indexQuestionActuelle.value > 0) indexQuestionActuelle.value--;
  };

  const passerQuestionSuivante = () => {
    if (indexQuestionActuelle.value < props.actionQuizViewModel.quizzes.length) indexQuestionActuelle.value++;
  };
</script>
