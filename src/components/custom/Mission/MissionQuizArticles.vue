<template>
  <div>
    <h1>MissionQuizArticles</h1>
    <div v-for="item in missions" :key="item.idDuContenu">
      <div v-if="item.type === 'article'">article {{ item.titre }}</div>
      <div v-if="item.type === 'quiz'">quiz {{ item.titre }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { MissionQuizArticleViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';

  defineProps<{
    missions: MissionQuizArticleViewModel[];
  }>();
</script>

<style scoped></style>
