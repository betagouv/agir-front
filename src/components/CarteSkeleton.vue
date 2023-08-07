<template>
  <CarteVierge>
    <div class="skeleton fr-mb-5v fr-mx-auto"></div>
    <div class="skeleton fr-mb-5v fr-mx-auto"></div>
    <div class="skeleton fr-mx-auto"></div>
  </CarteVierge>
</template>

<script setup lang="ts">
  import CarteVierge from './CarteVierge.vue';
</script>

<style scoped>
  .skeleton {
    height: 1.25rem;
    border-radius: 4px;
    background-color: #3F3F3F;
    animation: loadingAnimation 1.5s ease-in-out infinite;
  }

  .skeleton:first-child {
    width: 200px;
  }

  .skeleton:nth-child(2) {
    width: 100px;
  }

  .skeleton:last-child {
    width: 70px;
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
