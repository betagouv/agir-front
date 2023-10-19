<template>
  <div>
    <div class="border">
      <div class="background--white fr-p-5w">
        <h3>{{ titre }}</h3>
        <ul>
          <li v-for="(item, index) in liste" :key="index">{{ item }}</li>
        </ul>
        <p class="fr-text--lg fr-text--bold fr-mb-0">Plus de 340 actions à réaliser</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    titre: string;
    liste: string[];
  }>();
</script>
