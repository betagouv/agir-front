<script setup lang="ts">
import { computed, ref } from "vue";
import Authentification from "@/components/Authentification.vue";
const routes = {
  authentification: Authentification,
  toto: Authentification,
};

const currentPath = ref(window.location.pathname);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.pathname;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1)] || Authentification;
});
</script>

<template>
  <div>
    <a href="/authentification"> Authentification </a>
  </div>
  <component :is="currentView" />
</template>

<style scoped></style>
