<template>
  <div class="background--gris text--gris-light fr-p-2w flex align-items--center flex-center border--top--grey">
    <p class="fr-mb-0 text--center">Avez-vous aimé cette page&nbsp;?</p>
    <div class="flex fr-pl-1w">
      <button
        v-for="index in 4"
        :key="index"
        :aria-label="`${index} étoiles`"
        class="fr-icon fr-mr-1v fr-px-0"
        :class="[feedbackNote > 0 && index <= feedbackNote ? 'fr-icon-star-fill text--bleu' : 'fr-icon-star-line']"
        data-fr-opened="false"
        aria-controls="fr-modal-1"
        @click="premiereNotation = index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    feedbackNote: number;
  }>();
  const premiereNotation = defineModel('notation');
</script>
