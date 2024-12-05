<template>
  <div class="skeleton-parent background--white fr-p-1w shadow">
    <div class="skeleton fr-mb-3w"></div>
    <div class="skeleton"></div>
    <div class="skeleton"></div>
  </div>
</template>

<style scoped>
  .skeleton-parent {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 6px;
    height: 17rem;
  }

  .skeleton {
    width: 100%;
    border-radius: 4px;
    background-color: #7a7a7a;
    animation: loadingAnimation 1.5s ease-in-out infinite;
  }

  .skeleton:first-child {
    height: 55%;
  }

  .skeleton:nth-child(2) {
    height: 8%;
  }

  .skeleton:last-child {
    height: 8%;
    width: 40%;
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
<script setup></script>
