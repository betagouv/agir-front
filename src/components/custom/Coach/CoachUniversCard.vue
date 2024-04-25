<template>
  <div class="position--relative fr-p-1w fr-pb-4w border-radius--md shadow background--white">
    <img class="full-width border-radius--xs" :src="image" alt="" />
    <h3 class="fr-h6 fr-mb-0">
      <router-link class="univers__link" to="#" :title="`Allez sur l'univers : ${titre}`">{{ titre }}</router-link>
    </h3>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    titre: string;
    image: string;
  }>();
</script>

<style scoped>
  .univers__link {
    background-image: none;
    outline-width: 0;
  }

  .univers__link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    outline-color: inherit;
    outline-offset: 2px;
    outline-style: inherit;
  }
</style>
