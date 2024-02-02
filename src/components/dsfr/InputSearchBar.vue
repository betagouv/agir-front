<template>
  <form @submit.prevent="submitSearch">
    <div class="fr-search-bar" :id="id" role="search">
      <label class="fr-label" :for="name"> Rechercher </label>
      <input class="fr-input" :placeholder="placeholder" type="search" :id="name" :name="name" v-model="search" />
      <button class="fr-btn" :title="placeholder">Rechercher</button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{
    id: string;
    name: string;
    placeholder: string;
  }>();

  const search = ref<string>('');

  const emit = defineEmits(['submit']);

  const submitSearch = () => emit('submit', search.value);
</script>
