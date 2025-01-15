<template>
  <div>
    <p>{{ message }}</p>
    <button class="fr-btn" @click="action">Réessayer</button>
  </div>
</template>
<script lang="ts" setup>
  defineProps<{
    action: () => void;
    message: string;
  }>();
</script>
