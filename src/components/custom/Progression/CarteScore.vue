<template>
  <div :class="`card__${type}`" class="text--center fr-grid-row fr-col flex-column fr-p-4w">
    <span><img :src="`/ic_${type}.svg`" alt="" /></span>
    <span class="fr-text--bold text__opacity--75 fr-m-0 fr-text--xs">{{ type.toUpperCase() }}</span>
    <span class="fr-m-0 fr-text--xl fr-text--bold">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';

  defineProps<{
    type: 'score' | 'niveau' | 'classement';
    value: number;
  }>();
</script>

<style scoped>
  .card__niveau {
    border-radius: 24px;
    background: rgba(255, 153, 0, 0.1);
  }

  .card__score {
    border-radius: 24px;
    background: rgba(104, 165, 50, 0.1);
  }

  .text__opacity--75 {
    opacity: 0.75;
  }
</style>
