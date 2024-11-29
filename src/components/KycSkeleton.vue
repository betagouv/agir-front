<template>
  <div>
    <div class="skeleton fr-mb-5v"></div>
    <div class="skeleton fr-mb-5v"></div>

    <CarteVierge class="kyc-skeleton">
      <div class="skeleton fr-mb-5v"></div>
      <div class="skeleton fr-mb-5v"></div>
      <div class="skeleton fr-mb-5v"></div>
      <div class="skeleton"></div>
    </CarteVierge>
  </div>
</template>

<script setup lang="ts">
  import CarteVierge from './CarteVierge.vue';
</script>

<style scoped>
  .kyc-skeleton {
    height: 100vh;
  }

  .skeleton {
    height: 1.25rem;
    border-radius: 4px;
    background-color: #3f3f3f;
    animation: loadingAnimation 1.5s ease-in-out infinite;
  }

  .skeleton:first-child {
    width: 250px;
  }

  .skeleton:nth-child(2) {
    width: 200px;
  }

  .kyc-skeleton .skeleton:first-child {
    width: 300px;
  }

  .kyc-skeleton .skeleton:nth-child(2) {
    width: 200px;
  }

  .kyc-skeleton .skeleton:nth-child(3) {
    width: 100px;
  }

  .kyc-skeleton .skeleton:last-child {
    width: 300px;
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
