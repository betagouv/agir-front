<template>
  <section v-if="astuces" v-html="astuces" class="action__corps-astuces action--cms fr-p-3w" />
</template>

<script lang="ts" setup>
  import { ActionClassiqueViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ astuces: ActionClassiqueViewModel['astuces'] }>();
</script>

<style scoped>
  .action__corps-astuces {
    background-color: rgba(249, 251, 251, 1);
    border: 1px solid rgba(57, 130, 108, 0.2);
  }
</style>
