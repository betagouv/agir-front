<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/dsfr/Footer.vue";
import { computed } from "vue";
import { NavigationGuardNext, RouteLocationNormalized, useRoute } from "vue-router";
import router from "@/router";
import { utilisateurStore } from "@/store/utilisateur";
const afficherLeHeaderEtFooter = computed({
  get() {
    return useRoute().name !== "authentification";
  },
  set() {},
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { title, estPublique } = to.meta;
  if (title) {
    document.title = title as string;
  }
  if (estPublique || utilisateurStore().utilisateur) {
    next();
  } else {
    next({ name: "authentification" });
    sessionStorage.setItem("requestedRoute", to.fullPath);
  }
});
</script>

<template>
  <div class="page-container">
    <Header v-if="afficherLeHeaderEtFooter" />

    <main class="fr-container fr-px-1w fr-py-6w">
      <router-view />
    </main>

    <Footer v-if="afficherLeHeaderEtFooter" />
  </div>
</template>

<style scoped>
.page-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
