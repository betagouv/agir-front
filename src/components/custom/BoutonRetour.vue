<template>
  <router-link
    :to="{ path: dernierePageStore.path, query: useNavigationStore().pagePrecedente.query }"
    :class="customClass"
    >{{ labelBouton }}</router-link
  >
</template>

<script setup lang="ts">
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
  const dernierePageStore = useNavigationStore().pagePrecedente;
</script>
