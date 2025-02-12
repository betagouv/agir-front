<template>
  <p>{{ actionQuizViewModel.quiz.nombreDeQuestions }} questions</p>
</template>

<script setup lang="ts">
  import { ActionQuizzesViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ actionQuizViewModel: ActionQuizzesViewModel }>();
</script>
