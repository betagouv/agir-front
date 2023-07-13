<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { computed } from "vue";
import { NavigationGuardNext, RouteLocationNormalized, RouteMeta, RouteRecord, useRoute } from "vue-router";
import router from "@/router";
const afficherLeHeaderEtFooter = computed({
  get() {
    return useRoute().name !== "authentification";
  },
  set() {},
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { title } = to.meta;
  if (title) {
    document.title = title as string;
  }
  next();
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
