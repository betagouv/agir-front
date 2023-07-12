<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const afficherLeHeaderEtFooter = computed({
  get() {
    console.log(useRoute().name);
    return useRoute().name !== "authentification";
  },
  set() {},
});
</script>

<template>
  <div class="page-container">
    <Header v-if="afficherLeHeaderEtFooter" />

    <div class="fr-container fr-px-1w">
      <router-view />
    </div>

    <Footer v-if="afficherLeHeaderEtFooter" class="footer-container" />
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
