<template>
  <router-link
    v-if="navigationStore.hasHistory"
    :to="{ path: dernierePage.path, query: dernierePage.query }"
    :class="customClass"
    @click="navigationStore.popRoute()"
  >
    {{ labelBouton }}
  </router-link>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useNavigationStore } from '@/store/navigationStore';

  withDefaults(
    defineProps<{
      labelBouton?: string;
      customClass?: string;
    }>(),
    {
      labelBouton: 'Retour',
      customClass: 'fr-btn--icon-left fr-btn fr-btn--tertiary-no-outline fr-icon-arrow-left-line',
    },
  );
  const navigationStore = useNavigationStore();
  const dernierePage = computed(() => navigationStore.dernierePage);
</script>
