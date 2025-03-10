<template>
  <section v-html="astuces" class="action__corps-astuces fr-p-3w" />
</template>

<script lang="ts" setup>
  import { ActionClassiqueViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ astuces: ActionClassiqueViewModel['astuces'] }>();
</script>

<style scoped>
  .action__corps-astuces {
    background-color: rgba(249, 251, 251, 1);
  }
</style>
