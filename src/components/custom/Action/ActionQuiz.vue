<template>
  <p>{{ actionQuizViewModel.quiz.nombreDeQuestion }} questions</p>
</template>

<script setup lang="ts">
  import { ActionQuizViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ actionQuizViewModel: ActionQuizViewModel }>();
</script>
