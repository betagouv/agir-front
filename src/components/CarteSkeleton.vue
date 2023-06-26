<template>
  <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-card-item" id="tile-6538">
    <div class="fr-tile__body card-item-container">
      <div class="fr-tile__desc">
        <div class="skeleton fr-mb-5v" :style="{ width: '200px', height: '20px' }"></div>
      </div>
      <br />
      <div class="fr-tile__title">
        <div class="skeleton fr-mb-5v" :style="{ width: '100px', height: '20px' }"></div>
      </div>
      <div class="fr-tile__title">
        <div class="skeleton fr-mb-5v" :style="{ width: '70px', height: '20px' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>

.skeleton {
  background-color: #3f3f3f;
  border-radius: 2px;
  display: inline-block;
  vertical-align: middle;
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
