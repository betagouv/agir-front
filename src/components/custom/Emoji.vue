<template>
  <span v-if="kind === 'illustration'" role="img" :aria-label="label"> <slot /> </span>
  <span v-else role="presentation" aria-hidden="true" focusable="false"> <slot /> </span>
</template>

<script setup lang="ts">
  defineProps<
    | {
        kind: 'illustration';
        label: string;
      }
    // NOTE: little hack here to make the decoratif kind by default
    | { kind?: 'decoratif'; label?: string }
  >();
</script>
