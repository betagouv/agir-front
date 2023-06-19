<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header />

  <div class="fr-p-5w body-container">
    <router-view />
  </div>

  <Footer />
</template>

<style scoped>

.body-container {
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
}
</style>
