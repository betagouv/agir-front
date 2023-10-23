<template>
  <li>
    <div class="border">
      <img :src="imgUrl" alt="" />
      <div class="background--white fr-p-5w">
        <h3>{{ titre }}</h3>
        <ul>
          <li v-for="(item, index) in liste" :key="index">{{ item }}</li>
        </ul>
        <p class="fr-text--lg fr-text--bold fr-mb-0">{{ accroche }}</p>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
  defineProps<{
    titre: string;
    liste: string[];
    accroche: string;
    imgUrl: string;
  }>();
</script>

<style scoped>
  img {
    width: 100%;
    object-fit: contain;
  }
</style>
