<template>
  <section class="action__corps-introduction fr-p-3w fr-mb-3w" v-html="introduction" />
</template>

<script lang="ts" setup>
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ introduction: ActionBaseViewModel['introduction'] }>();
</script>

<style scoped>
  .action__corps-introduction {
    background-color: rgba(0, 0, 145, 0.03);
  }
</style>
