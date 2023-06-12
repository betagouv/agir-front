<script setup lang="ts">
import { computed, ref } from "vue";
import Authentification from "@/components/Authentification.vue";
import Dashboard from "@/components/Dashboard.vue";
const routes = {
  authentification: Authentification,
  dashboard: Dashboard,
};

const currentPath = ref(window.location.pathname);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.pathname;
});

const currentView = computed(() => {
  const path = currentPath.value.slice(1) as keyof typeof routes;
  return routes[path] || Authentification;
});
</script>

<template>
  <component :is="currentView" />
</template>

<style scoped></style>
