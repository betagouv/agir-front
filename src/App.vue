<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="page-container">
    <Header />

    <div class="main-container">
      <router-view />
    </div>

    <Footer class="footer-container" />
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: #f7f8f8;
}

.main-container {
  text-align: center;
  padding-bottom: 18rem;
}

.footer-container {
  bottom: 0;
  text-align: left;
  height: 18rem;
  width: 100%;
  position: absolute;
  background-color: white;
}

@media only screen and (min-width: 1500px) {
  .main-container {
    min-width: 1280px;
  }
}
</style>
