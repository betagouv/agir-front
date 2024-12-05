<template>
  <div class="skeleton-card background--white border-radius--md shadow fr-p-1w fr-grid-row">
    <div class="skeleton-card__img fr-col-3 border-radius--md full-height skeleton"></div>
    <div class="skeleton-card__details fr-col-9 position--relative fr-pl-1w fr-grid-row flex-column flex-space-between">
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
      <div class="skeleton"></div>
    </div>
  </div>
</template>

<style scoped>
  .skeleton {
    height: 1.25rem;
    border-radius: 4px;
    background-color: #7a7a7a;
    animation: loadingAnimation 1.5s ease-in-out infinite;
  }

  .skeleton-card {
    height: 10rem;
  }

  .skeleton-card__img {
    height: 100%;
  }

  .skeleton-card__details div:first-child {
    width: 60%;
  }

  .skeleton-card__details div:nth-child(2) {
    width: 35%;
  }

  .skeleton-card__details div:nth-child(3) {
    width: 75%;
  }

  .skeleton-card__details div:last-child {
    width: 20%;
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
