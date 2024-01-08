<template>
  <div class="fr-grid-row fr-grid-row--middle">
    <span class="fr-m-0 fr-text--xs text--mention-grey fr-text--bold fr-mr-2w">Pas terrible</span>
    <span
      class="fr-mr-md-2w fr-mr-2v"
      v-for="star in 4"
      :key="star"
      style="cursor: pointer"
      @mouseover="hoverRating(star)"
      @click="setRating(star)"
      @mouseleave="resetRating"
    >
      <img
        :src="star <= currentRating ? '/ic_star_filled.svg' : '/ic_star_empty.svg'"
        :alt="star <= currentRating ? 'Étoile pleine' : 'Étoile vide'"
        :aria-label="`Notation de ${star} sur 4`"
        :aria-checked="star <= currentRating"
        role="checkbox"
        tabindex="0"
        @keydown.enter.prevent="setRating(star)"
      />
    </span>
    <span class="fr-m-0 fr-ml-md-1w fr-text--xs text--mention-grey fr-text--bold">Excellent !</span>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  const emit = defineEmits<{
    (e: 'rated', value: number): void;
  }>();
  let ratingSelected = false;

  const currentRating = ref(0);

  const hoverRating = star => {
    if (!ratingSelected) currentRating.value = star;
  };

  const setRating = star => {
    currentRating.value = star;
    emit('rated', currentRating.value);
    ratingSelected = true;
  };

  const resetRating = () => {
    if (!ratingSelected) {
      currentRating.value = 0;
    }
  };
</script>
