<template>
  <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-card-item" id="tile-6538">
    <div class="fr-tile__body card-item-container">
      <div class="skeleton fr-mb-5v" :style="{ width: '200px', height: '10px' }"></div>
      <div class="skeleton fr-mb-5v" :style="{ width: '100px', height: '10px' }"></div>
      <div class="skeleton fr-mb-5v" :style="{ width: '70px', height: '10px' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.item-date-desc {
  color: #0a76f6;
  font-weight: bold;
}

.card-item-container {
  align-items: center;
  text-align: center;
}

.dashboard-card-item {
  border: 2px solid black;
  border-radius: 2px;
  width: 300px;
}

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
