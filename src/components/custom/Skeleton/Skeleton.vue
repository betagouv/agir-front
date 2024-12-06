<template>
  <div
    class="skeleton"
    :style="{
      width: width ? width : '100%',
      height: height ? height : '1.25rem',
      marginBottom: hasMarginBottom ? '1.25rem' : '0',
    }"
  />
</template>

<script setup lang="ts">
  defineProps<{
    height?: string;
    width?: string;
    hasMarginBottom?: boolean;
  }>();
</script>

<style scoped>
  .skeleton {
    border-radius: 4px;
    background-color: #757575;
    animation: loadingAnimation 1.5s ease-in-out infinite;
  }

  @keyframes loadingAnimation {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.6;
    }
  }
</style>
