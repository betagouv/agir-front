<template>
  <div role="alert" v-show="show" :class="`fr-alert--${type}`" class="fr-alert background--white fr-col-12 fr-mt-2w">
    <h3 class="fr-alert__title">{{ titre }}</h3>
    <p>{{ message }}</p>
  </div>
</template>
<script setup lang="ts">
  defineProps<{
    titre: string;
    message: string;
    type: 'success' | 'error';
    show: boolean;
  }>();
</script>
