<template>
  <div class="flex flex-column flex-center align-items--center fr-pt-6w fr-my-5w">
    <div class="ball-loader fr-mb-5w" />
    <p class="text--semi-bold fr-text--lg text--center" v-text="text" />
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      text?: string;
    }>(),
    {
      text: 'Chargement en cours...',
    },
  );
</script>
