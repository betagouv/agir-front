<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="page-container">
    <Header />

    <div class="fr-container fr-px-1w">
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
  background-color: #f7f8f8;
}

.footer-container {
  text-align: left;
  height: 18rem;
  width: 100%;
  background-color: white;
}

</style>
