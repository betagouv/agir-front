<template>
  <h2 class="fr-h5 fr-mb-1v">{{ titre }}</h2>
  <p class="text--mention-grey">{{ sousTitre }}</p>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none fr-mb-4w">
    <li v-for="item in liste" :key="item" class="fr-col-6 fr-col-md-4">
      <div class="background--white border-radius--md fr-p-2w">
        {{ item }}
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
  defineProps<{ titre: string; sousTitre: string; liste: string[] }>();
</script>
