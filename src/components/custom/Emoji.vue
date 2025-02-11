<template>
  <span v-if="kind === 'illustration'" :aria-label="label" role="img"> <slot /> </span>
  <span v-else aria-hidden="true" focusable="false" role="presentation"> <slot /> </span>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      kind?: 'illustration' | 'decoratif';
      label?: string;
    }>(),
    {
      kind: 'decoratif',
      label: undefined,
    },
  );
</script>
