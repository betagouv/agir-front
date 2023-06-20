<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="container">
    <Header />
    <div class="fr-p-5w main-container">
      <router-view />
    </div>

    <Footer />

  </div>
</template>

<style scoped>
.header {
}
.container {
  display: flex;
  flex-direction: column;
}

.main-container {
  min-width: 1280px;
  margin: 0 auto;
  text-align: center;
  flex: 1;
  overflow-y: auto;
}

.footer {
  height: auto;
  background-color: #f5f5f5;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
